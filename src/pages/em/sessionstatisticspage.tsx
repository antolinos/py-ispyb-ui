import React from 'react';
import { useParams } from 'react-router-dom';
import EMPage from 'pages/em/empage';
import { Card } from 'react-bootstrap';
import { useEMStatistics } from 'hooks/ispyb';
import { useGridSquareStatisticsToPlot } from 'pages/em/helper';
import EmStatisticsPanel from 'pages/em/emstatisticspanel';

type Param = {
  sessionId: string;
  proposalName: string;
};

export default function SessionStatisticsPage() {
  const { sessionId, proposalName = '' } = useParams<Param>();

  const { data, isError } = useEMStatistics({ sessionId, proposalName });
  if (isError) throw Error(isError);

  const statisticsPlotData = useGridSquareStatisticsToPlot(data);
  return (
    <EMPage sessionId={sessionId} proposalName={proposalName}>
      <Card>
        <EmStatisticsPanel statisticsPlotData={statisticsPlotData}></EmStatisticsPanel>
      </Card>
    </EMPage>
  );
}
