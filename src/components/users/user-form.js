import React from 'react';

function UserForm({ handleSubmit, handleCancel, handleChange, formData }) {
  return (
    <form name="user-form" onSubmit={handleSubmit}>
      <label>
        <p>Name</p>
        <input type="text" name="name" onChange={handleChange} value={formData.name || ''} />
      </label>
      <label>
        <p>Mobile</p>
        <input type="text" name="mobile" onChange={handleChange} value={formData.mobile || ''} />
      </label>
      <div>
        <button type="submit" data-testid="submit-button">
          Save
        </button>
        <button type="button" data-testid="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserForm;
