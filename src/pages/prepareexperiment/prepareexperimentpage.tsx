import { Col, Row } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { useDewars } from 'hooks/ispyb';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { Dewar } from 'pages/model';
import './prepareexperimentpage.scss';
import { formatDateTo, parseDate } from 'helpers/dateparser';

const dateFormatter = (cell: string) => {
  if (cell) {
    return `${formatDateTo(cell, 'dd/MM/yyyy')}`;
  }
  return cell;
};

const shipmentIsProcessing = (s: Shipment) => {
  return s.status && s.status.toLowerCase().includes('processing') ? 1 : 0;
};

const sortShipments = (a: Shipment, b: Shipment) => {
  const aN = shipmentIsProcessing(a);
  const bN = shipmentIsProcessing(b);
  if (aN == bN) {
    if (a.creationDate && b.creationDate) {
      return parseDate(b.creationDate).getTime() - parseDate(a.creationDate).getTime();
    }
    if (a.creationDate) {
      return -1;
    }
    return 1;
  }
  return bN - aN;
};

type Param = {
  proposalName: string;
};

interface Shipment {
  shippingId: number;
  name: string;
  status: string;
  creationDate: string;
  dewars: Dewar[];
}

export default function PrepareExperimentPage() {
  const { proposalName = '' } = useParams<Param>();
  const { data, isError } = useDewars({ proposalName });
  if (isError) throw Error(isError);
  if (!data) throw Error('error while fetching dewars');

  const shipments = _(data)
    .groupBy((d) => d.shippingId)
    .filter((dewars: Dewar[]) => dewars.length > 0)
    .map((dewars: Dewar[]) => {
      const d = dewars[0];
      const res: Shipment = { shippingId: d.shippingId, name: d.shippingName, status: d.shippingStatus, creationDate: d.creationDate, dewars: dewars };
      return res;
    })
    .value();

  const columns: ColumnDescription<Shipment>[] = [
    { text: 'id', dataField: 'shippingId', hidden: true },
    {
      text: 'Name',
      dataField: 'name',
      filter: textFilter({
        placeholder: 'Search...',
      }),
    },
    {
      text: 'Status',
      dataField: 'status',
      filter: textFilter({
        placeholder: 'Search...',
      }),
    },
    {
      text: 'Created on',
      dataField: 'creationDate',
      formatter: dateFormatter,
      filter: textFilter({
        placeholder: 'Search...',
      }),
    },
    // { text: 'id', dataField: 'dewarId', hidden: true }
  ];

  return (
    <Row>
      <Col>
        <Row style={{ maxWidth: 600, margin: 'auto' }}>
          <BootstrapTable
            bootstrap4
            wrapperClasses="table-responsive"
            keyField="Id"
            data={shipments.sort(sortShipments)}
            columns={columns}
            rowClasses={(row: Shipment) => {
              return shipmentIsProcessing(row) ? 'processing' : '';
            }}
            pagination={paginationFactory({ sizePerPage: 20, showTotal: true, hideSizePerPage: true, hidePageListOnlyOnePage: true })}
            filter={filterFactory()}
          />
        </Row>
      </Col>
      <Col>
        <p>t</p>
      </Col>
    </Row>
  );
}
