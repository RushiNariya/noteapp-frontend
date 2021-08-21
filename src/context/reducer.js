import {
  GET_NOTES,
  USER_LOGIN,
  USER_REGISTRATION,
  REFRESH_STATE,
  USER_LOGOUT,
  GET_NOTE_BY_ID,
  RESET_ERROR,
  SET_ERROR,
  SET_FILTERED_NOTES,
  CLEAR_FILTERED_NOTES,
  USER_DETAILS,
  SET_TAGS_COUNT,
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case GET_NOTE_BY_ID:
      return {
        ...state,
        note: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        userId: action.payload.id,
        token: action.payload.token,
        role: action.payload.role,
      };
    case USER_DETAILS:
      return {
        ...state,
        userData: action.payload,
      };
    case USER_REGISTRATION:
      return {
        ...state,
      };
    case REFRESH_STATE:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        role: action.payload.role,
      };
    case USER_LOGOUT:
      localStorage.removeItem('state');
      return {
        ...state,
        notes: [],
        note: null,
        userId: null,
        token: null,
        role: null,
        filteredNotes: null,
        tagsCount: {},
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: '',
      };
    case SET_FILTERED_NOTES:
      return {
        ...state,
        filteredNotes: action.payload,
      };
    case CLEAR_FILTERED_NOTES:
      return {
        ...state,
        filteredNotes: null,
      };
    case SET_TAGS_COUNT:
      return {
        ...state,
        tagsCount: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
