import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Header from "components/Headers/Header.js";
import { useSimRigWebSocket } from "../../wss";

import TelemetryStat from "../../components/Telemetry/TelemetryStat";

const CarSetup = () => {
    const { carSetups } = useSimRigWebSocket();

    return (
        <>
            <Header />
            <Container className="mt-4" fluid>
                <Row>
                    <Col md="3"><TelemetryStat title="Front Wing" value={carSetups?.m_frontWing} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Rear Wing" value={carSetups?.m_rearWing} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="On Throttle Diff" value={carSetups?.m_onThrottle} unit="%" progress={carSetups?.m_onThrottle} /></Col>
                    <Col md="3"><TelemetryStat title="Off Throttle Diff" value={carSetups?.m_offThrottle} unit="%" progress={carSetups?.m_offThrottle} /></Col>
                </Row>
                <Row className="mt-3">
                    <Col md="3"><TelemetryStat title="Front Camber" value={carSetups?.m_frontCamber.toFixed(2)} unit="°" /></Col>
                    <Col md="3"><TelemetryStat title="Rear Camber" value={carSetups?.m_rearCamber.toFixed(2)} unit="°" /></Col>
                    <Col md="3"><TelemetryStat title="Front Toe" value={carSetups?.m_frontToe.toFixed(2)} unit="°" /></Col>
                    <Col md="3"><TelemetryStat title="Rear Toe" value={carSetups?.m_rearToe.toFixed(2)} unit="°" /></Col>
                </Row>
                <Row className="mt-3">
                    <Col md="3"><TelemetryStat title="Front Suspension" value={carSetups?.m_frontSuspension} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Rear Suspension" value={carSetups?.m_rearSuspension} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Front ARB" value={carSetups?.m_frontAntiRollBar} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Rear ARB" value={carSetups?.m_rearAntiRollBar} unit="" /></Col>
                </Row>
                <Row className="mt-3">
                    <Col md="3"><TelemetryStat title="Front Ride Height" value={carSetups?.m_frontSuspensionHeight} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Rear Ride Height" value={carSetups?.m_rearSuspensionHeight} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Brake Pressure" value={carSetups?.m_brakePressure} unit="%" progress={carSetups?.m_brakePressure} /></Col>
                    <Col md="3"><TelemetryStat title="Brake Bias" value={carSetups?.m_brakeBias} unit="%" progress={carSetups?.m_brakeBias} /></Col>
                </Row>
                <Row className="mt-3">
                    <Col md="3"><TelemetryStat title="Engine Braking" value={carSetups?.m_engineBraking} unit="%" progress={carSetups?.m_engineBraking} /></Col>
                    <Col md="3"><TelemetryStat title="Ballast" value={carSetups?.m_ballast} unit="" /></Col>
                    <Col md="3"><TelemetryStat title="Fuel Load" value={carSetups?.m_fuelLoad.toFixed(1)} unit="L" /></Col>
                </Row>
                <Row className="mt-3">
                    <Col md="3"><TelemetryStat title="FL Tyre Pressure" value={carSetups?.m_frontLeftTyrePressure.toFixed(1)} unit="PSI" /></Col>
                    <Col md="3"><TelemetryStat title="FR Tyre Pressure" value={carSetups?.m_frontRightTyrePressure.toFixed(1)} unit="PSI" /></Col>
                    <Col md="3"><TelemetryStat title="RL Tyre Pressure" value={carSetups?.m_rearLeftTyrePressure.toFixed(1)} unit="PSI" /></Col>
                    <Col md="3"><TelemetryStat title="RR Tyre Pressure" value={carSetups?.m_rearRightTyrePressure.toFixed(1)} unit="PSI" /></Col>
                </Row>
            </Container>
        </>
    );
};

export default CarSetup;
