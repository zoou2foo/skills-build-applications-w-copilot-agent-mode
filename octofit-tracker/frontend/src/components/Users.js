import DataResourcePage from './DataResourcePage';

const Users = () => {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  return (
    <DataResourcePage
      title="Users"
      description="Browse user profiles from the REST API with reusable filtering and modal detail inspection."
      endpoint={endpoint}
      emptyMessage="No users matched the current filter."
      accentClass="text-bg-info"
    />
  );
};

export default Users;
