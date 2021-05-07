import './UserEdit.css';
import { useState, useEffect } from 'react';
import { getUserById } from '../../../core/services/UsersService';
import { saveUser } from './../../../core/services/UsersService';
import { Redirect } from 'react-router';


export function UserEdit(props) {

    const [editedUser, setEditedUser] = useState({
        picture: '',
        email: '',
        name: '',
        phone: '',
        isAdmin: false,
        password: ''
    });
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getUserById(props.computedMatch.params.id).then((response) => {
                setEditedUser(response.data);
            })
        }       
    }, [props.computedMatch.params.id])

    const onInputChange = (event) => {
        setEditedUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value.trim()
        }));
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveUser(editedUser).then(_ => {
            console.log('SUCCESS');
            setShouldRedirect(true);
        });
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
                    <input type="checkbox" id="isAdmin" name="isAdmin" className="form-control" checked={editedUser.isAdmin} onChange={onInputChange}/>
                </div>
                <button className="btn btn-primary">Save</button>
            </form>
        </div>
        </>
    );
}