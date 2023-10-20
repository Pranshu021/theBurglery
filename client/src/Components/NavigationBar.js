import { Link, useNavigate } from "react-router-dom";
import "../CSS/navbar.css";

const NavigationBar = (props) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isSignedIn");
        localStorage.removeItem("user_data");
        navigate("/");
    }

    return (
        <div className="container navigation-bar">
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="navbar-heading">The Burglery</h1>
                </div>
            </div>
            <div className="row navigation-links">
                <Link to="/" className="navigation-link">
                    Home
                </Link>
                <Link to="/orders" className="navigation-link">
                    Orders
                </Link>
                <Link to="/burgers/add" className="navigation-link">
                    Add-Burger
                </Link>
                <span className="logout-span"><button class="btn logout-button" onClick={handleLogout}>Logout</button></span>
            </div>
            
        </div>
    );
};

export default NavigationBar;

{/* <span className="username">Welcome {userData.username}</span> */}