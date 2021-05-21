import { TaskCard } from "../task-card/TaskCard";
import { useState, useEffect } from 'react';
import { getTaskById } from './../../../core/services/TasksService';
import { TaskHistory } from "../task-history/TaskHistory";

export function Task(props) {
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        getTaskById(props.computedMatch.params.id).then(response => {
            setCurrentTask(response.data);
        });
    }, [props.computedMatch.params.id]);

    return (
        <div className="task-info">
            <TaskCard task={currentTask} />
            <div className="history-info">
                {currentTask && currentTask.history.map(historyObj => <TaskHistory key={historyObj.changedProperty} historyObj={historyObj} />)}
            </div>
        </div>
        
    )
}