import DataResourcePage from './DataResourcePage';

const Workouts = () => {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  return (
    <DataResourcePage
      title="Workouts"
      description="Explore workout suggestions and logged routines with a shared Bootstrap-first presentation."
      endpoint={endpoint}
      emptyMessage="No workouts matched the current filter."
      accentClass="text-bg-danger"
    />
  );
};

export default Workouts;
