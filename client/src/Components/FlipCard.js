import MenuCards from './MenuCards.js';
import '../CSS/FlipCard.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FlipCard = (props) => { 
    const navigate = useNavigate();

    const handlePlaceOrder = async(event) => {
        const burgerDetails = await axios.get(`/api/burgers/${props.burger_id}`);
        navigate(`/order/${props.burger_id}`);
    }

    const handleViewBurgerHandler = async(event) => {
        const burgerId = await axios.get(`/api/burgers/${props.burger_id}`);
        navigate(`/burgers/${props.burger_id}`);
    }

    return(
        <div className="flip-card container">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <MenuCards burgerName={props.burgerName} 
                    burgerPrice={props.burgerPrice + " Rs./"}cvl
                   />
                </div>
                <div className="flip-card-back">
                    <div className="d-flex align-items-center back-side">
                        <div className="row buttons-row">
                            <button className="btn btn-outline-success flip-card-buttons mt-2" onClick={handlePlaceOrder}>Place Order</button>
                            <button className="btn btn-outline-success flip-card-buttons mt-2" onClick={handleViewBurgerHandler}>View Burger</button>

                            {/* <Link to={"/order/" + props.burgerName + "/custom"}><button className="btn btn-outline-success flip-card-buttons mt-2">Edit Order</button></Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
)

}

export default FlipCard;