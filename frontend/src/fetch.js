import Auth from './Auth';
import router from './router';
import { API_ROOT } from './constants';

export default function request(_path, _options) {
  const options = Object.assign({
    hasToken: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${Auth.getToken()}`,
      'Content-Type': 'application/json',
    },
  }, _options);

  if (!options.hasToken) {
    delete options.headers.Authorization;
  }

  if (options.body instanceof FormData) {
    delete options.headers['Content-Type'];
  }

  const path = API_ROOT + _path;

  return new Promise((accept, reject) => {
    window.fetch(path, options).then((response) => {
      const { status } = response;

      if (status >= 400) {
        if (status === 401) {
          Auth.deauthenticateUser();
          router.push({ name: 'Login' });
        }
        reject(response);
      } else {
        accept(response);
      }
    }, reject);
  });
}
