import { Component } from 'react';
import { Redirect } from 'react-router';
import { register } from '../../../core/services/AuthService';
import './Register.css';

export class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            email: '',
            picture: '',
            password: '',
            redirect: false,
            error: ''
        };
    }

    onInputChange = (event) => {
        event.persist();

        this.setState({
            [event.target.name]: event.target.value.trim()
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const { redirect, error, ...user } = this.state;
        register(user).then(_ => {
            this.setState({
                redirect: true
            });
        })
        .catch(err => this.setState({error: err.message }));
    }

    render() {
        return (
            <>
            { this.state.redirect && <Redirect to="/login" /> }
            <div className="register-form-wrapper">
                <form className="register-form" onSubmit={this.onFormSubmit}>
                    { this.state.error && <span className="text-danger">{this.state.error}</span> }
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input className="form-control" id="name" name="name" type="text" onChange={this.onInputChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input className="form-control" id="email" name="email" type="email" onChange={this.onInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input className="form-control" id="password" name="password" type="password" onChange={this.onInputChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone: </label>
                        <input className="form-control" id="phone" name="phone" type="text" onChange={this.onInputChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="picture">Picture: </label>
                        <input className="form-control" id="picture" name="picture" type="text" onChange={this.onInputChange}/>
                    </div>
                    <button className="btn btn-primary">Register</button>
                </form>
            </div>
            </>
        );
    }
}