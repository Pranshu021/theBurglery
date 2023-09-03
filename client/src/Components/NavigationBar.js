import { Link } from "react-router-dom";
import '../CSS/navbar.css';

const NavigationBar = (props) => {
    return(
      <div className="container navbigation-bar">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="navbar-heading">The Burglery</h1>
          </div>
        </div>
        <div className="row navigation-links">
          <Link to="/" className="navigation-link">Home</Link>
          <Link to="/orders" className="navigation-link">Orders</Link>
          <Link to="/burgers/add" className="navigation-link">Add-Burger</Link>
          
        </div>
      </div>
    );
}


export default NavigationBar;
