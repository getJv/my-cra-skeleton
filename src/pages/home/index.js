import { useFetchUsers } from '../../hooks/user/use-fetch-users';
import UserList from '../../components/users/user-list';
import { Link } from 'react-router-dom';

const Home = () => {
  let { users, handleDelete } = useFetchUsers();

  return (
    <>
      <Link to="/users/create">
        <button type={'button'}> Create </button>
      </Link>
      <UserList users={users} handleDelete={handleDelete} />
    </>
  );
};

export default Home;
