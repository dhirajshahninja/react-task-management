import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetTaskDetail,UpdateStatus,UpdateTimer} from '../action/taskAction';

import '../css/taskGrid.css'

export class TaskManagementGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskArray: [],
            btnStatus:'Pending',
            timeTaken:'00.00.00',
            isData:false,
            isComplete:false,
        }
    };

    componentDidMount() {
        this.props.GetTaskDetail();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
               isData:true,
            })
        }

    };

    handleStatusChange=(index,time,obj)=>{
        const timer= obj.TimerObject;
        if(timer.timerInterval) {
            clearInterval(timer.timerInterval);
            timer.stop()
        }
        this.props.UpdateStatus(index);


    };

    startTracking=(index,obj)=>{
      const timer= obj.TimerObject;
      timer.start({precision: 'seconds'});
        timer.timerInterval = setInterval(() => {
            this.props.UpdateTimer(index,timer.getTimeValues().toString())
        }, 1000);
        this.props.UpdateTimer(index,timer.getTimeValues().toString())
    };

    render() {
        const {taskData} = this.props;
        return (
            (taskData.length>0) && <div>
                <table  className="table table-striped table-bordered table-hover">
                    <tbody>
                    <tr>
                        <th>Task Name</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th>Track Time</th>
                    </tr>
                    {
                        taskData.map((task,i) => {
                            return (
                                <tr key={i}>
                                    <td>{task.name}</td>
                                    <td>{task.notes}</td>
                                    <td><button className={task.status === 'Complete' ? 'btn btn-success' : 'btn btn-primary '}
                                                type={'submit'}
                                                onClick={()=>this.handleStatusChange(i,task.timeTaken,task)}
                                    >{ task.status}</button>
                                    </td>
                                    {
                                        task.status === 'Complete' ?
                                            <td>
                                                {task.timeTaken}
                                            </td>:

                                            <td>
                                                <span className="btn-submit">
                                                    {
                                                        !task.isTimer ?
                                                            <button className={'btn btn-primary '}
                                                                    type={'submit'}
                                                                    onClick={()=>this.startTracking(i,task)}
                                                            >Start</button>
                                                            :
                                                            ''
                                                    }
                                                </span>
                                                <span>
                                                {task.timeTaken}
                                                </span>
                                            </td>
                                    }

                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return (
        {
            taskData: state.tasks
        }
    )
};
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        GetTaskDetail,UpdateStatus,UpdateTimer
    }, dispatch)
};
export default connect(mapStateToProps, matchDispatchToProps)(TaskManagementGrid);

