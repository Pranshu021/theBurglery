import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    if(localStorage.getItem("isSignedIn") && localStorage.getItem("isSignedIn") === 'true') {
        return children;
    } else {
        return <Navigate to="/" replace />
    }
    // if (!isSignedIn) {
    //     console.log("Not signed in")
    //     return <Navigate to="/" replace />
    // }
    // return children
}

export default PrivateRoute;