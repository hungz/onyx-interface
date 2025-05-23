/** @jsxImportSource @emotion/react */
import { BigNumber } from 'bignumber.js';
import { Spinner } from 'components';
import React, { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'translation';
import { Proposal as ProposalType, VotersDetails } from 'types';
import type { TransactionReceipt } from 'web3-core';

import { useGetCurrentVotes, useGetProposal, useGetVoteReceipt, useGetVoters } from 'clients/api';
import useGetPriorVotes from 'clients/api/queries/getPriorVotes/useGetPriorVotes';
import { AuthContext } from 'context/AuthContext';
import useVote, { UseVoteParams } from 'hooks/useVote';

import { Description } from './Description';
import ProposalSummary from './ProposalSummary';
import VoteModal from './VoteModal';
import VoteSummary from './VoteSummary';
import { useStyles } from './styles';
import TEST_IDS from './testIds';

interface ProposalUiProps {
  proposal: ProposalType | undefined;
  forVoters: VotersDetails;
  againstVoters: VotersDetails;
  abstainVoters: VotersDetails;
  vote: (params: UseVoteParams) => Promise<TransactionReceipt>;
  votingEnabled: boolean;
  voteWeight: BigNumber;
  stakeAmount: BigNumber;
  isVoteLoading: boolean;
}

export const ProposalUi: React.FC<ProposalUiProps> = ({
  proposal,
  forVoters,
  againstVoters,
  abstainVoters,
  vote,
  votingEnabled,
  voteWeight,
  stakeAmount,
  isVoteLoading,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [voteModalType, setVoteModalType] = useState<0 | 1 | 2 | undefined>(undefined);

  // Summing contract totals because there is a delay getting the totals from the server
  const totalVotesWei = useMemo(
    () => forVoters.sumVotes.plus(0),
    [
      forVoters.sumVotes.toFixed(),
      againstVoters.sumVotes.toFixed(),
      abstainVoters.sumVotes.toFixed(),
    ],
  );

  if (!proposal) {
    return (
      <div css={[styles.root, styles.spinner]}>
        <Spinner />
      </div>
    );
  }

  return (
    <div css={styles.root}>
      <ProposalSummary css={styles.summary} proposal={proposal} />

      <div css={styles.votes}>
        <VoteSummary
          css={styles.vote}
          label={t('vote.for')}
          votedValueWei={forVoters.sumVotes}
          votedTotalWei={totalVotesWei}
          voters={forVoters.result}
          openVoteModal={() => setVoteModalType(1)}
          progressBarColor={styles.successColor}
          votingEnabled={votingEnabled}
          testId={TEST_IDS.voteSummary.for}
        />

        <VoteSummary
          css={styles.vote}
          label={t('vote.against')}
          votedValueWei={againstVoters.sumVotes}
          votedTotalWei={totalVotesWei}
          voters={againstVoters.result}
          openVoteModal={() => setVoteModalType(0)}
          progressBarColor={styles.againstColor}
          votingEnabled={votingEnabled}
          testId={TEST_IDS.voteSummary.against}
        />

        {/* <VoteSummary
          css={styles.vote}
          label={t('vote.abstain')}
          votedValueWei={abstainVoters.sumVotes}
          votedTotalWei={totalVotesWei}
          voters={abstainVoters.result}
          openVoteModal={() => setVoteModalType(2)}
          progressBarColor={styles.abstainColor}
          votingEnabled={votingEnabled}
          testId={TEST_IDS.voteSummary.abstain}
        /> */}
      </div>

      <Description description={proposal.description} actions={proposal.actions} />

      {voteModalType !== undefined && (
        <VoteModal
          voteModalType={voteModalType}
          handleClose={() => setVoteModalType(undefined)}
          vote={async () => vote({ proposalId: proposal.id, voteType: Boolean(voteModalType) })}
          voteWeight={voteWeight}
          stakeAmount={stakeAmount}
          isVoteLoading={isVoteLoading}
          proposal={proposal}
        />
      )}
    </div>
  );
};

const Proposal = () => {
  const { account } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const accountAddress = account?.address;
  const { data: proposal } = useGetProposal({ id }, { enabled: !!id });

  const {
    data: votingWeightData = {
      votesWei: new BigNumber(0),
    },
  } = useGetCurrentVotes({ accountAddress: accountAddress || '' }, { enabled: !!accountAddress });

  const {
    data: currentVotesData = {
      priorVotes: new BigNumber(0),
    },
  } = useGetPriorVotes(
    {
      accountAddress: accountAddress ?? '',
      blockNumber: proposal?.startBlock ?? 0,
    },
    { enabled: !!accountAddress && !!proposal?.startBlock },
  );

  const defaultValue = {
    result: [],
    sumVotes: new BigNumber(0),
  };
  const { data: againstVoters = defaultValue } = useGetVoters(
    { id: id || '', support: false, limit: 500 },
    { enabled: !!id },
  );
  const { data: forVoters = defaultValue } = useGetVoters(
    { id: id || '', support: true, limit: 500 },
    { enabled: !!id },
  );
  const { data: abstainVoters = defaultValue } = useGetVoters(
    { id: id || '', support: false, limit: 500 },
    { enabled: !!id },
  );

  const { vote, isLoading } = useVote({ accountAddress: account?.address || '' });
  const { data: userVoteReceipt } = useGetVoteReceipt(
    { proposalId: parseInt(id, 10), accountAddress },
    { enabled: !!accountAddress },
  );

  const votingEnabled =
    !!accountAddress &&
    proposal?.state === 'Active' &&
    userVoteReceipt?.voteSupport === 'NOT_VOTED';

  return (
    <ProposalUi
      proposal={proposal}
      forVoters={forVoters}
      againstVoters={againstVoters}
      abstainVoters={abstainVoters}
      vote={vote}
      votingEnabled={votingEnabled}
      voteWeight={currentVotesData.priorVotes}
      stakeAmount={votingWeightData.votesWei}
      isVoteLoading={isLoading}
    />
  );
};

export default Proposal;
