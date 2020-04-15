export const changeItemType = (newItemType) => {
    return {
        type    : 'CHANGE_ITEM_TYPE',
        payload : newItemType
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

export const changeDescription = (newDescription) => {
    return {
        type    : 'CHANGE_DESCRIPTION',
        payload : newDescription
    };
};

export const setSellerID = (sellerID) => {
    return {
        type    : 'CHANGE_SELLER_ID',
        payload : sellerID
    };
};

export const createSellItem = (itemType) => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const state = getState().createSell;

    firebase.firestore().collection('sell').doc(itemType).collection(itemType + 'Listings').add(state).then((doc) => {
        dispatch({ type: 'CREATE_SELL_ITEM' });
    });
};
