import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TaskStatus } from './../../../core/services/TasksService';

export function TaskCard({ task, onDelete }) {

    if (!task) {
        return <div>No task!</div>;
    }


    let taskStatusColor = '';

    switch (task.status) {
        case TaskStatus.New:
            taskStatusColor += 'bg-primary';
            break;
        case TaskStatus.InProgress:
            taskStatusColor += 'bg-secondary';
            break;
        case TaskStatus.InReview:
            taskStatusColor += 'bg-warning';
            break;
        case TaskStatus.Done:
            taskStatusColor += 'bg-success';
            break;
        default:
            taskStatusColor += 'bg-primary';
            break;
    }

    return (
        <div className="task-card-wrapper">
            <Card style={{ width: '18rem' }} className={taskStatusColor}>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        <div>
                            <strong>Description: </strong><span>{task.description}</span>
                        </div>
                        <div>
                            <strong>Created on: </strong><span>{task.createdDate}</span>
                        </div>
                        <div>
                            <strong>Last updated: </strong><span>{task.lastUpdated}</span>
                        </div>
                        <div>
                            <strong>Status: </strong><span>{task.status}</span>
                        </div>
                    </Card.Text>
                    <Link to={`/tasks/${task.id}`}>View task details</Link> |
                    <Link to={`/tasks/edit/${task.id}`}>Edit task</Link> |
                    <span onClick={() => onDelete(task.id)}>Delete task</span>
                    </Card.Body>
            </Card>
        </div>
    )
}