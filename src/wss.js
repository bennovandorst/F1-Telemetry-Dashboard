import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";

export default function useAuth() {
    const [connected, setConnected] = useState(false);
    const socketRef = useRef(null);
    const reconnectStartRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const navigate = useNavigate();

    const [telemetry, setTelemetry] = useState(null);
    const [alert, setAlert] = useState(null);

    const connect = (simrigId) => () => {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectStartRef.current = Date.now();

        createSocket(simrigId);
    };

    const createSocket = (simrigId) => {
        const wsUrl = `ws://localhost:8080/simrig/${simrigId}`;
        const socket = new WebSocket(wsUrl);
        window.ws = socket;
        socketRef.current = socket;

        socket.onopen = () => {
            console.log(`WebSocket connected for SimRig: ${simrigId}`);
            setConnected(true);
            navigate("/dash");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            setAlert(
                <Alert color="danger" className="mt-3">
                    <strong>Connection Error:</strong> Unable to connect to SimRig {simrigId} Websocket Server.<br />
                    Please check your network connection or ensure the SimRig Websocket server is running.
                </Alert>
            );
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("Received data:", data);

                if (data?.telemetry) {
                    setTelemetry(data.telemetry);
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
            setConnected(false);

            const now = Date.now();
            if (
                reconnectStartRef.current &&
                now - reconnectStartRef.current < 30000
            ) {
                console.log("Attempting to reconnect...");
                reconnectTimeoutRef.current = setTimeout(() => {
                    createSocket(simrigId);
                }, 3000);
            } else {
                console.warn("Couldn't reconnect, server down?");
                setAlert(
                    <Alert color="danger" className="mt-3">
                        <strong>Disconnected:</strong> Lost connection to SimRig {simrigId} Websocket Server and couldn’t reconnect.<br />
                        Ensure the server is online and refresh the page to try again.
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

    return { connected, connect, disconnect, telemetry, alert };
}