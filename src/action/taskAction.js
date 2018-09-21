import {ADD_TASK,GET_ALL_TASK,UPDATE_STATUS,UPDATE_TIMER} from '../action/actionTypes';

export const AddTaskAction=(taskData)=>{
    return(
        {
            type: ADD_TASK,
            payload:taskData
        }
    )
};

export const GetTaskDetail=()=>{
    return(
        {
            type: GET_ALL_TASK
        }
    )
};

export const UpdateStatus=(taskId)=>{
    return(
        {
            type: UPDATE_STATUS,
            payload: taskId
        }
    )
}

export const UpdateTimer=(taskId,timer)=>{
    return(
        {
            type: UPDATE_TIMER,
            payload: {taskId,timer}
        }
    )
}

