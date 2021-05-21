import './Header.css';
import { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { getLoggedUser, logout } from '../../../core/services/AuthService';

const Header = withRouter((props) => {
    const [redirect, setRedirect] = useState(false);
    const [searchParam, setSearchParam] = useState('');

    const onLogout = () => {
        logout();
        setRedirect(true);
    }

    const onSearchSubmit = (event) => {
        event.preventDefault();

        const pathName = props.location.pathname.split('/')[1];

        const historyObject = { pathName: `/${pathName}`};
        
        if (searchParam) {
            historyObject.search = `?q=${searchParam}`
        }

        props.history.push(historyObject);
    }

    const onSearchInputChange = (event) => {
        setSearchParam(event.target.value);
    }

    const loggedUser = getLoggedUser();
    return (
        <>
        { redirect && <Redirect to="/login" /> }
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/"> Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users-list">Users List</Link>
                    </li>
                    {
                        loggedUser && loggedUser.isAdmin &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/users/create">Create user</Link>
                    </li>
                    }
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks-list">All Tasks</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks/create">Create task</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={onSearchSubmit}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={onSearchInputChange} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <span className="logout-btn" onClick={onLogout}>Logout</span>
                </div>
            </nav>
        </header>
        </>
    );
});

export default Header;