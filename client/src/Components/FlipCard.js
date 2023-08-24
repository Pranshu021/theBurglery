import MenuCards from './MenuCards.js';
import '../CSS/FlipCard.css'
import { Link } from 'react-router-dom';

const FlipCard = (props) => { 
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
                            <Link to={"/order/" + props.burgerName}><button className="btn btn-outline-success flip-card-buttons">Place Order</button></Link>
                            {/* <Link to={"/order/" + props.burgerName + "/custom"}><button className="btn btn-outline-success flip-card-buttons mt-2">Edit Order</button></Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
)

}

export default FlipCard;