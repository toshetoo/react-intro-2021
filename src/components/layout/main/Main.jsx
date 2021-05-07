import { UsersList } from './../../users/users-list/UsersList';
import { Switch } from 'react-router-dom';
import { User } from './../../users/user/User';
import { AuthenticatedRoute } from '../../../core/guards/AuthenticatedRoute';
import { UserEdit } from '../../users/user-edit/UserEdit';

export function Main({ count }) {
    return (
        <div className="main-content">
            <Switch>
                <AuthenticatedRoute exact path="/users-list" component={UsersList} />                
                <AuthenticatedRoute exact path="/users/create" component={UserEdit} />
                <AuthenticatedRoute exact path="/users/:id" component={User} />
                <AuthenticatedRoute exact path="/users/edit/:id" component={UserEdit} />
            </Switch>
        </div>
    );
}