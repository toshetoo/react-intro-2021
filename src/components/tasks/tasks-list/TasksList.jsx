import './TasksList.css';
import { useState, useEffect } from 'react';
import { deleteTask, getAllTasks, saveTask, TaskStatus } from './../../../core/services/TasksService';
import { TaskCard } from '../task-card/TaskCard';

export function TasksList(props) {
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        // q=spas
        // [q, spas]
        const searchParam = props.location.search.split('=')[1];
        getAllTasks(searchParam).then(tasks => {
            setTasks(tasks);
        })
    }, [props.location.search])

    const onTaskDelete = (id) => {
        deleteTask(id).then(_ => {
            setTasks((prevState) => {
                return prevState.filter(task => task.id !== id);
            })
        })
    } 

    const onDrop = (event, status) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData('taskId');

        const task = tasks.find(task => task.id.toString() === taskId);
        task.status = status;
        setTasks(tasks);

        // TODO check why rendering is broken
        saveTask(task).then(_ => {
            console.log('SUCCESS');
            setTasks(tasks);
        });            
    }

    return (
        <div className="list-wrapper">
            <div className="status new" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDrop(event, TaskStatus.New)}>
                <div className="column-header">NEW</div>
                {tasks.filter(task => task.status === TaskStatus.New).map(task => <TaskCard key={task.id} task={task} onDelete={onTaskDelete} /> ) }
            </div>
            <div className="status in-progress" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDrop(event, TaskStatus.InProgress)}>
                <div className="column-header">IN PROGRESS</div>
                {tasks.filter(task => task.status === TaskStatus.InProgress).map(task => <TaskCard key={task.id} task={task} onDelete={onTaskDelete} /> ) }
            </div>
            <div className="status in-review" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDrop(event, TaskStatus.InReview)}>
                <div className="column-header">IN REVIEW</div>
                {tasks.filter(task => task.status === TaskStatus.InReview).map(task => <TaskCard key={task.id} task={task} onDelete={onTaskDelete} /> ) }
            </div>
            <div className="status done" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDrop(event, TaskStatus.Done)}>
                <div className="column-header">DONE</div>
                {tasks.filter(task => task.status === TaskStatus.Done).map(task => <TaskCard key={task.id} task={task} onDelete={onTaskDelete} /> ) }
            </div>
        </div>
    )
}