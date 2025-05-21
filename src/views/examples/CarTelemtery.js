import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Col, Badge } from "reactstrap";
import { useSimRigWebSocket } from "../../wss";
import TelemetryStat from "../../components/Telemetry/TelemetryStat";
import SessionRequired from "../../components/SessionRequired";

const CarTelemetry = () => {
    const { carTelemetry } = useSimRigWebSocket();

    const getSpeedColor = (speed) => {
        if (speed >= 300) return "danger";
        if (speed >= 250) return "warning";
        if (speed >= 200) return "info";
        return "success";
    };

    const getThrottleColor = (value) => {
        if (value >= 75) return "success";
        if (value >= 50) return "info";
        if (value >= 25) return "warning";
        return "danger";
    };

    const getBrakeColor = (value) => {
        if (value >= 75) return "danger";
        if (value >= 50) return "warning";
        if (value >= 25) return "info";
        return "success";
    };

    const getGearColor = (gear) => {
        if (gear === 0) return "warning";
        if (gear === -1) return "danger";
        return "success";
    };

    return (
        <SessionRequired>
            <Container className="mt-4" fluid>
                {/* Driver Inputs Section */}
                <Card className="shadow border-0 mb-4">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Driver Inputs</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat
                                    title="Steering"
                                    value={carTelemetry?.m_steer}
                                    unit="°"
                                    color="info"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Throttle"
                                    value={(carTelemetry?.m_throttle * 100).toFixed(0)} 
                                    unit="%" 
                                    progress={carTelemetry?.m_throttle * 100}
                                    color={getThrottleColor(carTelemetry?.m_throttle)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Brake"
                                    value={(carTelemetry?.m_brake * 100).toFixed(0)} 
                                    unit="%" 
                                    progress={carTelemetry?.m_brake * 100}
                                    color={getBrakeColor(carTelemetry?.m_brake)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Clutch"
                                    value={carTelemetry?.m_clutch} 
                                    unit="%" 
                                    progress={carTelemetry?.m_clutch}
                                    color="warning"
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                {/* Car Status Section */}
                <Card className="shadow border-0 mb-4">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Car Status</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat
                                    title="ERS Mode"
                                    value={carTelemetry?.m_ersDeployMode}
                                    color="info"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="ERS Harvesting"
                                    value={carTelemetry?.m_ersHarvestedThisLap}
                                    unit="MJ"
                                    color="success"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="ERS Stored"
                                    value={carTelemetry?.m_ersStoreEnergy}
                                    unit="MJ"
                                    progress={(carTelemetry?.m_ersStoreEnergy / 4) * 100}
                                    color="warning"
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Fuel Mix"
                                    value={carTelemetry?.m_fuelMix}
                                    color="danger"
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                {/* Tyre Temperatures Section */}
                <Card className="shadow border-0 mb-4">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Tyre Temperatures</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            {carTelemetry?.m_tyresInnerTemperature?.map((temp, idx) => (
                                <Col md="3" key={`tyre-temp-${idx}`}>
                                    <TelemetryStat
                                        title={`Tyre ${["RL", "RR", "FL", "FR"][idx]} Temp`}
                                        value={temp}
                                        unit="°C"
                                        color={temp > 100 ? "danger" : temp > 80 ? "warning" : "success"}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </CardBody>
                </Card>

                 {/* Speed & Gear Section */}
                 <Card className="shadow border-0">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Speed & Gear</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat
                                    title="Speed"
                                    value={carTelemetry?.m_speed}
                                    unit="km/h"
                                    color={getSpeedColor(carTelemetry?.m_speed)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Gear"
                                    value={carTelemetry?.m_gear === 0 ? "N" : carTelemetry?.m_gear === -1 ? "R" : carTelemetry?.m_gear}
                                    color={getGearColor(carTelemetry?.m_gear)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="RPM"
                                    value={carTelemetry?.m_engineRPM}
                                    unit="rpm"
                                    progress={(carTelemetry?.m_engineRPM / 15000) * 100}
                                    color={carTelemetry?.m_engineRPM > 12000 ? "danger" : "success"}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="DRS"
                                    value={carTelemetry?.m_drs ? "Active" : "Inactive"}
                                    color={carTelemetry?.m_drs ? "success" : "secondary"}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </SessionRequired>
    );
};

export default CarTelemetry; 