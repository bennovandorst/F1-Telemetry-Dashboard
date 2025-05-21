import React from "react";
import { Container, Row, Col, Spinner } from "reactstrap";

const LoadingScreen = () => {
  return (
    <Container className="mt-7" fluid>
      <Row className="justify-content-center">
        <Col className="text-center">
          <div className="mb-4">
            <Spinner
              color="success"
              style={{ width: "3rem", height: "3rem" }}
              type="grow"
            />
          </div>
          <h2 className="text-success">Loading...</h2>
          <p className="text-muted">Waiting for active session</p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingScreen; 