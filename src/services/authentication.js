import axios from 'axios';
const headers = { token: 'ABCD' };

export default {
  login: formData => axios.post('/api/login', { user: { ...formData } }, { headers }),
  logout: _ => axios.delete(`/api/logout`, { headers }),
  verify: _ => axios.get(`/api/auth-verify`, { headers }),
};
