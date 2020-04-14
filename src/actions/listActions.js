export const populate = () => (
    dispatch, 
    getState, 
    {getFirebase}) => {
        const firebase = getFirebase();       
        const itemsRef = firebase.firestore().collection('sell').doc('book').collection("bookListings");
        itemsRef.get().then(documentSnapshot => {
            let items = [];
            documentSnapshot.forEach(doc => {
            const item = doc.data();
            item['id'] = doc.id;
            items.push(item);            
            })
            return items;   
        }).then(items => dispatch({type: 'POPULATE_LIST', payload: items}))
        
    }


