import React, { createContext, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";

const SimRigWebSocketContext = createContext();

export const SimRigWebSocketProvider = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const [telemetry, setTelemetry] = useState(null);
    const [alert, setAlert] = useState(null);

    const socketRef = useRef(null);
    const reconnectStartRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    const navigate = useNavigate();

    const connect = (simrigId) => () => {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectStartRef.current = Date.now();
        createSocket(simrigId);
    };

    const createSocket = (simrigId) => {
        const socket = new WebSocket(`ws://localhost:8080/simrig/${simrigId}`);
        socketRef.current = socket;
        window.ws = socket;

        socket.onopen = () => {
            setConnected(true);
            setAlert(null);
            navigate("/admin/index");
        };

        socket.onerror = () => {
            setAlert(
                <Alert color="danger" className="mt-3">
                    <strong>Connection Error:</strong> Could not connect to SimRig {simrigId}.
                </Alert>
            );
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data?.telemetry) {
                    setTelemetry(data.telemetry);
                }
            } catch (err) {
                console.error("WebSocket JSON parse error", err);
            }
        };

        socket.onclose = () => {
            setConnected(false);
            const now = Date.now();
            if (reconnectStartRef.current && now - reconnectStartRef.current < 30000) {
                reconnectTimeoutRef.current = setTimeout(() => {
                    createSocket(simrigId);
                }, 3000);
            } else {
                setAlert(
                    <Alert color="danger" className="mt-3">
                        <strong>Disconnected:</strong> Could not reconnect to SimRig {simrigId}. Refresh to retry.
                    </Alert>
                );
            }
        };
    };

    const disconnect = () => {
        if (socketRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            socketRef.current.close();
        }
    };

    return (
        <SimRigWebSocketContext.Provider value={{ connected, connect, disconnect, telemetry, alert }}>
            {children}
        </SimRigWebSocketContext.Provider>
    );
};

export const useSimRigWebSocket = () => useContext(SimRigWebSocketContext);