import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getNotesAction,
  getNoteByIdAction,
  userLoginAction,
  userRegistrationAction,
  refreshStateAction,
  userLogoutAction,
  setErrorAction,
  resetErrorAction,
  setFilteredNotesAction,
  clearFilteredNotesAction,
  userDetailsAction,
  setTagsCountAction,
} from './actions';
import { reducer } from './reducer';

const initialState = {
  notes: [],
  filteredNotes: null,
  note: null,
  token: null,
  userId: null,
  role: null,
  error: '',
  userData: null,
  tagsCount: {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getNotes = (payload) => {
    dispatch(getNotesAction(payload));
  };
  const getNoteById = (payload) => {
    dispatch(getNoteByIdAction(payload));
  };
  const userLogin = (payload) => {
    dispatch(userLoginAction(payload));
  };
  const userDetails = (payload) => {
    dispatch(userDetailsAction(payload));
  };
  const userLogout = (payload) => {
    dispatch(userLogoutAction(payload));
  };
  const userRegistration = (payload) => {
    dispatch(userRegistrationAction(payload));
  };
  const setFilteredNotes = (payload) => {
    dispatch(setFilteredNotesAction(payload));
  };
  const clearFilteredNotes = () => {
    dispatch(clearFilteredNotesAction());
  };
  const errorHandler = (payload) => {
    dispatch(setErrorAction(payload));
  };
  const setTagsCount = (payload) => {
    dispatch(setTagsCountAction(payload));
  };
  const resetSetErrorHandler = () => {
    dispatch(resetErrorAction());
  };

  function refreshState() {
    const refreshedState = localStorage.getItem('state')
      ? JSON.parse(localStorage.getItem('state'))
      : { token: state.token, userId: state.userId, role: state.role };
    dispatch(refreshStateAction(refreshedState));
  }

  useEffect(() => {
    refreshState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'state',
      JSON.stringify({
        token: state.token,
        userId: state.userId,
        role: state.role,
      }),
    );
  }, [state]);
  return (
    <GlobalContext.Provider
      value={{
        notes: state.notes,
        note: state.note,
        token: state.token,
        userId: state.userId,
        error: state.error,
        role: state.role,
        filteredNotes: state.filteredNotes,
        userData: state.userData,
        tagsCount: state.tagsCount,
        setTagsCount,
        userDetails,
        getNotes,
        getNoteById,
        userLogin,
        userLogout,
        userRegistration,
        resetSetErrorHandler,
        errorHandler,
        setFilteredNotes,
        clearFilteredNotes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
