import '../CSS/LogIn.css'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
const crypto = require('crypto');

const LogIn = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const submitHandler = (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value
        // dispatch({type: 'LOGIN', username: document.getElementById("username").value, password: document.getElementById("password").value});
        fetch('http://localhost:8000/users').then((res) => {
                return res.json();
            }).then((data) => {
                if(data.find((data) => {
                    return data.username === username && data.password === password;
                })) {
                    dispatch({type : 'LOGIN', username: username, password: password});
                    navigate('/');
                }
            })
        }

    return (
        <div className="container login-container">
            <div className="row intro-row">
                <div className="col-lg-12">
                    <h2>Welcome to the Burglery</h2>
                    <p>Here, we steal your Hunger ;)</p>
                </div>
            </div>

            <div className="row form-row">
                <div className="col-lg-12">
                    <h2>Log In</h2>
                    <form className="form-horizontal login-form" onSubmit={submitHandler} >
                        <div className="row input-rows">
                            <div className="col-lg-12">
                                {/* <label>Username : </label> */}
                                <input type="text" id="username" className="form-control" placeholder="Username" />
                            </div>
                        </div>

                        <div className="row input-rows">
                            <div className="col-lg-12">
                                {/* <label>Email : </label> */}
                                <input type="text" id="email" className="form-control" placeholder="Email" />
                            </div>
                        </div>

                        <div className="row input-rows">
                            <div className="col-lg-12">
                                {/* <label>Password : </label> */}
                                <input type="password" id="password" className="form-control" placeholder="Password" />
                            </div>
                        </div>

                        <div className="row button-row">
                            <div className="col-lg-12">
                                <button type="submit" className="btn btn-danger btn-block login-button">Log In</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogIn;