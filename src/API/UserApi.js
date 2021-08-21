import axios from 'axios';
import variables from '../variables';

export const loginUser = async (credentials) => {
  const res = await axios.post(`${variables.BASE_URL}/user/login`, credentials);
  return res.data;
};

export const registerUser = async (UserDetails) => {
  const res = await axios.post(
    `${variables.BASE_URL}/user/register`,
    UserDetails,
  );
  return res;
};

export const getUserById = async (id, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };

  const res = await axios.get(`${variables.BASE_URL}/user/${id}`, {
    headers,
  });
  return res;
};
