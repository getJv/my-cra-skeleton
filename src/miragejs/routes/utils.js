import cookie from 'js-cookie';
const fakeTokenKey = 'token';
const fakeTokenValue = 'ABCD';

export const generateCookie = (key, value, expires = 1 / 24, path = '/', domain = '') => {
  cookie.set(key, value, {
    expires,
    path,
    domain,
  });
};

export const removeCookie = (key) => {
  cookie.remove(key);
};

export const generateAuthCookie = () => {
  generateCookie(fakeTokenKey, fakeTokenValue);
};

export const removeAuthCookie = () => {
  removeCookie(fakeTokenKey);
};
export const verifyAuthCookie = (value) => {
  return cookie.get(fakeTokenKey) === value;
};
