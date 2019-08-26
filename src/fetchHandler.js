const endpoint = 'http://localhost:9090/';
const initRequest = (method, body) => {
  let config = {
    method,
    header: {
      'Content-Type': 'application/json',
    },
  };
  if (body) {
    config = { ...config, body: JSON.stringify(body) };
  }
  return config;
};

const handleResponse = res => {
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
};

const fetchHandler = {
  folder: {
    get: () =>
      fetch(`${endpoint}folders`, initRequest('GET')).then(handleResponse),
    post: body => {
      return fetch(`${endpoint}folders`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(handleResponse);
    },
  },

  note: {
    get: () =>
      fetch(`${endpoint}notes`, initRequest('GET')).then(handleResponse),
    delete: id =>
      fetch(`${endpoint}notes/${id}`, initRequest('DELETE')).then(
        handleResponse
      ),
    post: body => {
      return fetch(`${endpoint}notes`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(handleResponse);
    },
  },
};

export default fetchHandler;
