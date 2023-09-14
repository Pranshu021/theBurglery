import '../CSS/signup.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'; 

const SignUp = (props) => {

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
        
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phone = document.getElementById("phone").value;

        try {
            setDisplayMessage({
                messageType: '',
                message: ''
            })

            const response = await axios.post('/api/users/createUser', {username, email, password, phone});
            if(!response.data.error) {
                setDisplayMessage({
                    messageType: 'success',
                    message: 'User created successfully'
                })
            } else {
                setDisplayMessage({
                    messageType: 'error',
                    message: 'Something went Wrong'
                })
            }
        } catch(error) {
            console.log(error)
            setDisplayMessage({
                messageType: 'error',
                message: 'Something went Wrong'
            })
        }
        
    }


    return (
        <div className="container-fluid signup-container">
            <div className="row form-row">
                <div className="col-lg-12">
                    <h2>Sign Up</h2>
                    <form className="form-horizontal signup-form" onSubmit={submitHandler} >
                        <div className="row input-rows">
                            <div className="col-lg-12">
                                <input type="text" id="username" className="form-control" placeholder="Username" />
                            </div>
                        </div>

                        <div className="row input-rows">
                            <div className="col-lg-12">
                                <input type="text" id="email" className="form-control" placeholder="Email" />
                            </div>
                        </div>

                        <div className="row input-rows">
                            <div className="col-lg-12">
                                <input type="text" id="phone" className="form-control" placeholder="Phone" />
                            </div>
                        </div>

                        <div className="row input-rows">
                            <div className="col-lg-12">
                                <input type="password" id="password" className="form-control" placeholder="Password" />
                            </div>
                        </div>

                        <div className="row button-row">
                            <div className="col-lg-12">
                                <button type="submit" className="btn btn-danger btn-block signup-button">Log In</button>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-lg-12">
                                <p>Already a Member? <Link to="/login">Login</Link></p>
                            </div>
                        </div>

                        {displayMessage.messageType === 'success' ? <div className='alert alert-success text-center mt-3 mb-0'>{displayMessage.message}</div> : <></>}
                        
                        {displayMessage.messageType === 'error' ? <div className='alert alert-danger text-center mt-3 mb-0'>{displayMessage.message}</div> : <></>}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;