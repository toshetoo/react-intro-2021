import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { getTaskById, saveTask } from './../../../core/services/TasksService';


const formWrapperStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 60px)',
}


export function TaskEdit(props) {
    const [currentTask, setCurrentTask] = useState({ title: '', description: '', status: 'New' });
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getTaskById(props.computedMatch.params.id).then(response => {
                setCurrentTask(response.data);
            })
        }
    }, [props.computedMatch.params.id])


    const onInputChange = (event) => {
        setCurrentTask((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        saveTask(currentTask).then(_ => {
            setRedirect(true);
        });
    }

    return (
        <>
        { redirect && <Redirect to="/tasks-list" /> }
        <div className="task-form-wrapper" style={formWrapperStyles}>
            <form className="task-edit-form" onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" className="form-control"
                        name="title" id="title"
                        onChange={onInputChange}
                        value={currentTask.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea className="form-control"
                        name="description"
                        id="description"
                        onChange={onInputChange}
                        value={currentTask.description}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status: </label>
                    <select name="status" id="status" className="form-control" onChange={onInputChange} value={currentTask.status}>
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="In Review">In Review</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <button className="btn btn-success">Save task</button>
            </form>
        </div>
        </>
    )
}