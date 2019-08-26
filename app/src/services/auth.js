import { store } from '../api/login';

export const login = ({ email, senha }) =>
  store({
    email,
    senha,
  });

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.assign('/');
};

export default {
  login,
  logout,
};
