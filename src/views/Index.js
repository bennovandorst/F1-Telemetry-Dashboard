/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {useEffect, useRef, useState} from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import { Chart } from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import {useSimRigWebSocket} from "../wss";
import riderJson from "../rider.json";
import axios from "axios";

const Index = () => {
  const notifRef = useRef();
  const [alerts, setAlerts] = useState([]);
  const [currAlert, setCurrAlert] = useState({ id: "", message: "" });
  const [contributors, setContributors] = useState([]);
  const { header } = useSimRigWebSocket();

  useEffect(() => {
    axios.get("https://api.github.com/repos/bennovandorst/Rider/contributors")
        .then((res) => {
          setContributors(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
  }, []);

  return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row className="align-items-center">
            <Col>
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Welcome to Rider</h3>
                </CardHeader>
                <CardBody>Check the github page for a usage guide.</CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            {/* Game Info */}
            <Col>
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Game Info</h3>
                </CardHeader>
                <CardBody>
                  {header ? (
                      <Table className="table-flush" responsive>
                        <tbody>
                        <tr>
                          <td><strong>Packet Format</strong></td>
                          <td>{header.m_packetFormat}</td>
                        </tr>
                        <tr>
                          <td><strong>Game Year</strong></td>
                          <td>{header.m_gameYear}</td>
                        </tr>
                        <tr>
                          <td><strong>Game Version</strong></td>
                          <td>{header.m_gameMajorVersion}.{header.m_gameMinorVersion}</td>
                        </tr>
                        <tr>
                          <td><strong>Packet ID</strong></td>
                          <td>{header.m_packetId}</td>
                        </tr>
                        <tr>
                          <td><strong>Packet Version</strong></td>
                          <td>{header.m_packetVersion}</td>
                        </tr>
                        <tr>
                          <td><strong>Player Car Index</strong></td>
                          <td>{header.m_playerCarIndex}</td>
                        </tr>
                        <tr>
                          <td><strong>Session Time</strong></td>
                          <td>{header.m_sessionTime.toFixed(2)}</td>
                        </tr>
                        </tbody>
                      </Table>
                  ) : (
                      <p>No header data received yet.</p>
                  )}
                </CardBody>
              </Card>
            </Col>

            {/* Contributors */}
            <Col>
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Contributors</h3>
                </CardHeader>
                <CardBody>
                  {contributors.length ? (
                      <ul className="list-unstyled">
                        {contributors.map((contributor) => (
                            <li key={contributor.id} className="mb-2 d-flex align-items-center">
                              <img
                                  src={contributor.avatar_url}
                                  alt={contributor.login}
                                  className="rounded-circle"
                                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                              />
                              <a target="_blank" rel="noopener noreferrer">
                                {contributor.login}
                              </a>
                            </li>
                        ))}
                      </ul>
                  ) : (
                      <p>Loading contributors...</p>
                  )}
                </CardBody>
              </Card>
            </Col>

            {/* Changelog */}
            <Col>
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Rider Changelog</h3>
                </CardHeader>
                <CardBody>
                  <h1>Version - {riderJson.version}</h1>
                  <h3>Updates:</h3>
                  <ul>
                    {riderJson.updates.length
                        ? riderJson.updates.map((info, idx) => <li key={idx}>{info}</li>)
                        : null}
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
  );
};

export default Index;