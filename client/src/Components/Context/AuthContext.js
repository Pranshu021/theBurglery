import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState(null);

    const login = (token) =>{
        setUserToken(token);
    }

    const logout = (logout) => {
        setUserToken(null)
    }

    return(
        <AuthContext.Provider value={{userToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);