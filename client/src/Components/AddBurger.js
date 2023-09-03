import '../CSS/AddBurger.css';
import { useState } from 'react';
import axios from 'axios';

const AddBurger = (props) => {
    const [displayMessage, setDisplayMessage] = useState({
        type: '',
        message: ''
    })

    const handleBurgerSubmit = async(event) => {
        event.preventDefault();
        setDisplayMessage({type: '', message: ''})
        const burger_name = event.target.burger_name.value
        const burger_price = event.target.burger_price.value
        const preparation_time = event.target.burger_prep_time.value;
        const burger_image = document.getElementById("burger_image").files[0];
        
        try {
            const response = await axios.post('/api/burgers/addBurger', {
                burger_name,
                burger_price,
                preparation_time,
                burger_image
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if(response.status === 200 && response.data.msg === 'Burger Added') {
                setDisplayMessage({type: 'success', message: 'New Burger added to the Menu!'})
            } else {
                setDisplayMessage({type: 'error', message: 'Something went wrong!'})
            }
        } catch(error) {
            setDisplayMessage({type: 'error', message: 'Something went wrong!'})
            console.log(error)
        }
        
    }

    return (
        <div className="container add-burger-container">
            <form onSubmit={handleBurgerSubmit} encType="multipart/form-data">
                <div className="row add-burger-row">
                    <h2>Add Burger</h2>
                        <div className="col-lg-12 add-burger-column mt-3">
                            <label htmlFor="name" className='add-burger-form-labels text-start'>Name</label>
                            <input type="text" placeholder="Name of Burger" className="add-burger-form-fields" id="burger_name" name="burger_name"></input>

                            <label htmlFor="name" className='add-burger-form-labels text-start'>Price</label>
                            <input type="number" placeholder="Price" className="add-burger-form-fields" id="burger_price" name="burger_price">
                            </input>

                            <label htmlFor="name" className='add-burger-form-labels text-start'> Time</label>
                            <input type="number" placeholder="Time to Cook" className="add-burger-form-fields" id="burger_prep_time" name="burger_prep_time"></input> 

                            <label htmlFor="name" className='add-burger-form-labels text-start'>Image</label>
                            <input type="file" placeholder="Name of Burger" id="burger_image" name="burger_image"></input> 

                            <button className="btn-lg btn-danger mt-4" type="submit">Add</button> 

                            {displayMessage.type === 'error' ? <div className='alert alert-danger mt-3'>{displayMessage.message}</div> : <></>}
                            {displayMessage.type === 'success' ? <div className='alert alert-success mt-3'>{displayMessage.message}</div> : <></>}

                        </div>
                </div>
            </form>
        </div>
    )
}

export default AddBurger;