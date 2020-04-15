export const loadItemDetails = (item) => async (
    dispatch,
    getState,
    {getFirebase}) => {
    const firebase = getFirebase();
    const user = await firebase.firestore().collection('users').doc(item.creator).get();
    const data = user.data();
    item['displayName'] = data.displayName
    item['email'] = data.email;
    dispatch({type: 'ITEM_LOADED', payload: item})
}