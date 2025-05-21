import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";

const SimRigWebSocketContext = createContext();

export const SimRigWebSocketProvider = ({ children }) => {
    const [wsIP, setWsIP] = useState(localStorage.getItem("wsIP") || "127.0.0.1");
    const [wsPort, setWsPort] = useState(localStorage.getItem("wsPort") || "8080");

    const [connected, setConnected] = useState(false);
    const [carTelemetry, setCarTelemetry] = useState(null);
    const [lapData, setLapData] = useState(null);
    const [carDamage, setCarDamage] = useState(null);
    const [carSetups, setCarSetups] = useState(null);
    const [alert, setAlert] = useState(null);
    const [currentSimRigId, setCurrentSimRigId] = useState(null);
    const [header, setHeader] = useState(null);

    const socketRef = useRef(null);
    const reconnectStartRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const currentSimRigIdRef = useRef(null);
    const manualDisconnectRef = useRef(false);

    const navigate = useNavigate();

    const connect = (simrigId) => () => {
        localStorage.setItem("simrigId", simrigId);
        setCurrentSimRigId(simrigId);

        if (connected && currentSimRigIdRef.current === simrigId) {
            console.log(`Already connected to SimRig ${simrigId}`);
            return;
        }

        manualDisconnectRef.current = false;
        clearTimeout(reconnectTimeoutRef.current);
        reconnectStartRef.current = Date.now();

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            console.log("Closing existing WebSocket before connecting to new one...");
            manualDisconnectRef.current = true;
            socketRef.current.close();
        }

        currentSimRigIdRef.current = simrigId;
        createSocket(simrigId);
    };

    const createSocket = (simrigId) => {
        const socketUrl = `ws://${wsIP}:${wsPort}/simrig/${simrigId}`;
        const socket = new WebSocket(socketUrl);
        socketRef.current = socket;
        window.ws = socket;

        socket.onopen = () => {
            console.log("WebSocket connected to", socketUrl);
            setConnected(true);
            setAlert(null);
            navigate("/admin/index");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            setAlert(
                <Alert color="danger" className="mt-3">
                    <strong>Connection Error:</strong> Could not connect to SimRig {simrigId}.<br />
                    Make sure the server is running and the ip/port are correct.
                </Alert>
            );
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("WebSocket message:", data);

                if (!data?.type || !data?.data) return;

                const payload = data.data;
                const { m_header } = payload;
                const playerIndex = m_header?.m_playerCarIndex ?? 0;

                if (m_header) {
                    setHeader(m_header);
                }

                switch (data.type) {
                    case "carTelemetry":
                        const { m_carTelemetryData } = payload;
                        if (Array.isArray(m_carTelemetryData) && m_carTelemetryData.length > 0) {
                            setCarTelemetry(m_carTelemetryData[playerIndex]);
                        } else {
                            setCarTelemetry(null);
                        }
                        break;

                    case "lapData":
                        const { m_lapData } = payload;
                        if (Array.isArray(m_lapData) && m_lapData.length > 0) {
                            setLapData(m_lapData[playerIndex]);
                        } else {
                            setLapData(null);
                        }
                        break;

                    case "carDamage":
                        const { m_carDamageData } = payload;
                        if (Array.isArray(m_carDamageData) && m_carDamageData.length > 0) {
                            setCarDamage(prev => ({ ...prev, ...m_carDamageData[playerIndex] }));
                        } else {
                            setCarDamage(null);
                        }
                        break;

                    case "carSetups":
                        const { m_carSetupsData } = payload;
                        if (Array.isArray(m_carSetupsData) && m_carSetupsData.length > 0) {
                            setCarDamage(prev => ({ ...prev, ...m_carSetupsData[playerIndex] }));
                        } else {
                            setCarDamage(null);
                        }
                        break;

                    default:
                        console.warn("Unhandled WebSocket message type:", data.type);
                        break;
                }

            } catch (err) {
                console.error("WebSocket message parse error:", err);
            }
        };

        socket.onclose = () => {
            setConnected(false);

            if (manualDisconnectRef.current) {
                console.log("WebSocket closed manually no reconnection attempt.");
                manualDisconnectRef.current = false;
                return;
            }

            const now = Date.now();
            if (reconnectStartRef.current && now - reconnectStartRef.current < 30000) {
                console.log("Trying to reconnect in 3 seconds...");
                reconnectTimeoutRef.current = setTimeout(() => {
                    createSocket(simrigId);
                }, 3000);
            } else {
                setAlert(
                    <Alert color="danger" className="mt-3">
                        <strong>Disconnected:</strong> Lost connection to SimRig {simrigId}.<br />
                        Please refresh the page or check the server.
                    </Alert>
                );
            }
        };
    };

    const disconnect = () => {
        clearTimeout(reconnectTimeoutRef.current);
        if (socketRef.current) {
            manualDisconnectRef.current = true;
            socketRef.current.close();
        }
        currentSimRigIdRef.current = null;
        setCarTelemetry(null);
        setLapData(null);
        setCarDamage(null);
        setCarSetups(null);
        localStorage.removeItem("simrigId");
        setCurrentSimRigId(null);
    };

    const updateWsIP = (ip) => {
        setWsIP(ip);
        localStorage.setItem("wsIP", ip);
    };
    const updateWsPort = (port) => {
        setWsPort(port);
        localStorage.setItem("wsPort", port);
    };

    useEffect(() => {
        const savedSimRigId = localStorage.getItem("simrigId");
        if (savedSimRigId) {
            console.log(`Found saved SimRig ID: ${savedSimRigId}, auto-connecting...`);
            connect(Number(savedSimRigId))();
        }
    }, []);

    return (
        <SimRigWebSocketContext.Provider
            value={{ connected, connect, disconnect, carTelemetry, lapData, carDamage, carSetups, alert, header, currentSimRigId, wsIP, wsPort, updateWsIP, updateWsPort }}
        >
            {children}
        </SimRigWebSocketContext.Provider>
    );
};

export const useSimRigWebSocket = () => useContext(SimRigWebSocketContext);
