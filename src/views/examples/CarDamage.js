import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Col, Badge } from "reactstrap";
import { useSimRigWebSocket } from "../../wss";
import TelemetryStat from "../../components/Telemetry/TelemetryStat";
import SessionRequired from "../../components/SessionRequired";

const CarDamage = () => {
    const { carDamage } = useSimRigWebSocket();
    const tyreLabels = ["RL", "RR", "FL", "FR"];

    const getDamageColor = (value) => {
        if (value >= 75) return "danger";
        if (value >= 50) return "warning";
        if (value >= 25) return "info";
        return "success";
    };

    const getStatusColor = (value) => {
        return value ? "danger" : "success";
    };

    return (
        <SessionRequired>
            <Container className="mt-4" fluid>
                {/* System Status Section */}
                <Card className="shadow border-0">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">System Status</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat
                                    title="DRS Status"
                                    value={carDamage?.m_drsFault ? "Fault" : "OK"}
                                    color={getStatusColor(carDamage?.m_drsFault)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="ERS Status"
                                    value={carDamage?.m_ersFault ? "Fault" : "OK"}
                                    color={getStatusColor(carDamage?.m_ersFault)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Engine Status"
                                    value={carDamage?.m_engineBlown ? "Blown" : "OK"}
                                    color={getStatusColor(carDamage?.m_engineBlown)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Engine Seized"
                                    value={carDamage?.m_engineSeized ? "Yes" : "No"}
                                    color={getStatusColor(carDamage?.m_engineSeized)}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                {/* Tyres Section */}
                <Card className="shadow border-0 mb-4">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Tyres</h3>
                    </CardHeader>
                    <CardBody>
                        <Row className="mb-4">
                            {carDamage?.m_tyresWear?.map((val, idx) => (
                                <Col md="3" key={`tyre-wear-${idx}`}>
                                    <TelemetryStat
                                        title={`Tyre Wear ${tyreLabels[idx]}`}
                                        value={val}
                                        unit="%"
                                        progress={val}
                                        color={getDamageColor(val)}
                                    />
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            {carDamage?.m_tyresDamage?.map((val, idx) => (
                                <Col md="3" key={`tyre-damage-${idx}`}>
                                    <TelemetryStat
                                        title={`Tyre Damage ${tyreLabels[idx]}`}
                                        value={val}
                                        unit="%"
                                        progress={val}
                                        color={getDamageColor(val)}
                                    />
                                </Col>
                            ))}
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
                            {carDamage?.m_brakesDamage?.map((val, idx) => (
                                <Col md="3" key={`brake-damage-${idx}`}>
                                    <TelemetryStat
                                        title={`Brake Damage ${tyreLabels[idx]}`}
                                        value={val}
                                        unit="%"
                                        progress={val}
                                        color={getDamageColor(val)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </CardBody>
                </Card>

                {/* Aerodynamics Section */}
                <Card className="shadow border-0 mb-4">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Aerodynamics</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat
                                    title="Front Left Wing"
                                    value={carDamage?.m_frontLeftWingDamage}
                                    unit="%"
                                    progress={carDamage?.m_frontLeftWingDamage}
                                    color={getDamageColor(carDamage?.m_frontLeftWingDamage)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Front Right Wing"
                                    value={carDamage?.m_frontRightWingDamage}
                                    unit="%"
                                    progress={carDamage?.m_frontRightWingDamage}
                                    color={getDamageColor(carDamage?.m_frontRightWingDamage)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Rear Wing"
                                    value={carDamage?.m_rearWingDamage}
                                    unit="%"
                                    progress={carDamage?.m_rearWingDamage}
                                    color={getDamageColor(carDamage?.m_rearWingDamage)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Floor"
                                    value={carDamage?.m_floorDamage}
                                    unit="%"
                                    progress={carDamage?.m_floorDamage}
                                    color={getDamageColor(carDamage?.m_floorDamage)}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md="3">
                                <TelemetryStat
                                    title="Diffuser"
                                    value={carDamage?.m_diffuserDamage}
                                    unit="%"
                                    progress={carDamage?.m_diffuserDamage}
                                    color={getDamageColor(carDamage?.m_diffuserDamage)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Sidepod"
                                    value={carDamage?.m_sidepodDamage}
                                    unit="%"
                                    progress={carDamage?.m_sidepodDamage}
                                    color={getDamageColor(carDamage?.m_sidepodDamage)}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                {/* Engine Section */}
                <Card className="shadow border-0 mb-4">
                    <CardHeader className="bg-transparent text-white">
                        <h3 className="mb-0">Engine & Components</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <TelemetryStat
                                    title="Gearbox"
                                    value={carDamage?.m_gearBoxDamage}
                                    unit="%"
                                    progress={carDamage?.m_gearBoxDamage}
                                    color={getDamageColor(carDamage?.m_gearBoxDamage)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="Engine"
                                    value={carDamage?.m_engineDamage}
                                    unit="%"
                                    progress={carDamage?.m_engineDamage}
                                    color={getDamageColor(carDamage?.m_engineDamage)}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md="3">
                                <TelemetryStat
                                    title="MGU-H Wear"
                                    value={carDamage?.m_engineMGUHWear}
                                    unit="%"
                                    progress={carDamage?.m_engineMGUHWear}
                                    color={getDamageColor(carDamage?.m_engineMGUHWear)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="ES Wear"
                                    value={carDamage?.m_engineESWear}
                                    unit="%"
                                    progress={carDamage?.m_engineESWear}
                                    color={getDamageColor(carDamage?.m_engineESWear)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="CE Wear"
                                    value={carDamage?.m_engineCEWear}
                                    unit="%"
                                    progress={carDamage?.m_engineCEWear}
                                    color={getDamageColor(carDamage?.m_engineCEWear)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="ICE Wear"
                                    value={carDamage?.m_engineICEWear}
                                    unit="%"
                                    progress={carDamage?.m_engineICEWear}
                                    color={getDamageColor(carDamage?.m_engineICEWear)}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md="3">
                                <TelemetryStat
                                    title="MGU-K Wear"
                                    value={carDamage?.m_engineMGUKWear}
                                    unit="%"
                                    progress={carDamage?.m_engineMGUKWear}
                                    color={getDamageColor(carDamage?.m_engineMGUKWear)}
                                />
                            </Col>
                            <Col md="3">
                                <TelemetryStat
                                    title="TC Wear"
                                    value={carDamage?.m_engineTCWear}
                                    unit="%"
                                    progress={carDamage?.m_engineTCWear}
                                    color={getDamageColor(carDamage?.m_engineTCWear)}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </SessionRequired>
    );
};

export default CarDamage;
