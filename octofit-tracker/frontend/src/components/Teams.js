import DataResourcePage from './DataResourcePage';

const Teams = () => {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  return (
    <DataResourcePage
      title="Teams"
      description="Inspect team membership and team-level metrics in the same table layout used across the app."
      endpoint={endpoint}
      emptyMessage="No teams matched the current filter."
      accentClass="text-bg-success"
    />
  );
};

export default Teams;
