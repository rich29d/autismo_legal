import loginApi from '../api/login';

// eslint-disable-next-line consistent-return
export const login = async (email, senha) => {
  try {
    // eslint-disable-next-line import/no-named-as-default-member
    const { success, message } = await loginApi.store({
      email,
      senha,
    });

    return { success, message };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.assign('/');
};

export default {
  login,
  logout,
};
