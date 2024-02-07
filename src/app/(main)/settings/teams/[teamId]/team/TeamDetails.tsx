import { TeamContext } from 'app/(main)/teams/[teamId]/TeamProvider';
import { useLogin, useMessages } from 'components/hooks';
import Icons from 'components/icons';
import PageHeader from 'components/layout/PageHeader';
import { ROLES } from 'lib/constants';
import { useContext, useState } from 'react';
import { Flexbox, Item, Tabs } from 'react-basics';
import TeamLeaveButton from '../../TeamLeaveButton';
import TeamAdmin from './TeamAdmin';
import TeamEditForm from './TeamEditForm';

export function TeamDetails({ teamId }: { teamId: string }) {
  const team = useContext(TeamContext);
  const { formatMessage, labels } = useMessages();
  const { user } = useLogin();
  const [tab, setTab] = useState('details');

  const canEdit = team?.teamUser?.find(
    ({ userId, role }) => role === ROLES.teamOwner && userId === user.id,
  );

  return (
    <Flexbox direction="column">
      <PageHeader title={team?.name} icon={<Icons.Users />}>
        {!canEdit && <TeamLeaveButton teamId={team.id} teamName={team.name} />}
      </PageHeader>
      <Tabs selectedKey={tab} onSelect={(value: any) => setTab(value)} style={{ marginBottom: 30 }}>
        <Item key="details">{formatMessage(labels.details)}</Item>
        <Item key="admin">{formatMessage(labels.admin)}</Item>
      </Tabs>
      {tab === 'details' && <TeamEditForm teamId={teamId} allowEdit={canEdit} />}
      {canEdit && tab === 'admin' && <TeamAdmin teamId={teamId} />}
    </Flexbox>
  );
}

export default TeamDetails;
