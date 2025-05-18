import React from "react";
import { Navigate } from "react-router-dom";
import {useSimRigWebSocket} from "./wss";

const ProtectedRoute = ({ children }) => {
    const { connected } = useSimRigWebSocket();

    if (!connected) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default ProtectedRoute;