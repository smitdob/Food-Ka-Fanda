import { createStore } from 'redux'
import rootReducer from './Redux/Reducer/main'
    
const store = createStore(rootReducer);
export default store