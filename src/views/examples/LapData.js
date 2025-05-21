import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Col, Badge } from "reactstrap";
import { useSimRigWebSocket } from "../../wss";
import { chartOptions, parseOptions } from "variables/charts.js";
import Chart from "chart.js";
import TelemetryStat from "../../components/Telemetry/TelemetryStat";
import SessionRequired from "../../components/SessionRequired";

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

    const lapNumber = lapData?.m_currentLapNum ?? 0;
    const currentLapTime = lapData?.m_currentLapTimeInMS ?? 0;
    const lastLapTime = lapData?.m_lastLapTimeInMS ?? 0;
    const sector1Time = lapData?.m_sector1TimeMSPart ?? 0;
    const sector2Time = lapData?.m_sector2TimeMSPart ?? 0;
    const carPosition = lapData?.m_carPosition ?? "--";
    const penalties = lapData?.m_penalties ?? 0;
    const pitStatus = lapData?.m_pitStatus ?? 0;

    useEffect(() => {
        parseOptions(Chart, chartOptions());
    }, []);

    const pitStatusLabels = ["Out", "Pitting", "In Pit"];
    const pitStatusColors = ["success", "warning", "danger"];

    const formatTime = (ms) => {
        const totalSeconds = ms / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = (totalSeconds % 60).toFixed(3);
        return `${minutes}:${seconds.padStart(6, '0')}`;
    };

    return (
        <SessionRequired>
            <Container className="mt-4" fluid>
                {/* Race Status */}
                <Card className="shadow border-0 mb-4">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Race Status</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat
                                    title="Car Position"
                                    value={carPosition}
                                    color="primary"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Lap Number"
                                    value={lapNumber}
                                    color="primary"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Penalties"
                                    value={penalties}
                                    color={penalties > 0 ? "danger" : "success"}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Pit Status"
                                    value={pitStatusLabels[pitStatus] || "Unknown"}
                                    color={pitStatusColors[pitStatus] || "secondary"}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                {/* Lap Times */}
                <Card className="shadow border-0">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Lap Times</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat
                                    title="Current Lap"
                                    value={formatTime(currentLapTime)}
                                    color="info"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Last Lap"
                                    value={formatTime(lastLapTime)}
                                    color="info"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Sector 1"
                                    value={formatTime(sector1Time)}
                                    color="info"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Sector 2"
                                    value={formatTime(sector2Time)}
                                    color="info"
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </SessionRequired>
    );
};

export default LapData;