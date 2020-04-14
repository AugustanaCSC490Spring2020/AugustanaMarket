export const loadItem = (item) => {
    return {
        type: 'ITEM_LOADED',
        payload: item
    }
}