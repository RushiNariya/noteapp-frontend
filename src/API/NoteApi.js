import axios from 'axios';
import variables from '../variables';

export const getAllNotes = async (token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };

  const res = await axios.get(`${variables.BASE_URL}/note`, {
    headers,
  });
  return res.data;
};

export const addNote = async (noteDetails, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };

  const res = await axios.post(`${variables.BASE_URL}/note/add`, noteDetails, {
    headers,
  });
  return res.data;
};

export const getOneNoteById = async (id, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };

  const res = await axios.get(`${variables.BASE_URL}/note/${id}`, {
    headers,
  });
  return res;
};

export const updateNote = async (id, noteDetails, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };

  const res = await axios.put(`${variables.BASE_URL}/note/${id}`, noteDetails, {
    headers,
  });
  return res;
};
