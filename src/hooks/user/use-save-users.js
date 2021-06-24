import { useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import UserService from '../../services/user';

const formReducer = (state, event) => {
  if (event.id) {
    return { ...state, ...event };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

export const useSaveUsers = () => {
  const history = useHistory();
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const backToListPage = () => {
    history.push({
      pathname: '/users',
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setSubmitting(true);
      if (formData.id) {
        await UserService.patch(formData);
      } else {
        await UserService.post(formData);
      }
      setSubmitting(false);
      backToListPage();
    } catch (e) {
      setError(true);
    }
  };

  const handleChange = event => {
    const isCheckbox = event.target?.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  const handleCancel = async () => {
    backToListPage();
  };

  return { handleSubmit, handleChange, handleCancel, formData, setFormData, submitting, error };
};
