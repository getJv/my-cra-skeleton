import { screen, render, fireEvent } from '@testing-library/react';
import React from 'react';
import UserList from './user-list';

const users = [
  {
    id: 1,
    name: 'first name',
  },
  {
    id: 2,
    name: 'second name',
  },
];
const handleDelete = jest.fn();
const handleEdit = jest.fn();
const renderUserList = () => {
  render(<UserList users={users} handleDelete={handleDelete} handleEdit={handleEdit} />);
};

describe('UserList', () => {
  it('should render the UserList component', () => {
    renderUserList();
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
  });
  it('should call props.handleDelete when delete-button is clicked', async () => {
    renderUserList();
    const [firstDeleteButton] = screen.getAllByTestId('delete-button');
    await fireEvent.click(firstDeleteButton);
    const indexOfFirstElement = 0;
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(indexOfFirstElement);
  });
  it('should call props.handleEdit when edit-button is clicked', async () => {
    renderUserList();
    const [firstEditButton] = screen.getAllByTestId('edit-button');
    await fireEvent.click(firstEditButton);
    const idOfFirstElement = 1;
    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(idOfFirstElement);
  });
});
