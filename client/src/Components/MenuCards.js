import '../CSS/MenuCards.css'
import { useEffect, useState } from 'react';


const MenuCards = (props) => {

    const [image, setImage] = useState();

    useEffect(() => {
        const fetchImage = async() => {
            const burgerImageObject = await fetch(`/images/${props.burgerName}.jpg`);
            const burgerImageBlob = await burgerImageObject.blob();
            const burgerImageURL = URL.createObjectURL(burgerImageBlob);
            setImage(burgerImageURL);
        }
        fetchImage();
    }, [props.burgerName])

    return (
        <div className="menu-cards flip-card-front">
            <img className="burger_image" src={image} width="150px" height="150px" alt={props.burgerName + " image"} />
            <p className="burger_name">{props.burgerName}</p>
            <p className="burger_price">{props.burgerPrice}</p>
        </div>
    )
};

export default MenuCards;