import { createStore } from './utils/createStore';
import commentReducer from './reducers/commentReducer';

export default createStore({
  comment: commentReducer
});