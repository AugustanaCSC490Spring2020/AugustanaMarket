export const resetState = () => {
    return {
        type    : 'RESET'
    }
}
export const changeItemType = (newItemType) => {
    return {
        type    : 'CHANGE_ITEM_TYPE',
        payload : newItemType
    };
};

export const changeBuyOrSell = (newBuyOrSell) => {
    return {
        type    : 'CHANGE_BUY_OR_SELL',
        payload : newBuyOrSell
    };
};

export const changeClassCategory = (newCategory) => {
    return {
        type    : 'CHANGE_CLASS_CATEGORY',
        payload : newCategory
    };
};

export const changeCondition = (newCondition) => {
    return {
        type    : 'CHANGE_CONDITION',
        payload : newCondition
    };
};
export const changeCourseNum = (newCourseNum) => {
    return {
        type    : 'CHANGE_COURSE_NUM',
        payload : newCourseNum
    };
};
export const changeTitle = (newTitle) => {
    return {
        type    : 'CHANGE_TITLE',
        payload : newTitle
    };
};

export const changeAuthor = (newAuthor) => {
    return {
        type    : 'CHANGE_AUTHOR',
        payload : newAuthor
    };
};
export const changePrice = (newPrice) => {
    return {
        type    : 'CHANGE_PRICE',
        payload : newPrice
    };
};
export const changeIsbn = (newIsbn) => {
    return {
        type    : 'CHANGE_ISBN',
        payload : newIsbn
    };
};
export const changeImage = (newImage) => {
    return {
        type    : 'CHANGE_IMAGE',
        payload : newImage
    };
};

export const changeDescription = (newDescription) => {
    return {
        type    : 'CHANGE_DESCRIPTION',
        payload : newDescription
    };
};

export const resetImage = () => {
    return {
        type    : 'RESET_IMAGE'
    };
};

export const createSellItem = () => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const state = getState().createSell;
    const data = {...state}
    
    delete data.buyOrSell
    delete data.image
    if(data.itemType !== 'book') {
        delete data.isbn
        delete data.author
        delete data.courseNum
        delete data.classCategory
    }
    if(state.image !== '') {
        data['numImages'] = state.image.length;
    }
    const email = firebase.auth().currentUser.email;
    const displayName = firebase.auth().currentUser.displayName;
    data['email'] = email;
    data['displayName'] = displayName;
    data['timeOfCreation'] = firebase.firestore.Timestamp.now();
    
    firebase.firestore().collection(state.buyOrSell === 'sell' ? 'sell' : 'buy').add(data).then((doc) => {
        /*if(state.image !== ''){
            for(let i = 0; i < state.image.length; i++){
                const imageType = state.image[i]['type'].substring(6);
                firebase.storage().ref(`images/${doc.id + i + '.' + imageType}`).put(state.image[i])
            }
        }
        */
        dispatch({ type: 'CREATE_SELL_ITEM' });
    });
};
