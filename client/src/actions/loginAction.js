export const login = (username, password) =>{
    return {
        type: 'LOGIN',
        payload : {
            username : username,
            password : password
        }
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}