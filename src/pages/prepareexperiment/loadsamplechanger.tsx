import { ContainerDewar } from 'pages/model';
import { Card, Tab, Col, Row, Nav } from 'react-bootstrap';

import './loadsamplechanger.scss';

import { useBeamlinesObjects } from 'hooks/site';
import DnDLoadSampleChanger from './dndloadsamplechanger';
import TableLoadSampleChanger from './tableloadsamplechanger';

export default function LoadSampleChanger({
  dewars,
  proposalName,
  setContainerPosition,
  setContainerBeamline,
}: {
  dewars?: ContainerDewar[];
  proposalName: string;
  setContainerPosition: (containerId: number, position: string) => void;
  // eslint-disable-next-line no-unused-vars
  setContainerBeamline: (containerId: number, beamline: string) => void;
}) {
  const beamlines = useBeamlinesObjects('MX');

  const setContainerLocation = (containerId: number, beamline: string, position: string) => {
    setContainerBeamline(containerId, beamline);
    setContainerPosition(containerId, position);
  };

  return (
    <Tab.Container defaultActiveKey="visual">
      <Card>
        <Card.Header style={{ paddingBottom: 0 }}>
          <Row>
            <Col md="auto">
              <h6 style={{ margin: 5 }}>2. Load sample changer</h6>
            </Col>
            <Col></Col>
            <Col md="auto">
              <Nav className="tabs-loadsamplechanger" variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="visual">Visual</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="table">Table</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ padding: 0, paddingTop: 20 }}>
          <Tab.Content>
            <Tab.Pane eventKey="visual">
              <DnDLoadSampleChanger beamlines={beamlines} setContainerLocation={setContainerLocation} proposalName={proposalName} dewars={dewars}></DnDLoadSampleChanger>
            </Tab.Pane>
            <Tab.Pane eventKey="table">
              <TableLoadSampleChanger
                beamlines={beamlines}
                setContainerPosition={setContainerPosition}
                setContainerBeamline={setContainerBeamline}
                proposalName={proposalName}
                dewars={dewars}
              ></TableLoadSampleChanger>
            </Tab.Pane>
          </Tab.Content>
        </Card.Body>
      </Card>
    </Tab.Container>
  );
}
