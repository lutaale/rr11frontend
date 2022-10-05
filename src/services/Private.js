import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Contexts/auth';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const { signed, user } = useContext(AuthContext);


    if (!signed && isPrivate) {
        return <Redirect to="/AdminLogin" />
    }

    if (signed && !isPrivate) {
        return <Redirect to="/AdminController" />
    }


    return (
        <Route
            {...rest}
            render={props => (
                <Component {...props} />
            )}
        />
    )
}