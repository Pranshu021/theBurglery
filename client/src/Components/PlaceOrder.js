import '../CSS/PlaceOrder.css'
import { useState, useEffect }  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PlaceOrder = (props) => {
    const {burgerName} = useParams();
    const [displayMessage, setDisplayMessage] = useState({
        type: "",
        message: ""
    })
    const [burgerDetails, setBurgerDetails] = useState();
    const [addonsOptions, setAddonsOptions] = useState([]);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const navigate = useNavigate();

    const handleAddonsSubmission = (event) => {
        event.preventDefault();
        let addonsSelected = [];
        let addonObject = {}
        for(let i in addonsOptions) {
            const addonElement = document.getElementById(addonsOptions[i].name);
            if(addonElement.value > 0) {
                addonObject = {
                    name: addonsOptions[i].name,
                    quantity: Number(addonElement.value),
                    price: addonsOptions[i].price,
                }

                addonObject.totalAmount = addonObject.quantity * addonObject.price;

                addonsSelected.push(addonObject);
            }
        }   
        console.log(addonsSelected);
        setSelectedAddons(addonsSelected);
        handleClose();
    } 

    const HandleSubmit = async(event) => {
        event.preventDefault();
        console.log(event.target.id);
        if(event.target.id !== "addons-form") {
            console.log("Submitting form");
            const customerName = document.getElementById("customer_name").value;
            const burger_quantity = document.getElementById("quantity").value;
            const customerPhone = document.getElementById("customer_phone").value;
            document.getElementById("submit-button").disabled = true;
            try {
                const response = await axios.post('/api/orders/createOrder', {
                    customer_name: customerName, 
                    burger_quantity: burger_quantity, 
                    customer_phone: customerPhone,
                    burger_name: burgerDetails.burger_name,
                    burger_price: burgerDetails.burger_price,
                    addons: selectedAddons
                });
                if(response.status === 200 && response.data.msg === "Order Placed") {
                    setDisplayMessage({type: "success", message: "Order placed"})
                    document.getElementById("submit-button").disabled = false;
                } else {
                    setDisplayMessage({type: "error", message: "Order failed"})
                }
    
            } catch(error) {
                setDisplayMessage({type: "error", message: "Order Failed"})
                console.error(error)
            }
        }
    }

    const addOnsModal = (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Addons Menu</Modal.Title>
            </Modal.Header>
            <form className="addons-form" id="addons-form" onSubmit={handleAddonsSubmission}>

            <Modal.Body>
                    {addonsOptions.map((addon) => (
                        <div className="row mt-2">
                            <div className="col-lg-6">
                                <label htmlFor={addon.name}><b>{addon.name} - {addon.price}/-</b></label>
                            </div>
                            <div className="col-lg-6">
                                <input type='number' placeholder="Quantity" className="addons-text-fields" id={addon.name} min={0}/>
                            </div>
                        </div>
                    ))}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type='submit'>
                    Save Changes
                </Button>
            </Modal.Footer>
            </form>

        </Modal>
    )

    // const handleAddonsSelect = (event) => {
    //     const selectedOptions = event.target.options;
    //     const selectedValues = [];
    //     for (let option of selectedOptions) {
    //         if (option.selected) {
    //             selectedValues.push(option.value);
    //         }
    //     }
    //     setSelectedAddons(selectedValues);
    //     console.log(selectedValues);
    // }

    useEffect(() => {
        const checkBurgerExists = async() => {
            setDisplayMessage({type: "", message: ""})
            const response = await axios.get('/api/burgers/getBurger', {
                params: {
                    burgerName: burgerName
                }
            });
            if(response.data.length === 0) {
                setDisplayMessage({type: "error", message: "Invalid Order"})
            } else {
                setDisplayMessage({type: "", message: ""})
                setBurgerDetails(response.data[0]);
            }
        }
        checkBurgerExists();
    }, [burgerName])

    useEffect(() => {
        const getAddonsList = async() => {
            const response = await axios.get('/api/burgers/getAddons');
            setAddonsOptions(response.data);
        }

        getAddonsList();
    }, [])

    return (
        <div className="container form-container">
            <h2>Place Your Order</h2>
            <u><p>{burgerName}</p></u>

            

            { displayMessage.type === "error" && displayMessage.message === "Invalid Order" ? <div className="alert alert-danger text-center">{displayMessage.message}</div> : 

            <form className="order-form" onSubmit={HandleSubmit}>
                
                <div className="row inputs">
                    <label className="mb-1">Enter Quantity</label>
                    <input className="placeorder-inputs" required type="number" min="1" max="100" id="quantity" placeholder="Number of Burgers..."/>   
                </div>

                <div className="row inputs">
                    <label className="mb-1">Name</label>
                    <input className="placeorder-inputs"  required type="text" id="customer_name" placeholder="Customer Name..."/>
                </div>
                
                <div className="row inputs">
                    <label className="mb-1">Phone</label>
                    <input className="placeorder-inputs"  required type="text" placeholder="Customer Phone number ..." id="customer_phone"/>
                </div>

                

                {/* <div className="row inputs">
                    <label className="mb-1">Addons</label>
                    <select className="custom-select" id="addons-select" onChange={handleAddonsSelect} multiple>
                        {addonsOptions.map((addon) => (
                            <option value={addon.name}>{addon.name} --  {addon.price}</option>
                        ))}
                    </select>
                </div> */}
                <div className="row">
                {addOnsModal}

                    <div className="col-lg-12 text-center">
                        <button className="btn btn-outline-success addons-button p-3" id="addons-button" type='button' onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height={20} width={20}>
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                            </svg> 
                            <br></br>
                            Addons
                        </button>

                    </div>
                    
                </div>

                <div className="row submit-button-row">
                    <button className="btn btn-danger" type="submit" id="submit-button">Place Order</button>
                </div>
            </form> }

            { displayMessage.type === "success" && displayMessage.message === "Order placed" ? <div className='alert alert-success'>Order Successfully placed!</div> :  <></>}
            { displayMessage.type === "error" && displayMessage.message === "Order failed" ? <div className='alert alert-success'>Error in placing the order. Please try again...</div> :  <></>}
        </div>
    );
}

export default PlaceOrder;



// Handle Addons