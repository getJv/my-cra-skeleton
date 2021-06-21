import React from 'react';

function UserList({ users, handleDelete, handleEdit }) {
  const editButton = id => (
    <button data-testid="edit-button" type="button" onClick={() => handleEdit(id)}>
      Edit
    </button>
  );
  const deleteButton = index => (
    <button data-testid="delete-button" type="button" onClick={() => handleDelete(index)}>
      Delete
    </button>
  );
  return (
    <ul data-testid="user-list">
      {users.map(({ id, name }, index) => (
        <li key={id}>
          {editButton(id)}
          {deleteButton(index)}| {name}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
