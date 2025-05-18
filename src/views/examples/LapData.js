import React, { useEffect } from "react";
import {Card, CardBody, CardTitle, Container, Row, Col, Progress} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useSimRigWebSocket } from "../../wss";
import { chartOptions, parseOptions } from "variables/charts.js";
import Chart from "chart.js";
import TelemetryStat from "../../components/Telemetry/TelemetryStat";

const useTelemetryHistory = (value, maxLength = 30) => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        if (value != null) {
            setData(prev => [...prev.slice(-maxLength + 1), value]);
        }
    }, [value]);
    return data;
};

const LapData = () => {
    const { lapData } = useSimRigWebSocket();

    // Extract lap-related values or default to 0 if missing
    const lapNumber = lapData?.m_currentLapNum ?? 0;
    const currentLapTime = lapData?.m_currentLapTimeInMS ?? 0;
    const lastLapTime = lapData?.m_lastLapTimeInMS ?? 0;
    const sector1Time = lapData?.m_sector1TimeMSPart ?? 0;
    const sector2Time = lapData?.m_sector2TimeMSPart ?? 0;
    const carPosition = lapData?.m_carPosition ?? "-";
    const penalties = lapData?.m_penalties ?? 0;
    const pitStatus = lapData?.m_pitStatus ?? 0;

    useEffect(() => {
        parseOptions(Chart, chartOptions());
    }, []);

    // Pit status labels, adjust as needed
    const pitStatusLabels = ["Out", "Pitting", "In Pit"];

    return (
        <>
            <Header />
            <Container className="mt-4" fluid>
                <Row>
                    <Col md="3"><TelemetryStat title="Car Position" value={carPosition} /></Col>
                    <Col md="3"><TelemetryStat title="Lap Number" value={lapNumber} /></Col>
                    <Col md="3"><TelemetryStat title="Penalties" value={penalties} /></Col>
                    <Col md="3"><TelemetryStat title="Pit Status" value={pitStatusLabels[pitStatus] || "Unknown"} /></Col>
                    <Col md="3"><TelemetryStat title="Current Lap Time" value={currentLapTime / 1000} unit="s" /></Col>
                    <Col md="3"><TelemetryStat title="Last Lap Time" value={lastLapTime / 1000} unit="s" /></Col>
                    <Col md="3"><TelemetryStat title="Sector 1 Time" value={sector1Time / 1000} unit="s" /></Col>
                    <Col md="3"><TelemetryStat title="Sector 2 Time" value={sector2Time / 1000} unit="s" /></Col>
                </Row>
            </Container>
        </>
    );
};

export default LapData;