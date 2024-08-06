import { Navigate, useLocation } from "react-router-dom";
import { IAuth } from "./Auth.props";
import { useAppSelector } from "../hooks/storeHooks";

const Auth = ({ children }: IAuth) => {

    const location = useLocation()
    const token = useAppSelector((state) => state.user.token)
    // console.log('Auth -', token);

    if (token === null) {
        return <Navigate to={'/auth/signup'} replace={true} state={{ path: location.pathname }} />
    }

    return children
}

export default Auth;