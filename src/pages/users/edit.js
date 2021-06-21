import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSaveUsers } from '../../hooks/user/use-save-users';
import UserForm from '../../components/users/user-form';
import UserService from '../../services/user';

function UserPageEdit() {
  const { handleSubmit, handleCancel, handleChange, setFormData, formData } = useSaveUsers();
  const { id } = useParams();

  const findUser = async () => {
    try {
      const { data } = await UserService.find(id);
      setFormData(data.user);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(async () => {
    findUser();
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
