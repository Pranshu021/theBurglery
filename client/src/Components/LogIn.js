import '../CSS/login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'; 


const LogIn = (props) => {

    const [displayMessage, setDisplayMessage] = useState({
        messageType: '',
        message: ''
    })

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("isSignedIn") && localStorage.getItem("isSignedIn") === 'true') {
            console.log("Signed in")
            navigate('/home')
        } 
    }, [])

    const submitHandler = async(event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            setDisplayMessage({
                messageType: '',
                message: ''
            })

            const response = await axios.post('/api/users/login', {email, password});

            if(response.status === 200) {
                console.log(response.data);
                localStorage.setItem("isSignedIn", true)
                localStorage.setItem("userData", response.data[0]);
                setDisplayMessage({
                    messageType: 'success',
                    message: 'Successfully Logged In'
                })
                navigate('/home');
            }
        } catch(error) {
            console.log(error)
            setDisplayMessage({
                messageType: 'error',
                message: error.response.data.error
            })
        }
        
    }
    return(
    <div className="container-fluid login-container">
        <div className="row form-row">
            <div className="col-lg-12">
                <h2>Log In</h2>
                <form className="form-horizontal login-form" onSubmit={submitHandler} >
                    <div className="row input-rows">
                        <div className="col-lg-12">
                            <input type="text" id="email" className="form-control" placeholder="Email" />
                        </div>
                    </div>

                    <div className="row input-rows">
                        <div className="col-lg-12">
                            <input type="password" id="password" className="form-control" placeholder="Password" />
                        </div>
                    </div>

                    <div className="row button-row">
                        <div className="col-lg-12">
                            <button type="submit" className="btn btn-danger btn-block login-button">Log In</button>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-12">
                            <p>Not registered? <Link to="/">Signup</Link></p>
                        </div>
                    </div>

                    {displayMessage.messageType === 'success' ? <div className='alert alert-success text-center mt-3 mb-0'>{displayMessage.message}</div> : <></>}
                    
                    {displayMessage.messageType === 'error' ? <div className='alert alert-danger text-center mt-3 mb-0'>{displayMessage.message}</div> : <></>}

                </form>
            </div>
        </div>
    </div>)
}

export default LogIn;