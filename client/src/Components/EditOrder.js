import AddonsMenu from './AddonsMenu'
import '../CSS/EditOrder.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';


const EditOrder = (props) => {
    const items = ["Cheese", "Grilled", "Spicy", "Coke", "Sprite", "Fanta", "Water", "Packed"];
    const prices = [10, 10, 10, 40, 40, 40, 20, 0];
    const params = useParams();
    let orderSubmit;
    let addOnsCost=0;
    const navigate = useNavigate();
    const customOrder = useSelector(state => state.isCustomOrder);
    const [addOnState, changeAddOnState] = useState({
        Cheese: false,
        Grilled: false,
        Spicy: false,
        Coke: false,
        Sprite: false,
        Fanta: false,
        Water: false,
        Packed: false
    })

    const [orderPlaced, changeOrderState] = useState("nothing");


    const HandleCustomOrder = (event) => {
        event.preventDefault();
        fetch('https://api.jsonbin.io/v3/b/64de513d9d312622a392b713/' + customOrder.orderid, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                addons: addonsList,
                addons_amount : addOnsCost
            })
        }).then((response) => {
            if(response.status === 200) {
                changeOrderState("placed");
            }
            else {
                throw Error("Request Failed. Network Error...")
            }
            setTimeout(() => {
                navigate('/');
            }, 1000);
        })
    }

    const addOnSelectionHandler = (event) => {
        const addOnName = event.target.id;
        changeAddOnState({...addOnState, [addOnName]: !addOnState[addOnName]});
    }

    let addonsList = [];
    useEffect(() => {
        addonsList = Object.keys(addOnState).filter(key => addOnState[key]);
        addonsList.forEach(item => {
            addOnsCost += prices[items.indexOf(item)];
        })
    }, [addOnState])


    return (
        <div className="container edit-order-container p-3 mt-3">
            <form className="form-group edit-order-form" onSubmit={HandleCustomOrder}>
                <AddonsMenu menuItems={items} prices={prices} addOnSelectHandler={addOnSelectionHandler}/>
                <button type="submit" className="btn btn-danger btn-block edit-order-button">Submit</button>
                {orderSubmit}
            </form>
            {orderPlaced === "placed" ? <div className="alert alert-success" role="alert" >Order Placed. Redirecting....</div>: orderPlaced === "failed" ? <div className="alert alert-danger" role="alert" >Order Failed. Please Try Again Later...</div> : null}

        </div>
    )
}

export default EditOrder;