import React from 'react';
import { useParams } from 'react-router-dom';
import MXPage from 'pages/mx/mxpage';
import { Card } from 'react-bootstrap';
import { useMXDataCollectionsBy } from 'hooks/ispyb';
import DataCollectionPanel from 'pages/mx/datacollection/datacollectionpanel';
import { DataCollection } from 'pages/mx/model';

type Param = {
  sessionId: string;
  proposalName: string;
};

export default function EMDataCollectionsPage() {
  const { sessionId = '', proposalName = '' } = useParams<Param>();
  const { data: dataCollections, isError } = useMXDataCollectionsBy({ proposalName, sessionId });
  if (isError) throw Error(isError);
  return (
    <MXPage sessionId={sessionId} proposalName={proposalName}>
      <Card>
        <div style={{ margin: 10 }}>
          {dataCollections.map((dataCollection: DataCollection) => (
            <DataCollectionPanel dataCollection={dataCollection} proposalName={proposalName} sessionId={sessionId}></DataCollectionPanel>
          ))}
        </div>
      </Card>
    </MXPage>
  );
}
