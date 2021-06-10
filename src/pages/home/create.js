import { useSaveUsers } from '../../hooks/user/use-save-users';
import UserForm from '../../components/users/user-form';

function UserPageCreate() {
  const { handleSubmit, handleCancel, handleChange, formData } = useSaveUsers();
  return (
    <UserForm
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleChange={handleChange}
      formData={formData}
    />
  );
}

export default UserPageCreate;
