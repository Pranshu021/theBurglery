import {login, logout } from '../actions/loginAction';

const isLogged = (state = {username : "", password : "", isLoggedIn: false}, action) => {
    switch(action.type) {
        case "LOGIN":
            return {username : action.username, password : action.password, isLoggedIn: true};
        case "LOGOUT":
            return {username : action.username, password : action.password, isLoggedIn: false};

        default:
            return state;
    }
}

export default isLogged;