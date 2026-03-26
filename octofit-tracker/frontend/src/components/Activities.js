import DataResourcePage from './DataResourcePage';

const Activities = () => {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  return (
    <DataResourcePage
      title="Activities"
      description="Track the latest logged activities from the backend API in a sortable, filterable view."
      endpoint={endpoint}
      emptyMessage="No activities matched the current filter."
      accentClass="text-bg-primary"
    />
  );
};

export default Activities;
