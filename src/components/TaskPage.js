import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {AddTaskAction} from '../action/taskAction';
import '../css/taskForm.css';
import Timer from 'easytimer';

export class TaskPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:{
                name:'',
                notes:''
            },
            err:''
        }
    }

    handleChange=(e)=>{
        const {name,value}=e.target;
        const {data}=this.state;
        data[name]=value;
        this.setState({
            data
        });

    };
    getTaskDetail=(e)=>{
        e.preventDefault();
        const taskObj={
          name:this.state.data.name,
            notes:this.state.data.notes,
            status:'Pending',
            timeTaken:'00.00.00',
            TimerObject:new Timer(),
            isTimer:false,
        };
        this.props.AddTaskAction(taskObj);
        this.setState({
            data: {
                name:'',
                notes:''
            },
        })
    };
    render(){
        const {data}=this.state;
        return(
          <div className={'task-wrapper'}>
              <div className="card-bg">
              <form className="text-set">
                  <div className={'form-group'}>
                      <label className={'task-label'}>Task Name</label>
                      <input type={'text'}
                             value={data.name}
                             className={'form-control task-input'}
                             onChange={this.handleChange}
                             id={'name'}
                             name={'name'}/>
                  </div>
                  <div className={'form-group'}>
                      <label className={'task-label'}>Notes</label><i className="far fa-edit"/>
                      <textarea rows="4" cols="19"
                                value={data.notes}
                                className={'form-control task-input'}
                                onChange={this.handleChange}
                                id={'notes'}
                                name={'notes'}
                      />
                  </div>
                  <div className={'form-group'}>
                      <button className={'btn btn-primary  task-btn'}
                              onClick={this.getTaskDetail}
                              type={'submit'}
                      >Add Task</button>
                  </div>
              </form>
              </div>
          </div>
        );
    }
}
const matchDispatchToProps=(dispatch)=>{
    return bindActionCreators({
        AddTaskAction
    },dispatch)
};
export default connect(null,matchDispatchToProps)(TaskPage);
