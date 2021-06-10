import { useSaveUsers } from '../../hooks/user/use-save-users';
import UserForm from '../../components/users/user-form';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import UserService from '../../services/user';

function UserPageEdit() {
  const { handleSubmit, handleCancel, handleChange, setFormData, formData } = useSaveUsers();
  const { id } = useParams();

  useEffect(async () => {
    let mounted = true;
    try {
      const { data } = await UserService.find(id);
      setFormData(data.user);
    } catch (error) {
      console.log(error);
    }
    return () => (mounted = false);
  }, [id]);

  return (
    <UserForm
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleChange={handleChange}
      formData={formData}
    />
  );
}

export default UserPageEdit;
