import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/viewBurger.css';

const ViewBurger = (props) => {

    const [burgerDetails, setBurgerDetails] = useState();
    const [burgerImageURL, setBurgerImageURL] = useState();
    const [displayMessage, setDisplayMessage] = useState({
        type: '',
        message: ''
    })
    const { id } = useParams();

    useEffect(() => {
        const getBurgerDetails = async() => {
            setDisplayMessage({type: 'loading', message: 'Loading..'})
            try {
                const response = await axios.get(`/api/burgers/${id}`);
                console.log(response)
                if(response.status === 200 && response.data) {
                    setBurgerDetails(response.data);
                    setDisplayMessage({type:'', message: ''})
                } else {
                    setDisplayMessage({type:'error', message: 'Invalid Request'})
                }
            } catch(error) {
                setDisplayMessage({type:'error', message: 'Invalid Request'})
            } 
            
        }

        getBurgerDetails();
    }, [id]);

    useEffect(() => {
        const getBurgerImage = async() => {
            if(burgerDetails) {
                const imageResponse = await fetch(`/images/${burgerDetails.burger_name}.jpg`);
                const imageBlob = await imageResponse.blob();
                const imageURL = await URL.createObjectURL(imageBlob);
                setBurgerImageURL(imageURL);
            }

        }
        getBurgerImage();
    }, [burgerDetails])

    return(
        <div className="container burger-details-container">
            {displayMessage.type === 'loading' && <div className="alert alert-warning mt-4">{displayMessage.message}</div>}
            {displayMessage.type === 'error' && <div className="alert alert-danger mt-4">{displayMessage.message}</div>}
            {displayMessage.type === '' && burgerDetails ? 

            <div className="row burger-details-row">
                <div className="col-lg-6 burger-image-column">
                    <img src={burgerImageURL} alt={burgerDetails.burger_name} height="300px" width="300px" className="burger-image"/>
                </div>

                <div className="col-lg-6 burger-details-column">
                    <h1>{burgerDetails.burger_name}</h1>
                    
                    <b className="burger-details-text">Ingredients </b> <span className="burger-recipe-text">
                        500 g chicken mince, 
                        1/4 cup breadcrumbs, 
                        2 tablespoons chopped parsley, 
                        Salt and pepper, to taste, 
                        4 eggs, 
                        4 slices of cheese, 
                        4 burger buns, 
                        Lettuce, tomato, onion, and mayonnaise, for serving, 
                    </span>

                    <b className="burger-details-text">Recipe </b> <span className="burger-recipe-text">
                        <ul>
                            <li>In a large bowl, combine chicken mince, breadcrumbs, parsley, salt, and pepper. Mix well and shape into 4 patties.</li>

                            <li>Heat a grill pan or a skillet over medium-high heat and cook the patties for about 15 minutes, turning once, until golden and cooked through.</li>

                            <li>In another skillet, fry the eggs over medium heat until the whites are set and the yolks are still runny, about 3 minutes.</li>

                            <li>To assemble the burgers, toast the buns and spread some mayonnaise on the bottom halves. Place a lettuce leaf, a tomato slice, and an onion ring on each bun. Top with a chicken patty, a slice of cheese, and an egg. Cover with the top halves of the buns and enjoy!</li>
                        </ul>
                    
                    </span>

                    <b className="burger-details-text">Prep Time - <span className="burger-recipe-text">
                        20 min
                    </span></b> 
                </div>
            </div> 

            : <></>}
            
        </div>
    )
}

export default ViewBurger;