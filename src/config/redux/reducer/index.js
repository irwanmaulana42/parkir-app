// // Global State
// const initialState = {
//   loggedIn: false,
//   user: {}
// }

// // Reducer
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_USER":
//       return {
//         loggedIn: true,
//         user: { ...action.payload }
//       }
//     case "LOG_OUT":
//       localStorage.clear()
//       return {
//         loggedIn: false,
//         user: {}
//       }
//     default:
//       return state;
//   }
// }

// export default reducer;

import { combineReducers } from 'redux';
import authReducer from './auth';
import messageReducer from './message';

export default combineReducers({
  authReducer,
  messageReducer
});