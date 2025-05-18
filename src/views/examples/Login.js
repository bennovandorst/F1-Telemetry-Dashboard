import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
} from "reactstrap";
import { useSimRigWebSocket } from "../../wss";

const Login = () => {
  const {
    connected,
    connect,
    alert,
    wsIP,
    wsPort,
    updateWsIP,
    updateWsPort,
  } = useSimRigWebSocket();

  const [ip, setIp] = useState(wsIP);
  const [port, setPort] = useState(wsPort);
  const [modalOpen, setModalOpen] = useState(false);
  const [settingsEnabled, setSettingsEnabled] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleSave = (e) => {
    e.preventDefault();
    updateWsIP(ip.trim());
    updateWsPort(port.trim());
    console.log("WebSocket IP and port saved!");
    toggleModal();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "w") {
        setSettingsEnabled(true);
        console.log("WebSocket settings unlocked!");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
      <>
        <Col lg="5" md="7">
          {alert}
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Choose a Simulator</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                    className="btn-neutral btn-icon text-success"
                    color="default"
                    onClick={connect(1)}
                >
                  <span className="btn-inner--icon fas fa-car-crash"></span>
                  <span className="btn-inner--text">SimRig 1</span>
                </Button>
                <Button
                    className="btn-neutral btn-icon text-success"
                    color="default"
                    onClick={connect(2)}
                >
                  <span className="btn-inner--icon fas fa-car-crash"></span>
                  <span className="btn-inner--text">SimRig 2</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-3 py-lg-3">
              <div className="btn-wrapper text-center">
                <Button
                    className="btn-neutral btn-icon text-success"
                    color="default"
                    onClick={toggleModal}
                    disabled={!settingsEnabled}
                >
                  <span className="btn-inner--icon fas fa-cogs"></span>
                  <span className="btn-inner--text">Websocket Settings</span>
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Modal */}
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>WebSocket Settings</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSave}>
              <FormGroup>
                <Label for="wsIp">WebSocket IP Address</Label>
                <Input
                    type="text"
                    name="wsIp"
                    id="wsIp"
                    placeholder="Enter WebSocket IP"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="wsPort">WebSocket Port</Label>
                <Input
                    type="text"
                    name="wsPort"
                    id="wsPort"
                    placeholder="Enter WebSocket port"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                />
              </FormGroup>
              <Button color="success" type="submit">
                Save Settings
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
  );
};

export default Login;