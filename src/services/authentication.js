import axios from 'axios';

const headers = { token: 'ABCD' };

export default {
  login: formData => axios.post('/api/login', { user: { ...formData } }, { headers }),
  logout: () => axios.delete(`/api/logout`, { headers }),
  verify: () => axios.get(`/api/auth-verify`, { headers }),
};
