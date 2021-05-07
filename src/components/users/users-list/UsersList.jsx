import { deleteUser, getAllUsers } from "../../../core/services/UsersService";
import { useEffect, useState } from 'react';
import { UserCard } from "../user-card/UserCard";

// import './UsersList.css';

const wrapperStyles = {
    display: 'flex',
    flexWrap: 'wrap'
};


export function UsersList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then(response => {
            setUsers(response.data);
        });
    }, []);

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