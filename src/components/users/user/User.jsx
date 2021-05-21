import { useState, useEffect } from 'react';
import { deleteTask, getTasksByCreatorId } from '../../../core/services/TasksService';
import { getUserById } from "../../../core/services/UsersService";
import { TaskCard } from '../../tasks/task-card/TaskCard';
import { UserCard } from './../user-card/UserCard';

const userTaskStyles= {
    display: 'flex',
    flexWrap: 'wrap',
    borderLeft: '1px solid black',
    padding:'20px'
}

export function User(props) {
    const [user, setUser] = useState(null);
    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        getUserById(props.computedMatch.params.id).then(response => {
            console.log(response);
            setUser(response.data);

            getTasksByCreatorId(props.computedMatch.params.id).then((tasks) => {
                setUserTasks(tasks);
            })
        });
    }, [props.computedMatch.params.id]);

    const onTaskDelete = (id) => {
        deleteTask(id).then(_ => {
            setUserTasks((prevState) => {
                return prevState.filter(task => task.id !== id);
            })
        })
    } 

    return (
        <div className="user-info-wrapper d-flex">
            <UserCard user={user} />
            <div className="user-tasks" style={userTaskStyles}>
                {userTasks.map(task => <TaskCard key={task.id} task={task} onDelete={onTaskDelete} />)}
            </div>
        </div>
    );
}