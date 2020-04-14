export const changeItemType = (newItemType) => {
    return {
        type: 'CHANGE_ITEM_TYPE',
        payload: newItemType
    }
}

export const changeBuyOrSell = (newBuyOrSell) => {
    return {
        type: 'CHANGE_BUY_OR_SELL',
        payload: newBuyOrSell
    }
}
export const changeCategory = (newCategory) => {
    return {
        type: 'CHANGE_CATEGORY',
        payload: newCategory
    }
}
export const changeCourseNum = (newCourseNum) => {
    return {
        type: 'CHANGE_COURSE_NUM',
        payload: newCourseNum
    }
}
export const changeTitle = (newTitle) => {
    return {
        type: 'CHANGE_TITLE',
        payload: newTitle
    }
}
export const changePrice = (newPrice) => {
    return {
        type: 'CHANGE_PRICE',
        payload: newPrice
    }
}
export const changeIsbn = (newIsbn) => {
    return {
        type: 'CHANGE_ISBN',
        payload: newIsbn
    }
}

const createItem = (newCreateType) => {
    
}