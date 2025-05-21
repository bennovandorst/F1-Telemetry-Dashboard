import {useEffect, useRef, useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import riderJson from "../rider.json";
import axios from "axios";
import {useSimRigWebSocket} from "../wss";

const Index = () => {
  const [contributors, setContributors] = useState([]);
  const { header, currentSimRigId } = useSimRigWebSocket();

  useEffect(() => {
    const repos = [
      "bennovandorst/Rider",
      "bennovandorst/f1-game-udp-specs"
    ];

    const excludedUsers = ["bennovandorst-edu", "codegefluester"];

    Promise.all(
        repos.map(repo =>
            axios.get(`https://api.github.com/repos/${repo}/contributors`)
                .then(res => res.data)
                .catch(() => [])
        )
    ).then(async results => {
      const allContributors = [].concat(...results);
      const filteredContributors = allContributors.filter(
          contributor => !excludedUsers.includes(contributor.login)
      );
      const uniqueContributors = Array.from(
          new Map(filteredContributors.map(c => [c.login, c])).values()
      );
      const contributorsWithNames = await Promise.all(
          uniqueContributors.map(async (contributor) => {
            try {
              const { data } = await axios.get(`https://api.github.com/users/${contributor.login}`);
              return { ...contributor, displayName: data.name || contributor.login };
            } catch {
              return { ...contributor, displayName: contributor.login };
            }
          })
      );
      setContributors(contributorsWithNames);
    }).catch(err => {
      console.error(err);
    });
  }, []);

  return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row className="align-items-center">
            <Col>
              <Card className="shadow border-0">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Welcome to Rider</h3>
                </CardHeader>
                <CardBody className="bg-white">
                  {header && Object.keys(header).length ? (
                    <div className="d-flex align-items-center">
                      <Badge color="success" className="mr-3">Active</Badge>
                      <div>
                        <h4 className="mb-1">SimRig {currentSimRigId}</h4>
                        <p className="text-muted mb-0">
                          Running F1® {header?.m_gameYear} version {header?.m_gameMajorVersion}.{header?.m_gameMinorVersion}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <Badge color="warning" className="mr-3">Inactive</Badge>
                      <div>
                        <h4 className="mb-1">SimRig {currentSimRigId}</h4>
                        <p className="text-muted mb-0">Not in a session</p>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg="6">
              <Card className="shadow border-0 h-100">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Contributors</h3>
                </CardHeader>
                <CardBody>
                  {contributors.length ? (
                    <div className="contributors-grid">
                      {contributors.map((contributor) => (
                        <div key={contributor.id} className="contributor-item d-flex align-items-center p-2">
                          <img
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            className="rounded-circle shadow-sm"
                            style={{ width: "48px", height: "48px", marginRight: "15px" }}
                          />
                          <div>
                            <h3 className="mb-0">{contributor.displayName}</h3>
                            <a >
                              @{contributor.login}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                      <p className="mt-2 mb-0">Loading contributors...</p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>

            <Col lg="6">
              <Card className="shadow border-0 h-100">
                <CardHeader className="transparent">
                  <h3 className="mb-0">Rider Changelog</h3>
                </CardHeader>
                <CardBody>
                  <div className="version-badge mb-4">
                    <Badge color="primary" className="px-3 py-2">
                      Version {riderJson.version}
                    </Badge>
                  </div>
                  <div className="updates-list">
                    {riderJson.updates.length ? (
                      <ul className="list-unstyled">
                        {riderJson.updates.map((info, idx) => (
                          <li key={idx} className="mb-3 d-flex align-items-start">
                            <i className="ni ni-check-bold text-success mr-2 mt-1"></i>
                            <span>{info}</span>
                          </li>
                        ))}
                      </ul>
                  ) : null }
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
  );
};

export default Index;