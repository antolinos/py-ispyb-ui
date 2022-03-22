import { faTimes, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dewar, Shipment } from 'pages/model';
import { MXContainer } from 'pages/mx/container/mxcontainer';
import { Container } from 'postcss';
import { useState } from 'react';
import { Button, Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { mutate } from 'swr';
import { ToggleShipmentStatus } from './prepareexperimentpage';

export default function LoadSampleChanger({ dewars, proposalName }: { dewars?: Dewar[]; proposalName: string }) {
  const [container, setContainer] = useState<Dewar | undefined>(undefined);
  return (
    <Card>
      <Card.Header>Load sample changer</Card.Header>
      <Card.Body>{dewars ? <ContainerTable dewars={dewars} setContainer={setContainer}></ContainerTable> : 'You must select a shipment first'}</Card.Body>
      <Card.Body>
        {container ? (
          <MXContainer sessionId={container.sessionId || ''} proposalName={proposalName} containerId={String(container.containerId)}></MXContainer>
        ) : (
          'You must select a shipment first'
        )}
      </Card.Body>
    </Card>
  );
}

export function ContainerTable({ dewars, setContainer }: { dewars: Dewar[]; setContainer: (c: Dewar) => void }) {
  const columns: ColumnDescription<Dewar>[] = [
    { text: 'id', dataField: 'containerId', hidden: false },
    {
      text: '',
      dataField: 'shippingId',
      formatter: (cell, row) => {
        return <SelectContainer container={row} setContainer={setContainer}></SelectContainer>;
      },
      headerStyle: { width: 40 },
      style: { verticalAlign: 'middle', textAlign: 'center' },
    },
  ];

  return (
    <Col>
      <Row>
        <BootstrapTable
          bootstrap4
          wrapperClasses="table-responsive"
          keyField="Id"
          data={dewars}
          columns={columns}
          condensed
          striped
          pagination={paginationFactory({ sizePerPage: 5, showTotal: true, hideSizePerPage: true, hidePageListOnlyOnePage: true })}
          filter={filterFactory()}
        />
      </Row>
    </Col>
  );
}

export function SelectContainer({ container, setContainer }: { container: Dewar; setContainer: (c: Dewar) => void }) {
  const onClick = () => {
    setContainer(container);
  };
  return (
    <OverlayTrigger placement="right" overlay={<Tooltip>Place container</Tooltip>}>
      <Button style={{ padding: 0 }} variant="link" onClick={onClick}>
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      </Button>
    </OverlayTrigger>
  );
}
