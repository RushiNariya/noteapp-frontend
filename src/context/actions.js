export const GET_NOTES = 'GET_NOTES';
export const GET_NOTE_BY_ID = 'GET_NOTE_BY_ID';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_DETAILS = 'USER_DETAILS';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REGISTRATION = 'USER_REGISTRATION';
export const REFRESH_STATE = 'REFRESH_STATE';
export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';
export const SET_FILTERED_NOTES = 'SET_FILTERED_NOTES';
export const CLEAR_FILTERED_NOTES = 'CLEAR_FILTERED_NOTES';
export const SET_TAGS_COUNT = 'SET_TAGS_COUNT';

export const getNotesAction = (payload) => ({
  type: GET_NOTES,
  payload,
});

export const getNoteByIdAction = (payload) => ({
  type: GET_NOTE_BY_ID,
  payload,
});

export const userLoginAction = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const userDetailsAction = (payload) => ({
  type: USER_DETAILS,
  payload,
});

export const userLogoutAction = (payload) => ({
  type: USER_LOGOUT,
  payload,
});

export const userRegistrationAction = (payload) => ({
  type: USER_REGISTRATION,
  payload,
});

export const refreshStateAction = (payload) => ({
  type: REFRESH_STATE,
  payload,
});

export const setErrorAction = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetErrorAction = () => ({
  type: SET_ERROR,
});

export const setFilteredNotesAction = (payload) => ({
  type: SET_FILTERED_NOTES,
  payload,
});

export const clearFilteredNotesAction = () => ({
  type: CLEAR_FILTERED_NOTES,
});

export const setTagsCountAction = (payload) => ({
  type: SET_TAGS_COUNT,
  payload,
});
