import { TaskCard } from "../task-card/TaskCard";
import { useState, useEffect } from 'react';
import { getTaskById } from './../../../core/services/TasksService';

export function Task(props) {
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        getTaskById(props.computedMatch.params.id).then(response => {
            setCurrentTask(response.data);
        });
    }, [props.computedMatch.params.id]);

    return (
        <TaskCard task={currentTask} />
    )
}