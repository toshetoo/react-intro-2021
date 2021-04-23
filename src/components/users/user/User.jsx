import { useState, useEffect } from 'react';
import { getUserById } from "../../../core/services/UsersService";
import { UserCard } from './../user-card/UserCard';

export function User(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(props);
        getUserById(props.match.params.id).then(response => {
            console.log(response);
            setUser(response.data);
        });
    }, []);

    return (
        <UserCard user={user} />
    );
}