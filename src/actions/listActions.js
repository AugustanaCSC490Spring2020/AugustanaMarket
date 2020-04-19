export const populate = (buyOrSell) => (
    dispatch, 
    getState, 
    {getFirebase}) => {
        const firebase = getFirebase();       
        const itemsRef = firebase.firestore().collection(buyOrSell == 'sell' ? 'sell' : 'buy');
        itemsRef.get().then(documentSnapshot => {
            let items = [];
            documentSnapshot.forEach(doc => {
            const item = {...doc.data()};
            item['id'] = doc.id;
            items.push(item);            
            })
            return items;   
        }).then(items => dispatch({type: 'POPULATE_LIST', payload: items}))
        
    }

export const resetState = () => {
    return {
        type: 'RESET_LIST'
    }
}


