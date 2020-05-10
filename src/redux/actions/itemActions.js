export const loadItemDetails = (item) => {
    return {
        type: 'ITEM_LOADED', 
        payload: item
    };
}

export const resetState = () => {
    return {
        type: 'RESET_ITEM_INFO'
    }
}

export const checkFirestore = (itemID, requestOrSell) => (
    dispatch,
    getState,
    {getFirebase}) => {
        const firebase = getFirebase();
        firebase.firestore().collection(requestOrSell).doc(itemID).get().then(doc => {
            if(doc.exists) {
                const item = {...doc.data()}
                dispatch({type: 'ITEM_LOADED', payload: item})
            } else {
                dispatch({type: 'ITEM_NOT_FOUND'})
            }
        })
}