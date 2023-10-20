import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userData, setUserData] = useState(null);

    const login = (token) =>{
        setUserData(token);
    }

    const logout = (logout) => {
        setUserData(null)
    }

    return(
        <AuthContext.Provider value={{userData, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);