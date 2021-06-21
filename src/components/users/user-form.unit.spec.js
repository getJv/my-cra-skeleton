import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import UserForm from './user-form';

const user = { id: 1, name: 'first name', mobile: '44444' };
const handleSubmit = jest.fn(e => e.preventDefault());
const handleChange = jest.fn();
const handleCancel = jest.fn();
const renderUserForm = () => {
  render(
    <UserForm
      formData={user}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />,
  );
};

describe('UserForm', () => {
  it('should render the component', () => {
    renderUserForm();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('should render the name input', () => {
    renderUserForm();
    const nameField = screen.getByLabelText('Name');
    expect(nameField).toBeInTheDocument();
    expect(nameField).toHaveProperty('type', 'text');
    expect(nameField).toHaveProperty('value', user.name);
  });
  it('should render inputs empty when formData is empty', () => {
    const emptyFormData = {};
    render(
      <UserForm
        formData={emptyFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />,
    );
    const nameField = screen.getByLabelText('Name');
    const mobileField = screen.getByLabelText('Mobile');

    expect(nameField).toHaveProperty('value', '');
    expect(mobileField).toHaveProperty('value', '');
  });
  it('should render the mobile input', () => {
    renderUserForm();
    const mobileField = screen.getByLabelText('Mobile');
    expect(mobileField).toBeInTheDocument();
    expect(mobileField).toHaveProperty('type', 'text');
    expect(mobileField).toHaveProperty('value', user.mobile);
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
