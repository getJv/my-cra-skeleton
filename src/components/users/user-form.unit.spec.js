import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import UserForm from './user-form';

const users = { id: 1, name: 'first name', mobile: '44444' };
const handleSubmit = jest.fn(e => e.preventDefault());
const handleChange = jest.fn();
const handleCancel = jest.fn();
const renderUserForm = () => {
  render(
    <UserForm
      formData={users}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />,
  );
};

describe('UserList', () => {
  it('should render the component', () => {
    renderUserForm();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('should call props.handleCancel when cancel-button is clicked', async () => {
    renderUserForm();
    const cancelButton = screen.getByTestId('cancel-button');
    await fireEvent.click(cancelButton);
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
  it('should call props.handleSubmit when submit-button is clicked', async () => {
    renderUserForm();
    const submitButton = screen.getByTestId('submit-button');
    await fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  it('should call props.handleChange when the input-text value changed', async () => {
    renderUserForm();
    const inputText = 'some text here';
    const [firstFieldText] = screen.getAllByRole('textbox');
    await userEvent.type(firstFieldText, inputText);
    expect(handleChange).toHaveBeenCalledTimes(14);
  });
});
