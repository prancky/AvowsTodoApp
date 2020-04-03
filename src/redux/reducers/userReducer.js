import {
  UPDATE_USER_TODO_LIST,
  ADD_USER_TODO_LIST,
  DELETE_USER_TODO_LIST,
} from '../actions/type';
const initialState = {
  toDoList: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_TODO_LIST:
      return {
        ...state,
        toDoList: [...state.toDoList, action.payload],
      };
    case UPDATE_USER_TODO_LIST:
      const todoArray = state.toDoList.map((Item) => {
        if (Item.id === action.payload.id) {
          return action.payload;
        } else {
          return Item;
        }
      });

      return {
        ...state,
        toDoList: todoArray,
      };
    case DELETE_USER_TODO_LIST:
      const taskArray = state.toDoList.filter(function (list) {
        return list.id !== action.payload;
      });
      return {
        ...state,
        toDoList: taskArray,
      };
    default:
      return state;
  }
};

export default userReducer;
