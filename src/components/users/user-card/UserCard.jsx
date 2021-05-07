import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/services/AuthService';

const wrapperStyles = {
    margin: '1rem'
};

const userContent = (user, onDelete) => {
    const loggedUser = getLoggedUser();

    return (
            <div className="user-card-wrapper" style={wrapperStyles}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={user.picture} />
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text>
                            <div>
                                <strong>Email: </strong><span>{user.email}</span>
                            </div>
                            <div>
                                <strong>Phone: </strong><span>{user.phone}</span>
                            </div>
                            <div>
                                <strong>Administrator: </strong><span>{user.isAdmin.toString()}</span>
                            </div>
                        </Card.Text>
                        <Link to={`/users/${user.id}`}>View profile</Link> | 
                        {loggedUser.isAdmin && <Link to={`/users/edit/${user.id}`}>Edit User</Link> } |
                        {loggedUser.isAdmin && <span className="delete-btn" onClick={() => onDelete(user.id)}>Delete User</span> }
                    </Card.Body>
                </Card>
            </div>
        );
}

export function UserCard({ user, onDelete }) {
    return user ? userContent(user, onDelete) : 'No user!';
}