import React, { useEffect, useRef, useState } from "react";
import {Card, CardBody, CardTitle, Container, Row, Col, Progress, CardHeader} from "reactstrap";
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

const Corrie = () => {
    const { carTelemetry } = useSimRigWebSocket();

    const speedHistory = useTelemetryHistory(carTelemetry?.m_speed || 0);
    const rpmHistory = useTelemetryHistory(carTelemetry?.m_engineRPM || 0);
    const throttleHistory = useTelemetryHistory(carTelemetry?.m_throttle * 100 || 0);
    const brakeHistory = useTelemetryHistory(carTelemetry?.m_brake * 100 || 0);
    const clutchHistory = useTelemetryHistory(carTelemetry?.m_clutch || 0);

    useEffect(() => {
        parseOptions(Chart, chartOptions());
    }, []);

    return (
        <>
            <Header />
            <Container className="mt-4" fluid>
                <Row className="mb-4">
                    <Col>
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <h3 className="mb-0">Deze pagina is samengesteld op basis van Max zijn preferences</h3>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="4"><TelemetryStat title="Throttle" value={(carTelemetry?.m_throttle * 100).toFixed(0)} unit="%" progress={carTelemetry?.m_throttle * 100} /></Col>
                    <Col md="4"><TelemetryStat title="Brake" value={(carTelemetry?.m_brake * 100).toFixed(0)} unit="%" progress={carTelemetry?.m_brake * 100} /></Col>
                    <Col md="4"><TelemetryStat title="Clutch" value={carTelemetry?.m_clutch} unit="%" progress={carTelemetry?.m_clutch} /></Col>
                </Row>

                <Row>
                    <Col md="4"><TelemetryChart title="Speed Over Time" data={speedHistory} label="Speed (km/h)" /></Col>
                    <Col md="4"><TelemetryChart title="RPM Over Time" data={rpmHistory} label="RPM" /></Col>
                    <Col md="4"><TelemetryChart title="Throttle Over Time" data={throttleHistory} label="Throttle (%)" /></Col>
                    <Col md="4"><TelemetryChart title="Brake Over Time" data={brakeHistory} label="Brake (%)" /></Col>
                    <Col md="4"><TelemetryChart title="Clutch Over Time" data={clutchHistory} label="Clutch (%)" /></Col>
                </Row>
            </Container>
        </>
    );
};

export default Corrie;
