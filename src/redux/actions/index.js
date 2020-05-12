/**
 * This is all the actions for redux located in one spot so that you
 * can import these actions without having to go into specific files
 */
export * from './listActions'
export * from './itemActions';
/**
 * This action is for the categoryReducer so that if the user switches
 * the type of search, the correct results occur
 */
export const switchSearch = () => {
    return {
        type : 'SWITCH_SEARCH'
    }
}
