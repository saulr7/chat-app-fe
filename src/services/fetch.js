const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithoutToken = async (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === 'GET') {
    const resp = await fetch(url);
    return resp.json();
  }
  const resp = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });
  return resp.json();
};

const fetchWithToken = async (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem('token') || '';

  if (method === 'GET') {
    const resp = await fetch(url, {
      headers: {
        'x-token': token,
      },
    });
    return resp.json();
  }
  const resp = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      'x-token': token,
    },
  });
  return resp.json();
};

export { fetchWithoutToken, fetchWithToken };
