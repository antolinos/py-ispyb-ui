import React from 'react';
import { useProposals } from 'hooks/ispyb';
import Page from 'pages/page';
import ProposalTable from './proposal/proposaltable';

export default function ProposalsPage() {
  const { data, isError } = useProposals();
  if (isError) throw Error(isError);
  if (!data) throw Error('error while fetching proposals');

  return (
    <Page>
      <ProposalTable data={data}></ProposalTable>
    </Page>
  );
}