import DataResourcePage from './DataResourcePage';

const Leaderboard = () => {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  return (
    <DataResourcePage
      title="Leaderboard"
      description="Review competitive standings and inspect each ranking payload without leaving the page."
      endpoint={endpoint}
      emptyMessage="No leaderboard rows matched the current filter."
      accentClass="text-bg-warning"
    />
  );
};

export default Leaderboard;
