  
import { combineReducers } from 'redux';

import authentication from './auth/authRegister';
// import user, { userSaga } from './auth/user';
import searchReducer from './search/search';
import loading from './loading/loading';



const rootReducer = combineReducers({
  authentication,
  // user,
  loading,
  searchReducer
});


export default rootReducer;