import { DataCollectionGroup } from 'pages/mx/model';
import UI from 'config/ui';
import { Col, Row } from 'react-bootstrap';
import ZoomImage from 'components/image/zoomimage';
import { getCrystalImage } from 'api/ispyb';
import { useParams } from 'react-router-dom';
import SimpleParameterTable from 'components/table/simpleparametertable';

type Param = {
  proposalName: string;
};

export default function SampleDataCollectionGroupPanel({ dataCollectionGroup }: { dataCollectionGroup: DataCollectionGroup }) {
  const { proposalName = '' } = useParams<Param>();

  const { Protein_acronym, BLSample_name, Shipping_shippingName, Dewar_code, Container_code, BLSample_location, Container_beamlineLocation, Container_sampleChangerLocation } =
    dataCollectionGroup;

  return (
    <>
      <Row>
        <Col>
          <SimpleParameterTable
            parameters={[
              { key: 'Protein', value: Protein_acronym },
              { key: 'Sample', value: BLSample_name },
              { key: 'Shipment', value: Shipping_shippingName },
              { key: 'Parcel', value: Dewar_code },
              { key: 'Container / Position', value: `${Container_code}/${BLSample_location}` },
              { key: 'Beamline location', value: Container_beamlineLocation },
              { key: 'Sample Changer Location', value: Container_sampleChangerLocation },
            ]}
          ></SimpleParameterTable>
        </Col>
        <Col>
          {UI.MX.showCrystalSnapshot1 && (
            <ZoomImage alt="Crystal 1" src={getCrystalImage({ proposalName, dataCollectionId: dataCollectionGroup.DataCollection_dataCollectionId, imageIndex: 1 }).url} />
          )}
        </Col>
        <Col>
          {UI.MX.showCrystalSnapshot2 && (
            <ZoomImage alt="Crystal 2" src={getCrystalImage({ proposalName, dataCollectionId: dataCollectionGroup.DataCollection_dataCollectionId, imageIndex: 2 }).url} />
          )}
        </Col>
        <Col>
          {UI.MX.showCrystalSnapshot3 && (
            <ZoomImage alt="Crystal 3" src={getCrystalImage({ proposalName, dataCollectionId: dataCollectionGroup.DataCollection_dataCollectionId, imageIndex: 3 }).url} />
          )}
        </Col>
        <Col>
          {UI.MX.showCrystalSnapshot4 && (
            <ZoomImage alt="Crystal 4" src={getCrystalImage({ proposalName, dataCollectionId: dataCollectionGroup.DataCollection_dataCollectionId, imageIndex: 4 }).url} />
          )}
        </Col>
      </Row>
    </>
  );
}
