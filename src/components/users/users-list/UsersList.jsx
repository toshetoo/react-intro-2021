import { useEffect } from 'react';
import { UserCard } from "../user-card/UserCard";
import { useDispatch, useSelector } from "react-redux";

// import './UsersList.css';
import { deleteUserFromAPI, getAllUsersFromAPI } from './../../../core/actions/user-actions';

const wrapperStyles = {
    display: 'flex',
    flexWrap: 'wrap'
};


export function UsersList(props) {

    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        dispatch(getAllUsersFromAPI(searchParam));
    }, [props.location.search, dispatch]);

    const onDelete = (id) => {
       dispatch(deleteUserFromAPI(id));
    }

    return (
        <div className="users-list-wrapper" style={wrapperStyles}>
            { users.map(user => <UserCard key={user.id} user={user} onDelete={onDelete} />) }
        </div>
    );
}