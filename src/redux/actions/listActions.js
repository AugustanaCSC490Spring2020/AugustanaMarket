/**
 * This action allows for the population of items from a user's
 * set of sellings or requests into redux
 * @param requestOrSell the collection from firestore
 * @param uid the user that is being referenced
 */
export const populate = (requestOrSell, uid) => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const itemsRef = firebase.firestore().collection(requestOrSell);
    //To get a specific set of user items, we query using the user id specified
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

/**
 * This action allows for the user's favorite items to be loaded
 * @param requestOrSell the collection from firestore
 */
export const loadFavorites = (requestOrSell) => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const itemsRef = firebase.firestore().collection(requestOrSell);
    itemsRef.where('usersLike', 'array-contains', firebase.auth().currentUser.uid).get().then(documentSnapshot => {
        const items = []
        documentSnapshot.forEach(doc => {
            const item = {...doc.data()}
            item['id'] = doc.id;
            items.push(item)
        })
        return items;
    }).then(items => dispatch({type: 'POPULATE_LIST', payload: items}))
}

/**
 * This action allows the user to delete an item (if it was created by them)
 * by changing the state in redux, but also deleting the document in firestore.
 * This also involves deleting any pictures in firebase storage that were associated
 * with the specific item
 * @param requestOrSell the collection in firestore
 * @param itemID the item that is being deleted
 */
export const deleteItem = (requestOrSell, itemID) => async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    // to "delete" the item from redux, we have to provide a new
    // array that does not contain the item to the reducer through
    // the payload
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
    // Unfortunately, you cannot delete a folder of images in firebase
    // storage via code, so we have to know how many images we are deleting 
    // (which we stored in firestore) and iterate over the deletion of an image
    // until all of the images are deleted
    const numImages = items[index].numImages;
    await firebase.firestore().collection(requestOrSell).doc(itemID).delete()
    for (let i = 0; i < numImages; i++) {
        await firebase.storage().ref(itemID + '/' + i).delete();
    }
    dispatch({type: 'DELETE_ITEM', payload: updateItems});
};

/**
 * This method removes an item that the user has favorited from their
 * favorites. This is done in redux as well as firebase
 * @param requestOrSell the collection in firestore
 * @param itemID the item being removed 
 */
export const removeFromFavorites = (requestOrSell, itemID) => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
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
    firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(itemID).get().then(async (doc) => {
        const data = {...doc.data()}
        data.usersLike = data.usersLike.filter(user => user !== firebase.auth().currentUser.uid);
        await firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(itemID).update(data)
        
    })

    dispatch({type : 'DELETE_ITEM', payload: updateItems})
}

/**
 * This action resets the state so that we can determine
 * if the new listings of items have been loaded.
 */
export const resetState = () => {
    return {
        type : 'RESET_LIST'
    };
};
