import { API_ROOT } from './constants';

export default function request(_path, _options) {
  const options = Object.assign({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }, _options);

  if (options.body instanceof FormData) {
    delete options.headers['Content-Type'];
  }

  const path = API_ROOT + _path;

  return new Promise((accept, reject) => {
    window.fetch(path, options).then((response) => {
      const { status } = response;

      if (status >= 400) {
        reject(response);
      } else {
        accept(response);
      }
    }, reject);
  });
}
