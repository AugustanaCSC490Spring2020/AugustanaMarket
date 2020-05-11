export const populate = (requestOrSell, uid) => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const itemsRef = firebase.firestore().collection(requestOrSell);
    itemsRef
        .where('uid', '==', uid)
        .get()
        .then((documentSnapshot) => {
            let items = [];
            documentSnapshot.forEach((doc) => {
                const item = { ...doc.data() };
                item['id'] = doc.id;
                items.push(item);
            });
            return items;
        })
        .then((items) => dispatch({ type: 'POPULATE_LIST', payload: items }));
};

export const deleteItem = (requestOrSell, itemID) => async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const items = getState().list.items;
    let index = 0;
    const updateItems = []
    for(let i = 0; i < items.length; i++){
        if(items[i].id !== itemID){
            updateItems.push(items[i])
        } else {
            index = i;
        }
    }
    const numImages = items[index].numImages;
    await firebase.firestore().collection(requestOrSell).doc(itemID).delete()
    for (let i = 0; i < numImages; i++) {
        await firebase.storage().ref(itemID + '/' + i).delete();
    }
    dispatch({type: 'DELETE_ITEM', payload: updateItems});
};

export const resetState = () => {
    return {
        type : 'RESET_LIST'
    };
};
