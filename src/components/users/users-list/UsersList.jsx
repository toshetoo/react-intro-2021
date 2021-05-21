import { deleteUser, getAllUsers } from "../../../core/services/UsersService";
import { useEffect, useState } from 'react';
import { UserCard } from "../user-card/UserCard";

// import './UsersList.css';

const wrapperStyles = {
    display: 'flex',
    flexWrap: 'wrap'
};


export function UsersList(props) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getAllUsers(searchParam).then(users => {
            setUsers(users);
        });
    }, [props.location.search]);

    const onDelete = (id) => {
        deleteUser(id).then(() => {
            setUsers((prevState) => {
                return prevState.filter(u => u.id !== id);
            })
        });
    }

    return (
        <div className="users-list-wrapper" style={wrapperStyles}>
            { users.map(user => <UserCard key={user.id} user={user} onDelete={onDelete} />) }
        </div>
    );
}