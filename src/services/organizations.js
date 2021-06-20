import axios from 'axios';

export default {
  post: formData => axios.post('/api/organizations', { user: { ...formData } }),
  patch: formData => axios.patch(`/api/organizations/${formData.id}`, { user: { ...formData } }),
  all: () => axios.get('/api/organizations'),
  find: async id => axios.get(`/api/organizations/${id}`),
  delete: id => axios.delete(`/api/organizations/${id}`),
};
