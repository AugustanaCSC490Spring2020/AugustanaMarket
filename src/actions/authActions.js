import {provider} from '../Firebase';

export const signIn = () => (
    dispatch, 
    getState, 
    {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            if(result.credential) {
                const userRef = firebase.firestore().collection('users').doc(result.user.uid);
                userRef.get().then(function(doc) {
                    if(!doc.exists){
                        userRef.set({name: result.user.displayName});
                    }
                }).then(dispatch({type: 'LOGIN_SUCCESS'}))
            }
        }).catch((error) => {
            dispatch({type: 'LOGIN_ERROR', error})
        })
};