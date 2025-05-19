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
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import riderJson from "../rider.json";
import axios from "axios";

const Index = () => {
  const [contributors, setContributors] = useState([]);

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