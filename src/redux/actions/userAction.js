import {
  UPDATE_USER_TODO_LIST,
  ADD_USER_TODO_LIST,
  DELETE_USER_TODO_LIST,
} from './type';

export const addTodoItem = (data) => (dispatch) => {
  dispatch({
    type: ADD_USER_TODO_LIST,
    payload: data,
  });
};

export const updateTodoItem = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_TODO_LIST,
    payload: data,
  });
};

export const deleteTodoItem = (data) => (dispatch) => {
  dispatch({
    type: DELETE_USER_TODO_LIST,
    payload: data,
  });
};
