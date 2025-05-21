import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { useSimRigWebSocket } from "../../wss";
import TelemetryStat from "../../components/Telemetry/TelemetryStat";
import TelemetryChart from "../../components/Telemetry/TelemetryChart";
import Header from "components/Headers/Header.js";

const AVAILABLE_COMPONENTS = {
    "Speed": {
        type: "stat",
        getData: (telemetry) => ({
            title: "Speed",
            value: telemetry?.m_speed,
            unit: "km/h",
            color: "primary"
        })
    },
    "RPM": {
        type: "stat",
        getData: (telemetry) => ({
            title: "RPM",
            value: telemetry?.m_engineRPM,
            unit: "rpm",
            progress: (telemetry?.m_engineRPM / 15000) * 100,
            color: telemetry?.m_engineRPM > 12000 ? "danger" : "success"
        })
    },
    "Throttle": {
        type: "stat",
        getData: (telemetry) => ({
            title: "Throttle",
            value: (telemetry?.m_throttle * 100).toFixed(0),
            unit: "%",
            progress: telemetry?.m_throttle * 100,
            color: "success"
        })
    },
    "Brake": {
        type: "stat",
        getData: (telemetry) => ({
            title: "Brake",
            value: (telemetry?.m_brake * 100).toFixed(0),
            unit: "%",
            progress: telemetry?.m_brake * 100,
            color: "danger"
        })
    },
    "Gear": {
        type: "stat",
        getData: (telemetry) => ({
            title: "Gear",
            value: telemetry?.m_gear === 0 ? "N" : telemetry?.m_gear === -1 ? "R" : telemetry?.m_gear,
            color: telemetry?.m_gear === 0 ? "warning" : telemetry?.m_gear === -1 ? "danger" : "success"
        })
    },
    "Current Lap Time": {
        type: "stat",
        getData: (lapData) => ({
            title: "Current Lap Time",
            value: lapData?.m_currentLapTime?.toFixed(2),
            unit: "s",
            color: "info"
        })
    },
    "Last Lap Time": {
        type: "stat",
        getData: (lapData) => ({
            title: "Last Lap Time",
            value: lapData?.m_lastLapTime?.toFixed(2),
            unit: "s",
            color: "warning"
        })
    },
    "Best Lap Time": {
        type: "stat",
        getData: (lapData) => ({
            title: "Best Lap Time",
            value: lapData?.m_bestLapTime?.toFixed(2),
            unit: "s",
            color: "success"
        })
    },
    "Sector 1 Time": {
        type: "stat",
        getData: (lapData) => ({
            title: "Sector 1 Time",
            value: lapData?.m_sector1Time?.toFixed(2),
            unit: "s",
            color: "primary"
        })
    },
    "Sector 2 Time": {
        type: "stat",
        getData: (lapData) => ({
            title: "Sector 2 Time",
            value: lapData?.m_sector2Time?.toFixed(2),
            unit: "s",
            color: "primary"
        })
    },
    "Front Wing Damage": {
        type: "stat",
        getData: (carDamage) => ({
            title: "Front Wing Damage",
            value: carDamage?.m_frontWingDamage,
            unit: "%",
            progress: carDamage?.m_frontWingDamage,
            color: carDamage?.m_frontWingDamage > 50 ? "danger" : "warning"
        })
    },
    "Rear Wing Damage": {
        type: "stat",
        getData: (carDamage) => ({
            title: "Rear Wing Damage",
            value: carDamage?.m_rearWingDamage,
            unit: "%",
            progress: carDamage?.m_rearWingDamage,
            color: carDamage?.m_rearWingDamage > 50 ? "danger" : "warning"
        })
    },
    "Front Left Damage": {
        type: "stat",
        getData: (carDamage) => ({
            title: "Front Left Damage",
            value: carDamage?.m_frontLeftWingDamage,
            unit: "%",
            progress: carDamage?.m_frontLeftWingDamage,
            color: carDamage?.m_frontLeftWingDamage > 50 ? "danger" : "warning"
        })
    },
    "Front Right Damage": {
        type: "stat",
        getData: (carDamage) => ({
            title: "Front Right Damage",
            value: carDamage?.m_frontRightWingDamage,
            unit: "%",
            progress: carDamage?.m_frontRightWingDamage,
            color: carDamage?.m_frontRightWingDamage > 50 ? "danger" : "warning"
        })
    },
    "Rear Left Damage": {
        type: "stat",
        getData: (carDamage) => ({
            title: "Rear Left Damage",
            value: carDamage?.m_rearLeftWingDamage,
            unit: "%",
            progress: carDamage?.m_rearLeftWingDamage,
            color: carDamage?.m_rearLeftWingDamage > 50 ? "danger" : "warning"
        })
    },
    "Rear Right Damage": {
        type: "stat",
        getData: (carDamage) => ({
            title: "Rear Right Damage",
            value: carDamage?.m_rearRightWingDamage,
            unit: "%",
            progress: carDamage?.m_rearRightWingDamage,
            color: carDamage?.m_rearRightWingDamage > 50 ? "danger" : "warning"
        })
    },
    "Front Wing": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Front Wing",
            value: carSetup?.m_frontWing,
            unit: "",
            color: "info"
        })
    },
    "Rear Wing": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Rear Wing",
            value: carSetup?.m_rearWing,
            unit: "",
            color: "info"
        })
    },
    "Front Camber": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Front Camber",
            value: carSetup?.m_frontCamber,
            unit: "°",
            color: "info"
        })
    },
    "Rear Camber": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Rear Camber",
            value: carSetup?.m_rearCamber,
            unit: "°",
            color: "info"
        })
    },
    "Front Toe": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Front Toe",
            value: carSetup?.m_frontToe,
            unit: "°",
            color: "info"
        })
    },
    "Rear Toe": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Rear Toe",
            value: carSetup?.m_rearToe,
            unit: "°",
            color: "info"
        })
    },
    "Front Suspension": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Front Suspension",
            value: carSetup?.m_frontSuspension,
            unit: "",
            color: "info"
        })
    },
    "Rear Suspension": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Rear Suspension",
            value: carSetup?.m_rearSuspension,
            unit: "",
            color: "info"
        })
    },
    "Front Anti-Roll Bar": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Front Anti-Roll Bar",
            value: carSetup?.m_frontAntiRollBar,
            unit: "",
            color: "info"
        })
    },
    "Rear Anti-Roll Bar": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Rear Anti-Roll Bar",
            value: carSetup?.m_rearAntiRollBar,
            unit: "",
            color: "info"
        })
    },
    "Front Ride Height": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Front Ride Height",
            value: carSetup?.m_frontRideHeight,
            unit: "mm",
            color: "info"
        })
    },
    "Rear Ride Height": {
        type: "stat",
        getData: (carSetup) => ({
            title: "Rear Ride Height",
            value: carSetup?.m_rearRideHeight,
            unit: "mm",
            color: "info"
        })
    },
    "Speed Chart": {
        type: "chart",
        getData: (telemetry, history) => ({
            title: "Speed Over Time",
            data: history,
            label: "Speed (km/h)"
        })
    },
    "RPM Chart": {
        type: "chart",
        getData: (telemetry, history) => ({
            title: "RPM Over Time",
            data: history,
            label: "RPM"
        })
    },
    "Throttle Chart": {
        type: "chart",
        getData: (telemetry, history) => ({
            title: "Throttle Over Time",
            data: history,
            label: "Throttle (%)"
        })
    },
    "Brake Chart": {
        type: "chart",
        getData: (telemetry, history) => ({
            title: "Brake Over Time",
            data: history,
            label: "Brake (%)"
        })
    },
    "Lap Time Chart": {
        type: "chart",
        getData: (lapData, history) => ({
            title: "Lap Time Over Time",
            data: history,
            label: "Time (s)"
        })
    }
};

const CustomDashboard = () => {
    const { carTelemetry, lapData, carDamage, carSetup } = useSimRigWebSocket();
    const [components, setComponents] = useState([]);
    const [modal, setModal] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState("");
    const [layout, setLayout] = useState("grid");
    const [dashboardName, setDashboardName] = useState("");
    const [savedDashboards, setSavedDashboards] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [speedHistory, setSpeedHistory] = useState([]);
    const [rpmHistory, setRpmHistory] = useState([]);
    const [throttleHistory, setThrottleHistory] = useState([]);
    const [brakeHistory, setBrakeHistory] = useState([]);
    const [lapTimeHistory, setLapTimeHistory] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('savedDashboards');
        if (saved) {
            setSavedDashboards(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (carTelemetry) {
            setSpeedHistory(prev => [...prev.slice(-29), carTelemetry.m_speed || 0]);
            setRpmHistory(prev => [...prev.slice(-29), carTelemetry.m_engineRPM || 0]);
            setThrottleHistory(prev => [...prev.slice(-29), (carTelemetry.m_throttle * 100) || 0]);
            setBrakeHistory(prev => [...prev.slice(-29), (carTelemetry.m_brake * 100) || 0]);
        }
        if (lapData) {
            setLapTimeHistory(prev => [...prev.slice(-29), lapData.m_currentLapTime || 0]);
        }
    }, [carTelemetry, lapData]);

    const getHistoryForComponent = (componentName) => {
        switch (componentName) {
            case "Speed Chart":
                return speedHistory;
            case "RPM Chart":
                return rpmHistory;
            case "Throttle Chart":
                return throttleHistory;
            case "Brake Chart":
                return brakeHistory;
            case "Lap Time Chart":
                return lapTimeHistory;
            default:
                return [];
        }
    };

    const getDataForComponent = (componentName) => {
        const component = AVAILABLE_COMPONENTS[componentName];
        if (!component) return null;

        const history = getHistoryForComponent(componentName);
    
        if (componentName.includes("Lap")) {
            return component.getData(lapData, history);
        } else if (componentName.includes("Damage")) {
            return component.getData(carDamage, history);
        } else if (componentName.includes("Wing") || 
                  componentName.includes("Camber") || 
                  componentName.includes("Toe") || 
                  componentName.includes("Suspension") || 
                  componentName.includes("Anti-Roll") || 
                  componentName.includes("Ride Height")) {
            return component.getData(carSetup, history);
        } else {
            return component.getData(carTelemetry, history);
        }
    };

    const DashboardComponent = ({ componentName, index }) => {
        const data = getDataForComponent(componentName);
        if (!data) return null;

        return (
            <Col md={layout === "grid" ? "4" : "12"} className="mb-4">
                <Card className="shadow">
                    <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">{componentName}</h3>
                        <Button
                            color="danger"
                            size="sm"
                            onClick={() => removeComponent(index)}
                        >
                            Remove
                        </Button>
                    </CardHeader>
                    <CardBody>
                        {AVAILABLE_COMPONENTS[componentName].type === "stat" ? (
                            <TelemetryStat {...data} />
                        ) : (
                            <TelemetryChart {...data} />
                        )}
                    </CardBody>
                </Card>
            </Col>
        );
    };

    const toggleModal = () => setModal(!modal);
    const toggleSaveModal = () => setSaveModal(!saveModal);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const addComponent = () => {
        if (selectedComponent) {
            setComponents([...components, selectedComponent]);
            setSelectedComponent("");
            toggleModal();
        }
    };

    const removeComponent = (index) => {
        setComponents(components.filter((_, i) => i !== index));
    };

    const saveDashboard = () => {
        if (dashboardName) {
            const updatedDashboards = {
                ...savedDashboards,
                [dashboardName]: {
                    components,
                    layout
                }
            };
            setSavedDashboards(updatedDashboards);
            localStorage.setItem('savedDashboards', JSON.stringify(updatedDashboards));
            setDashboardName("");
            toggleSaveModal();
        }
    };

    const loadDashboard = (name) => {
        const dashboard = savedDashboards[name];
        if (dashboard) {
            setComponents(dashboard.components);
            setLayout(dashboard.layout);
        }
    };

    const deleteDashboard = (name) => {
        const updatedDashboards = { ...savedDashboards };
        delete updatedDashboards[name];
        setSavedDashboards(updatedDashboards);
        localStorage.setItem('savedDashboards', JSON.stringify(updatedDashboards));
    };

    const handleLoadDashboard = (name, e) => {
        e.preventDefault();
        e.stopPropagation();
        loadDashboard(name);
    };

    const handleDeleteDashboard = (name, e) => {
        e.preventDefault();
        e.stopPropagation();
        deleteDashboard(name);
    };

    return (
        <>
            <Header />
            <Container className="mt-4" fluid>
                <Row className="mb-4">
                    <Col>
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className="mb-0">Custom Dashboard</h3>
                                    <div className="d-flex gap-2">
                                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                            <DropdownToggle caret color="info">
                                                Load Dashboard
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {Object.keys(savedDashboards).map((name) => (
                                                    <DropdownItem 
                                                        key={name}
                                                        onClick={(e) => handleLoadDashboard(name, e)}
                                                        className="d-flex justify-content-between align-items-center"
                                                    >
                                                        <span>{name}</span>
                                                        <Button
                                                            color="danger"
                                                            size="sm"
                                                            onClick={(e) => handleDeleteDashboard(name, e)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Button
                                            color="primary"
                                            onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
                                        >
                                            {layout === "grid" ? "List View" : "Grid View"}
                                        </Button>
                                        <Button
                                            color="success"
                                            onClick={toggleSaveModal}
                                        >
                                            Save Dashboard
                                        </Button>
                                        <Button
                                            color="info"
                                            onClick={toggleModal}
                                        >
                                            Add Component
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    {components.map((component, index) => (
                        <DashboardComponent
                            key={component}
                            componentName={component}
                            index={index}
                        />
                    ))}
                </Row>

                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Add Component</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="componentSelect">Select Component</Label>
                            <Input
                                type="select"
                                id="componentSelect"
                                value={selectedComponent}
                                onChange={(e) => setSelectedComponent(e.target.value)}
                            >
                                <option value="">Select a component...</option>
                                <optgroup label="Car Telemetry">
                                    {Object.keys(AVAILABLE_COMPONENTS)
                                        .filter(name => !name.includes("Lap") && 
                                                      !name.includes("Damage") && 
                                                      !name.includes("Wing") && 
                                                      !name.includes("Camber") && 
                                                      !name.includes("Toe") && 
                                                      !name.includes("Suspension") && 
                                                      !name.includes("Anti-Roll") && 
                                                      !name.includes("Ride Height") && 
                                                      !name.includes("Chart"))
                                        .map((name) => (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                </optgroup>
                                <optgroup label="Lap Data">
                                    {Object.keys(AVAILABLE_COMPONENTS)
                                        .filter(name => name.includes("Lap") && !name.includes("Chart"))
                                        .map((name) => (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                </optgroup>
                                <optgroup label="Car Damage">
                                    {Object.keys(AVAILABLE_COMPONENTS)
                                        .filter(name => name.includes("Damage"))
                                        .map((name) => (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                </optgroup>
                                <optgroup label="Car Setup">
                                    {Object.keys(AVAILABLE_COMPONENTS)
                                        .filter(name => name.includes("Wing") || 
                                                      name.includes("Camber") || 
                                                      name.includes("Toe") || 
                                                      name.includes("Suspension") || 
                                                      name.includes("Anti-Roll") || 
                                                      name.includes("Ride Height"))
                                        .map((name) => (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                </optgroup>
                                <optgroup label="Charts">
                                    {Object.keys(AVAILABLE_COMPONENTS)
                                        .filter(name => name.includes("Chart"))
                                        .map((name) => (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                </optgroup>
                            </Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={addComponent}>
                            Add
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={saveModal} toggle={toggleSaveModal}>
                    <ModalHeader toggle={toggleSaveModal}>Save Dashboard</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="dashboardName">Dashboard Name</Label>
                            <Input
                                type="text"
                                id="dashboardName"
                                value={dashboardName}
                                onChange={(e) => setDashboardName(e.target.value)}
                                placeholder="Enter dashboard name"
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleSaveModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={saveDashboard}>
                            Save
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </>
    );
};

export default CustomDashboard; 