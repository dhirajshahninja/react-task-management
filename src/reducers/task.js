import {ADD_TASK,GET_ALL_TASK,UPDATE_STATUS,UPDATE_TIMER} from '../action/actionTypes';

export default (state = [], action) => {
    switch (action.type) {
        case ADD_TASK:
            state.push(action.payload);
            return [...state];
        case GET_ALL_TASK:
            return [...state];
        case UPDATE_STATUS:
            let arr= [...state];
            arr[action.payload]['status']='Complete';
            return arr;
        case UPDATE_TIMER:
            let taskArray= [...state];
            taskArray[action.payload.taskId]['timeTaken']=action.payload.timer;
            taskArray[action.payload.taskId]['isTimer']=true;
            return taskArray;
        default:
            return state;
    }
}

