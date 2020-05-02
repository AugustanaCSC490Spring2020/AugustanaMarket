export const loadClassCategories = () => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.firestore().doc('/Categories/Class').get().then(doc => {
        dispatch({type : 'LOAD_CLASS_CATEGORIES', payload : doc.data().Categories})
    })
    
}

