const isCustomOrder = (state = {orderid: null, customerOrder: false}, action) => {
    switch(action.type) {
        case 'CUSTOM':
            console.log("Order ID : " + action.orderid)

            return {
                orderid: action.orderid,
                customerOrder: true,
            }
        case 'NOT_CUSTOM':
            return {
                orderid: action.orderid,
                customOrder: false,
            }

        default: 
            return state;
    }
}

export default isCustomOrder;