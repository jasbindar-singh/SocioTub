import React, {useContext} from 'react'
import { AuthContext } from '../../App';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: RouteComponent, ...rest }) {

    const user = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render = { routeProps =>
                !!user ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    )
}

export default ProtectedRoute
