import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import { useSimRigWebSocket } from "../../wss";
import TelemetryStat from "../../components/Telemetry/TelemetryStat";
import SessionRequired from "../../components/SessionRequired";

const CarSetup = () => {
    const { carSetups } = useSimRigWebSocket();

    return (
        <SessionRequired>
            <Container className="mt-4" fluid>
                {/* Aerodynamics Section */}
                <Card className="shadow border-0 mb-4">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Aerodynamics</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Front Wing" 
                                    value={carSetups?.m_frontWing} 
                                    unit=""
                                    color="info"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Rear Wing" 
                                    value={carSetups?.m_rearWing} 
                                    unit=""
                                    color="info"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="On Throttle Diff" 
                                    value={carSetups?.m_onThrottle} 
                                    unit="%" 
                                    progress={carSetups?.m_onThrottle}
                                    color="info"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Off Throttle Diff" 
                                    value={carSetups?.m_offThrottle} 
                                    unit="%" 
                                    progress={carSetups?.m_offThrottle}
                                    color="info"
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                {/* Suspension Section */}
                <Card className="shadow border-0 mb-4">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Suspension</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Front Camber" 
                                    value={carSetups?.m_frontCamber.toFixed(2)} 
                                    unit="°"
                                    color="success"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Rear Camber" 
                                    value={carSetups?.m_rearCamber.toFixed(2)} 
                                    unit="°"
                                    color="success"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Front Toe" 
                                    value={carSetups?.m_frontToe.toFixed(2)} 
                                    unit="°"
                                    color="success"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Rear Toe" 
                                    value={carSetups?.m_rearToe.toFixed(2)} 
                                    unit="°"
                                    color="success"
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md="3">
                                <TelemetryStat 
                                    title="Front Suspension" 
                                    value={carSetups?.m_frontSuspension} 
                                    unit=""
                                    color="success"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Rear Suspension" 
                                    value={carSetups?.m_rearSuspension} 
                                    unit=""
                                    color="success"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Front ARB" 
                                    value={carSetups?.m_frontAntiRollBar} 
                                    unit=""
                                    color="success"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Rear ARB" 
                                    value={carSetups?.m_rearAntiRollBar} 
                                    unit=""
                                    color="success"
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md="3">
                                <TelemetryStat 
                                    title="Front Ride Height" 
                                    value={carSetups?.m_frontSuspensionHeight} 
                                    unit=""
                                    color="success"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Rear Ride Height" 
                                    value={carSetups?.m_rearSuspensionHeight} 
                                    unit=""
                                    color="success"
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                {/* Brakes Section */}
                <Card className="shadow border-0 mb-4">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Brakes</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Brake Pressure" 
                                    value={carSetups?.m_brakePressure} 
                                    unit="%" 
                                    progress={carSetups?.m_brakePressure}
                                    color="warning"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Brake Bias" 
                                    value={carSetups?.m_brakeBias} 
                                    unit="%" 
                                    progress={carSetups?.m_brakeBias}
                                    color="warning"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Engine Braking" 
                                    value={carSetups?.m_engineBraking} 
                                    unit="%" 
                                    progress={carSetups?.m_engineBraking}
                                    color="warning"
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                {/* Tyres & Fuel Section */}
                <Card className="shadow border-0">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Tyres & Fuel</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat 
                                    title="FL Tyre Pressure" 
                                    value={carSetups?.m_frontLeftTyrePressure.toFixed(1)} 
                                    unit="PSI"
                                    color="danger"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="FR Tyre Pressure" 
                                    value={carSetups?.m_frontRightTyrePressure.toFixed(1)} 
                                    unit="PSI"
                                    color="danger"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="RL Tyre Pressure" 
                                    value={carSetups?.m_rearLeftTyrePressure.toFixed(1)} 
                                    unit="PSI"
                                    color="danger"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="RR Tyre Pressure" 
                                    value={carSetups?.m_rearRightTyrePressure.toFixed(1)} 
                                    unit="PSI"
                                    color="danger"
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md="3">
                                <TelemetryStat 
                                    title="Ballast" 
                                    value={carSetups?.m_ballast} 
                                    unit=""
                                    color="danger"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat 
                                    title="Fuel Load" 
                                    value={carSetups?.m_fuelLoad.toFixed(1)} 
                                    unit="L"
                                    color="danger"
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </SessionRequired>
    );
};

export default CarSetup;
