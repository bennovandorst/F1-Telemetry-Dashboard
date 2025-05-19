import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col, Progress } from "reactstrap";
import Header from "components/Headers/Header.js";
import { useSimRigWebSocket } from "../../wss";
import { chartOptions, parseOptions } from "variables/charts.js";
import Chart from "chart.js";
import TelemetryChart from "../../components/Telemetry/TelemetryChart";
import TelemetryStat from "../../components/Telemetry/TelemetryStat";

const useTelemetryHistory = (value, maxLength = 30) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (value != null) {
            setData(prev => [...prev.slice(-maxLength + 1), value]);
        }
    }, [value]);
    return data;
};

const CarTelemetry = () => {
    const { telemetry } = useSimRigWebSocket();

    const speedHistory = useTelemetryHistory(telemetry?.m_speed || 0);
    const rpmHistory = useTelemetryHistory(telemetry?.m_engineRPM || 0);
    const tyresSurfaceTemperature = useTelemetryHistory(telemetry?.m_tyresSurfaceTemperature || 0);

    useEffect(() => {
        parseOptions(Chart, chartOptions());
    }, []);

    return (
        <>
            <Header />
            <Container className="mt-4" fluid>
                <Row>
                    <Col md="4"><TelemetryStat title="Throttle" value={(telemetry?.m_throttle * 100).toFixed(0)} unit="%" progress={telemetry?.m_throttle * 100} /></Col>
                    <Col md="4"><TelemetryStat title="Brake" value={(telemetry?.m_brake * 100).toFixed(0)} unit="%" progress={telemetry?.m_brake * 100} /></Col>
                    <Col md="4"><TelemetryStat title="Clutch" value={telemetry?.m_clutch} unit="%" progress={telemetry?.m_clutch} /></Col>
                </Row>

                <Row>
                    <Col md="4"><TelemetryChart title="Speed Over Time" data={speedHistory} label="Speed (km/h)" /></Col>
                    <Col md="4"><TelemetryChart title="RPM Over Time" data={rpmHistory} label="RPM" /></Col>
                    <Col md="4"><TelemetryChart title="Tyre Surface Temperature" data={tyresSurfaceTemperature} label="Temperature (°C)" /></Col>
                </Row>
            </Container>
        </>
    );
};

export default CarTelemetry;
