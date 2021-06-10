import { useState, useEffect } from 'react';
import userService from '../../services/user';

export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(async () => {
    let mounted = true;
    try {
      const { data } = await userService.all();
      if (mounted) {
        setUsers(data.users);
      }
    } catch (e) {
      if (mounted) {
        setError(true);
      }
    }
    return () => (mounted = false);
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
