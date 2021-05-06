import { useState } from 'react';
import { login } from '../../../core/services/AuthService';
import './Login.css';
import { Redirect } from 'react-router-dom';

export function Login(props) {
    const [userData, setUserData] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const onInputChange = (event) => {
        event.persist();

        // state
        // { email: 'aa', password: 'b' }
        // event.target
        // { name: 'email', value: 'ccc' }
        // result
        // { email: 'ccc', password: 'b' }
        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        login(userData).then(_ => {
            console.log('success!');
            setRedirect(true);
        })
        .catch(err => console.error(err));
    }

    return (
        <>
        { redirect && <Redirect to='/' /> }
        <div className="login-form-wrapper">
            <form className="login-form" onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" className="form-control" onChange={onInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" className="form-control" onChange={onInputChange} />
                </div>
                <button className="btn btn-primary">Login</button>
            </form>
        </div>
        </>
    );
}