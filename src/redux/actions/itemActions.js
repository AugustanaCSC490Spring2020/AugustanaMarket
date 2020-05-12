/**
 * This action loads the information of a single item
 * from the listReducer state so that if redux already
 * has this info, we do not have to do another read to
 * firestore
 * @param item the item being loaded
 */
export const loadItemDetails = (item) => {
    return {
        type: 'ITEM_LOADED', 
        payload: item
    };
}

/**
 * This action resets the item so that we can determine
 * if a new item has been loaded
 */
export const resetState = () => {
    return {
        type: 'RESET_ITEM_INFO'
    }
}

/**
 * This action loads the information for a single item
 * from firestore.  This is used if the listReducer did
 * not have the item in its state. If the item does not
 * exist in firebase, then the action dispatches that the
 * item was not found in firestore.
 * @param itemID the item that is being loaded
 * @param requestOrSell the collection from firestore
 */
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