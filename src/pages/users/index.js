import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFetchUsers } from '../../hooks/user/use-fetch-users';
import UserList from '../../components/users/user-list';

const UserPage = () => {
  const { users, handleDelete } = useFetchUsers();
  const history = useHistory();

  const handleEdit = id => {
    history.push(`/users/${id}/edit`);
  };

  const handleCreate = () => {
    history.push('/users/create');
  };

  return (
    <>
      <button type="button" onClick={handleCreate}>
        Create
      </button>

      <UserList users={users} handleDelete={handleDelete} handleEdit={handleEdit} />
    </>
  );
};

export default UserPage;
