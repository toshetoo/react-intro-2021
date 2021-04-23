import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const wrapperStyles = {
    margin: '1rem'
};

const userContent = (user) => {
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
                        <Link to={`/users/${user.id}`}>View profile</Link>
                    </Card.Body>
                </Card>
            </div>
        );
}

export function UserCard({ user }) {
    return user ? userContent(user) : 'No user!';
}