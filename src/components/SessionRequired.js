import React from "react";
import { useSimRigWebSocket } from "../wss";
import LoadingScreen from "./LoadingScreen";
import Header from "./Headers/Header";

const SessionRequired = ({ children }) => {
    const { header } = useSimRigWebSocket();

    return (
        <>
            <Header />
            {!header || !Object.keys(header).length ? (
                <LoadingScreen />
            ) : (
                children
            )}
        </>
    );
};

export default SessionRequired; 