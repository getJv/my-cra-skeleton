import axios from 'axios';
export default {
  post: formData => axios.post('/api/users', { user: { ...formData } }),
  patch: formData => axios.patch(`/api/users/${formData.id}`, { user: { ...formData } }),
  all: () => axios.get('/api/users'),
  find: async id => axios.get(`/api/users/${id}`),
  delete: id => axios.delete(`/api/users/${id}`),
};
