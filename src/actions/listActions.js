export const populate = () => (
    dispatch, 
    getState, 
    {getFirebase}) => {
        const firebase = getFirebase();       
        const itemsRef = firebase.firestore().collection("items").doc("all-items").collection("books");
        itemsRef.get().then(documentSnapshot => {
            let items = [];
            documentSnapshot.forEach(doc => {
            const item = doc.data();
            items.push(item);            
            })
            return items;   
        }).then(items => dispatch({type: 'POPULATE-LIST', payload: items}))
        
    }


