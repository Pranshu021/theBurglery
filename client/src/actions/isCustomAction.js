export const customOrder = (orderid) => {
    return {
        type: 'CUSTOM',
        payload : {
            orderid : orderid,
        }
    }
}

export const notCustomOrder = (orderID) => {
    return {
        type: 'NOT_CUSTOM',
        payload : {
            orderid : orderID,
        }
    }
}