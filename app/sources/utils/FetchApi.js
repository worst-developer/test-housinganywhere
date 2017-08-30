import axios from 'axios';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

export default async function httpPost(url, data) {
  return axios({
    headers: defaultHeaders,
    responseType: 'json',
    method: 'POST',
    url: url,
    data: data
  });
}
