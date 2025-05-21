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
                const message = JSON.parse(event.data);
                console.log("WebSocket message:", message);

                const { type, data: payload } = message;

                if (!type || !payload) return;

                const m_header = payload.m_header;
                const playerIndex = m_header?.m_playerCarIndex ?? 0;

                if (m_header) {
                    setHeader(m_header);
                }

                const handlers = {
                    carTelemetry: () => {
                        const carTelemetry = Array.isArray(payload.m_carTelemetryData)
                            ? payload.m_carTelemetryData[playerIndex]
                            : null;
                        setCarTelemetry(carTelemetry);
                    },
                    lapData: () => {
                        const lapData = Array.isArray(payload.m_lapData)
                            ? payload.m_lapData[playerIndex]
                            : null;
                        setLapData(lapData);
                    },
                    carDamage: () => {
                        const carDamage = Array.isArray(payload.m_carDamageData)
                            ? payload.m_carDamageData[playerIndex]
                            : null;
                        if (carDamage) {
                            setCarDamage((prev) => ({ ...prev, ...carDamage }));
                        } else {
                            setCarDamage(null);
                        }
                    },
                    carSetups: () => {
                        const carSetups = Array.isArray(payload.m_carSetupsData)
                            ? payload.m_carSetupsData[playerIndex]
                            : null;
                        if (carSetups) {
                            setCarSetups((prev) => ({ ...prev, ...carSetups }));
                        } else {
                            setCarSetups(null);
                        }
                    },
                };

                const handler = handlers[type];
                if (handler) {
                    handler();
                } else {
                    console.warn("Unhandled WebSocket message type:", type);
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
