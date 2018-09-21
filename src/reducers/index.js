import {combineReducers} from 'redux';
import taskReducer from '../reducers/task';

export default combineReducers({
    tasks:taskReducer
});