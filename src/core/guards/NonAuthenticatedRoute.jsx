import { Redirect } from "react-router";
import { getLoggedUser } from "../services/AuthService";

export function NonAuthenticatedRoute(props) {
    const user = getLoggedUser();

    if (!user) {
        return <props.component {...props} />;
    }

    return <Redirect to="/users-list" />;
}