import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Header from "components/Headers/Header.js";
import { useSimRigWebSocket } from "../../wss";

import TelemetryStat from "../../components/Telemetry/TelemetryStat";

const CarSetup = () => {
    const { carSetup } = useSimRigWebSocket();

    return (
        <>
            <Header />
            <Container className="mt-4" fluid>
                <h3 className="mb-4">Car Setup</h3>
                <Row>
                    <Col md="3"><TelemetryStat title="Front Wing" value={carSetup?.m_frontWing} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Rear Wing" value={carSetup?.m_rearWing} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="On Throttle Diff" value={carSetup?.m_onThrottle} unit="%" progress={carSetup?.m_onThrottle} /></Col>
                    <Col md="3"><TelemetryStat title="Off Throttle Diff" value={carSetup?.m_offThrottle} unit="%" progress={carSetup?.m_offThrottle} /></Col>
                </Row>
                <Row className="mt-3">
                    <Col md="3"><TelemetryStat title="Front Camber" value={carSetup?.m_frontCamber.toFixed(2)} unit="°" /></Col>
                    <Col md="3"><TelemetryStat title="Rear Camber" value={carSetup?.m_rearCamber.toFixed(2)} unit="°" /></Col>
                    <Col md="3"><TelemetryStat title="Front Toe" value={carSetup?.m_frontToe.toFixed(2)} unit="°" /></Col>
                    <Col md="3"><TelemetryStat title="Rear Toe" value={carSetup?.m_rearToe.toFixed(2)} unit="°" /></Col>
                </Row>
                <Row className="mt-3">
                    <Col md="3"><TelemetryStat title="Front Suspension" value={carSetup?.m_frontSuspension} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Rear Suspension" value={carSetup?.m_rearSuspension} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Front ARB" value={carSetup?.m_frontAntiRollBar} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Rear ARB" value={carSetup?.m_rearAntiRollBar} unit="" /></Col>
                </Row>
                <Row className="mt-3">
                    <Col md="3"><TelemetryStat title="Front Ride Height" value={carSetup?.m_frontSuspensionHeight} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Rear Ride Height" value={carSetup?.m_rearSuspensionHeight} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Brake Pressure" value={carSetup?.m_brakePressure} unit="%" progress={carSetup?.m_brakePressure} /></Col>
                    <Col md="3"><TelemetryStat title="Brake Bias" value={carSetup?.m_brakeBias} unit="%" progress={carSetup?.m_brakeBias} /></Col>
                </Row>
                <Row className="mt-3">
                    <Col md="3"><TelemetryStat title="Engine Braking" value={carSetup?.m_engineBraking} unit="%" progress={carSetup?.m_engineBraking} /></Col>
                    <Col md="3"><TelemetryStat title="Ballast" value={carSetup?.m_ballast} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Fuel Load" value={carSetup?.m_fuelLoad.toFixed(1)} unit="L" /></Col>
                </Row>
                <Row className="mt-3">
                    <Col md="3"><TelemetryStat title="FL Tyre Pressure" value={carSetup?.m_frontLeftTyrePressure.toFixed(1)} unit="PSI" /></Col>
                    <Col md="3"><TelemetryStat title="FR Tyre Pressure" value={carSetup?.m_frontRightTyrePressure.toFixed(1)} unit="PSI" /></Col>
                    <Col md="3"><TelemetryStat title="RL Tyre Pressure" value={carSetup?.m_rearLeftTyrePressure.toFixed(1)} unit="PSI" /></Col>
                    <Col md="3"><TelemetryStat title="RR Tyre Pressure" value={carSetup?.m_rearRightTyrePressure.toFixed(1)} unit="PSI" /></Col>
                </Row>
            </Container>
        </>
    );
};

export default CarSetup;
