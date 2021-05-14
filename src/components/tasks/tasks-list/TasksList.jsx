import './TasksList.css';
import { useState, useEffect } from 'react';
import { deleteTask, getAllTasks } from './../../../core/services/TasksService';
import { TaskCard } from '../task-card/TaskCard';

export function TasksList(props) {
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        getAllTasks().then(response => {
            setTasks(response.data);
        })
    }, [])

    const onTaskDelete = (id) => {
        deleteTask(id).then(_ => {
            setTasks((prevState) => {
                return prevState.filter(task => task.id !== id);
            })
        })
    } 

    return (
        <div className="list-wrapper">
            {tasks.map(task => <TaskCard key={task.id} task={task} onDelete={onTaskDelete} /> )}
        </div>
    )
}