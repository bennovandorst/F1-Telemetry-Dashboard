import React, { useEffect } from "react";
import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import Header from "components/Headers/Header.js";
import { useSimRigWebSocket } from "../../wss";
import TelemetryStat from "../../components/Telemetry/TelemetryStat";

const CarDamage = () => {
    const { carDamage } = useSimRigWebSocket();

    const tyreLabels = ["RL", "RR", "FL", "FR"];

    return (
        <>
            <Header />
            <Container className="mt-4" fluid>
                <Row className="mb-3">
                    {carDamage?.m_tyresWear?.map((val, idx) => (
                        <Col md="3" key={`tyre-wear-${idx}`}>
                            <TelemetryStat
                                title={`Tyre Wear ${tyreLabels[idx]}`}
                                value={val}
                                unit="%"
                                progress={val}
                            />
                        </Col>
                    ))}
                </Row>

                <Row className="mb-3">
                    {carDamage?.m_tyresDamage?.map((val, idx) => (
                        <Col md="3" key={`tyre-damage-${idx}`}>
                            <TelemetryStat
                                title={`Tyre Damage ${tyreLabels[idx]}`}
                                value={val}
                                unit="%"
                                progress={val}
                            />
                        </Col>
                    ))}
                </Row>

                <Row className="mb-3">
                    {carDamage?.m_brakesDamage?.map((val, idx) => (
                        <Col md="3" key={`brake-damage-${idx}`}>
                            <TelemetryStat
                                title={`Brake Damage ${tyreLabels[idx]}`}
                                value={val}
                                unit="%"
                                progress={val}
                            />
                        </Col>
                    ))}
                </Row>

                <Row className="mb-3">
                    <Col md="3">
                        <TelemetryStat
                            title="Front Left Wing"
                            value={carDamage?.m_frontLeftWingDamage}
                            unit="%"
                            progress={carDamage?.m_frontLeftWingDamage}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="Front Right Wing"
                            value={carDamage?.m_frontRightWingDamage}
                            unit="%"
                            progress={carDamage?.m_frontRightWingDamage}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="Rear Wing"
                            value={carDamage?.m_rearWingDamage}
                            unit="%"
                            progress={carDamage?.m_rearWingDamage}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="Floor"
                            value={carDamage?.m_floorDamage}
                            unit="%"
                            progress={carDamage?.m_floorDamage}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md="3">
                        <TelemetryStat
                            title="Diffuser"
                            value={carDamage?.m_diffuserDamage}
                            unit="%"
                            progress={carDamage?.m_diffuserDamage}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="Sidepod"
                            value={carDamage?.m_sidepodDamage}
                            unit="%"
                            progress={carDamage?.m_sidepodDamage}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="Gearbox"
                            value={carDamage?.m_gearBoxDamage}
                            unit="%"
                            progress={carDamage?.m_gearBoxDamage}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="Engine"
                            value={carDamage?.m_engineDamage}
                            unit="%"
                            progress={carDamage?.m_engineDamage}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md="3">
                        <TelemetryStat
                            title="MGU-H Wear"
                            value={carDamage?.m_engineMGUHWear}
                            unit="%"
                            progress={carDamage?.m_engineMGUHWear}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="ES Wear"
                            value={carDamage?.m_engineESWear}
                            unit="%"
                            progress={carDamage?.m_engineESWear}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="CE Wear"
                            value={carDamage?.m_engineCEWear}
                            unit="%"
                            progress={carDamage?.m_engineCEWear}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="ICE Wear"
                            value={carDamage?.m_engineICEWear}
                            unit="%"
                            progress={carDamage?.m_engineICEWear}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md="3">
                        <TelemetryStat
                            title="MGU-K Wear"
                            value={carDamage?.m_engineMGUKWear}
                            unit="%"
                            progress={carDamage?.m_engineMGUKWear}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="TC Wear"
                            value={carDamage?.m_engineTCWear}
                            unit="%"
                            progress={carDamage?.m_engineTCWear}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="DRS Fault"
                            value={carDamage?.m_drsFault ? "Fault" : "OK"}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="ERS Fault"
                            value={carDamage?.m_ersFault ? "Fault" : "OK"}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col md="3">
                        <TelemetryStat
                            title="Engine Blown"
                            value={carDamage?.m_engineBlown ? "Yes" : "No"}
                        />
                    </Col>
                    <Col md="3">
                        <TelemetryStat
                            title="Engine Seized"
                            value={carDamage?.m_engineSeized ? "Yes" : "No"}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CarDamage;
