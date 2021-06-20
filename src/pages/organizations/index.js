import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useOrganizationStore } from '../../store/organization';

const OrganizationPage = () => {
  const { fetchOrganizations, deleteOrganization } = useOrganizationStore(store => store.actions);
  const { organizations } = useOrganizationStore(store => store.state);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const deleteButton = organization => (
    <button type="button" onClick={() => deleteOrganization(organization)}>
      Delete
    </button>
  );

  return (
    <>
      <Link to="/organizations/create">
        <button type="button"> Create </button>
      </Link>
      {organizations.map(org => (
        <p key={org.id}>
          {org.title} {deleteButton(org)}
        </p>
      ))}
    </>
  );
};

export default OrganizationPage;
