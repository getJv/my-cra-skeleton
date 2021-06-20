import { Link } from 'react-router-dom';

function UserList({ users, handleDelete }) {
  const editButton = id => (
    <Link to={`/users/${id}/edit`}>
      <button type="button">Edit</button>
    </Link>
  );
  const deleteButton = index => (
    <button type="button" onClick={() => handleDelete(index)}>
      Delete
    </button>
  );
  return (
    <ul>
      {users.map(({ id, name }, index) => (
        <li key={id}>
          {editButton(id)}
          {deleteButton(index)} | {name}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
