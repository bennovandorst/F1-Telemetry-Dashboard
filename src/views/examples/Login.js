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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import {useSimRigWebSocket} from "../../wss";

const Login = () => {
  const { connected, connect, alert } = useSimRigWebSocket();

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
                  className="btn-neutral btn-icon"
                  color="default"
                  onClick={connect(1)}
              >
                <span className="btn-inner--icon fas fa-car-crash"></span>
                <span className="btn-inner--text">SimRig 1</span>
              </Button>
              <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  onClick={connect(2)}
              >
                <span className="btn-inner--icon fas fa-car-crash"></span>
                <span className="btn-inner--text">SimRig 2</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-3 py-lg-3">
            <div className="text-center text-muted mb-4">
              <small>Jason van Schaik ik kom je halen</small>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
