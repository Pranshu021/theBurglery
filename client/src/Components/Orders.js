import { useEffect, useState } from "react";
import '../CSS/Orders.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Orders = (props) => {
    const [orderListData, setOrderListData] = useState();
    const [isLoading, setLoadingState] = useState(true);
    const [error, setErrorState] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    var orderListItems;


    useEffect(() => {
        const fetchOrderData = async() => {
            try{
                const response = await axios.get('/api/orders/getOrders');
                const orderData = response.data;
                setOrderListData(orderData);
                setLoadingState(false);
            } catch(error) {
                setErrorState(error.message);
            }
            
        }
        
        fetchOrderData();
    }, []);

    const orderDeleteHandler = async(orderID) => {
        // orderListData.pop(orderListData.find(order => order._id === orderID));
        try {
            const deleteResponse = await axios.delete(`/api/orders/${orderID}`)
            if(deleteResponse.data.msg === 'Delete successfull') {
                window.location.reload(true)
            } else {
                setErrorState(deleteResponse.data.error)
            }
        } catch(error) {
            setErrorState(error.message);
        }
        
    }

    const handleModify = (order) => {
        dispatch({type: 'CUSTOM', orderid: order.id})
        navigate('/order/' + order.id + '/modify')
    }

    if(orderListData) {
        
        orderListItems = orderListData.map((order) => {
            return (
                <div className="row order-item-row" key={order.order_id}>
                    <div className="col-sm-6 order-details">
                        <p>
                        Order ID : <b>{order.order_id} </b><br />
                        Customer Name : <b>{order.customer_name}</b><br />
                        Order : <b>{order.order_name}</b><br />
                        Order Price : <b>{order.order_name}</b><br />
                        Status : <b>{order.order_status}</b><br />
                        Addons : {order.addons.length > 0 ? order.addons.map((addon) => {
                            return(<b>{addon.quantity} - {addon.name}, &nbsp;</b>)
                        }): <><b>None</b></>} <br />
                        Burger Price : <b>₹ {order.order_price}</b><br />
                        Addons Price : <b>₹ {order.addons_amount}</b><br />
                        Total Amount : <b>₹ {order.total_amount + order.addons_amount}</b><br />

                        {/* Addons : <b>{order.addons.length > 0 ? "" +  order.addons : "None"}</b> */}
                        </p>
                    </div>  
                    <div className="col-sm-6 order-control-buttons">
                        <button className="btn btn-outline-danger order-page-buttons" onClick={() => orderDeleteHandler(order._id)}>Delete Order</button>
                        <button className="btn btn-outline-danger order-page-buttons" onClick={() => handleModify(order)}>Edit Order</button>
                    </div>
                </div>   
            )
        })
    }


    return (
        <div className="container orders-container">
                {isLoading && <div className="alert alert-warning">Loading ...</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                {orderListData && orderListData.length > 0 ? orderListItems : <h1 className="no-orders-text">No Orders</h1>}
        </div>
    )
}

export default Orders;