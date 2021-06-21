import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import UserList from './user-list';

const users = [
  {
    id: 1,
    name: 'first name',
  },
];
const handleDelete = jest.fn();

const renderUserList = () => {
  render(<UserList users={users} handleDelete={handleDelete} />);
};
describe('UserList', () => {
  it('should render the UserList component', () => {
    renderUserList();
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
  });
  it('should call props.handleDelete when button have clicked', async () => {
    renderUserList();

    const deleteButton = screen.getByTestId('delete-button');

    await fireEvent.click(deleteButton);

    expect(deleteButton).toHaveBeenCalledTimes(1);
    expect(deleteButton).toHaveBeenCalledWith(users[0]);
  });
});
