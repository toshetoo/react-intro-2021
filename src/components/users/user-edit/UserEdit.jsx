import './UserEdit.css';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedUser, editUser, getUserByIdFromAPI, saveUserInAPI } from '../../../core/actions/user-actions';


export function UserEdit(props) {
    const dispatch = useDispatch();
    const editedUser = useSelector(state => state.user);

    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        dispatch(clearSelectedUser());
        if (props.computedMatch.params.id) {
            dispatch(getUserByIdFromAPI(props.computedMatch.params.id))
        }       
    }, [props.computedMatch.params.id, dispatch])

    const onInputChange = (event) => {
        dispatch(editUser({ [event.target.name]: event.target.value.trim() }))
    }

    const onCheckboxChange = (event) => {
        dispatch(editUser({ [event.target.name]: event.target.checked }) )
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(saveUserInAPI(editedUser));
        setShouldRedirect(true);
    }

    return (
        <>
        { shouldRedirect && <Redirect to="/users-list" /> }
        <div className="user-edit-wrapper">
            <form className="user-edit-form" onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" className="form-control" value={editedUser.name} onChange={onInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" className="form-control" value={editedUser.email} onChange={onInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone: </label>
                    <input type="text" id="phone" name="phone" className="form-control" value={editedUser.phone} onChange={onInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" name="password" className="form-control" value={editedUser.password} onChange={onInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="picture">Picture: </label>
                    <input type="text" id="picture" name="picture" className="form-control" value={editedUser.picture} onChange={onInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="isAdmin">Administrator: </label>
                    <input type="checkbox" id="isAdmin" name="isAdmin" className="form-control" checked={editedUser.isAdmin} onChange={onCheckboxChange}/>
                </div>
                <button className="btn btn-primary">Save</button>
            </form>
        </div>
        </>
    );
}