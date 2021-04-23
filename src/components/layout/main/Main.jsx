import { UsersList } from './../../users/users-list/UsersList';
import { Switch, Route } from 'react-router-dom';
import { User } from './../../users/user/User';

export function Main({ count }) {
    return (
        <div className="main-content">
            {/* MAIN WORKS!
            Counter: {count}
            <UsersList></UsersList> */}
            <Switch>
                <Route exact path="/users-list" component={UsersList} />
                <Route exact path="/users/:id" component={User} />
            </Switch>
        </div>
    );
}