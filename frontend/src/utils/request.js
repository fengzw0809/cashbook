const baseUrl = 'http://127.0.0.1:3000';

const objToString = (obj) => {
  if (!obj) return '';
  let str = '?';
  for (let i in obj) {
    str = `${str}${i}=${obj[i]}&`;
  }
  return str.substr(0, str.length - 1);
} 

const request = function(url, params, method = 'GET') {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${url}${method.toUpperCase() === 'GET' ? objToString(params) : ''}`, Object.assign({
      method: method.toUpperCase(),
    }, method.toUpperCase() === 'GET' ? {} : { body: JSON.stringify(params) }))
      .then((response) => {
        return response.json()
      })
      .then(({ ret, data }) => {
        if (ret === 1) {
          return resolve(data);
        } else {
          return Promise.reject('something went wrong')
        }
      })
      .catch((err) => {
        reject(err);
      })
  })
}

export default request;
