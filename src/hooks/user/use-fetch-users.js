import { useState, useEffect } from 'react';
import userService from '../../services/user';

export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await userService.all();

      setUsers(data.users);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async index => {
    try {
      await userService.delete(users[index].id);
      users.splice(index, 1);
      setUsers([...users]);
    } catch (e) {
      setError(true);
    }
  };

  return { users, error, handleDelete };
};
