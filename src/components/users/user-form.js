import React from 'react';

function UserForm({ handleSubmit, handleCancel, handleChange, formData }) {
  return (
    <form name="user-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          value={formData.name || ''}
        />
      </div>
      <div>
        <label htmlFor="mobile">Mobile</label>
        <input
          id="mobile"
          name="mobile"
          type="text"
          onChange={handleChange}
          value={formData.mobile || ''}
        />
      </div>

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
