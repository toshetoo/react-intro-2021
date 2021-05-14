import { UsersList } from './../../users/users-list/UsersList';
import { Switch } from 'react-router-dom';
import { User } from './../../users/user/User';
import { AuthenticatedRoute } from '../../../core/guards/AuthenticatedRoute';
import { UserEdit } from '../../users/user-edit/UserEdit';
import { TasksList } from './../../tasks/tasks-list/TasksList';
import { Task } from './../../tasks/task/Task';
import { TaskEdit } from './../../tasks/task-edit/TaskEdit';

export function Main({ count }) {
    return (
        <div className="main-content">
            <Switch>
                <AuthenticatedRoute exact path="/users-list" component={UsersList} />                
                <AuthenticatedRoute exact path="/users/create" component={UserEdit} admin={true} />
                <AuthenticatedRoute exact path="/users/:id" component={User} />
                <AuthenticatedRoute exact path="/users/edit/:id" component={UserEdit} admin={true} />

                <AuthenticatedRoute exact path="/tasks-list" component={TasksList} />
                <AuthenticatedRoute exact path="/tasks/create" component={TaskEdit} />
                <AuthenticatedRoute exact path="/tasks/:id" component={Task} />
                <AuthenticatedRoute exact path="/tasks/edit/:id" component={TaskEdit} />
            </Switch>
        </div>
    );
}