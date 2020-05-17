import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import {useSelector, useDispatch} from 'react-redux';
import * as itemActions from '../redux/actions/itemActions';
import './styles/Item.css';
import { Link, useParams } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'

/**
 * This component is the display for a single item where
 * all the general information is provided for the user
 * and there is a link to look at that user's listings
 * (either requests or sellings).
 */
const Item = () => {
    const firebase = useFirebase();
    const dispatch = useDispatch();
    const items = useSelector(state => state.list.items);
    const selectedItem = useSelector(state => state.item);
    const [imageUrls, changeImageUrls] = React.useState([]);
    const [liked, changeLikeStatus] = React.useState(null);
    
    // on initialization, reset to not being loaded
    React.useEffect(() => {
        dispatch(itemActions.resetState());
        changeImageUrls([]);
    }, [])
    // url parameters
    const {item : itemID, type: requestOrSell} = useParams()

    // if the item has not been loaded, then load the item
    if(!selectedItem.isLoaded){
        // First check to see if item was already in listReducer.
        // If it is, then load the item info from redux since
        // there is no need for an additional read in firestore.
        let contains = false;
        for(let i = 0; i < items.length; i++){
            if(items[i].id === itemID){
                contains = true;
                dispatch(itemActions.loadItemDetails(items[i]))
                break;
            }
        }
        // If listReducer did not have the item, then check to
        // see if item is in firestore. If it is, then load it.
        // Otherwise the item was not found.
        if(!contains){
            dispatch(itemActions.checkFirestore(itemID, requestOrSell))
        }
    }

    /**
     * This method loads the image urls from firebase storage
     */
    const loadImageUrls = async () => {
        const imgArray = [];
        if (selectedItem.item.numImages === 0) {
            let singleUrl = await firebase.storage().ref(selectedItem.item.itemType + '.png').getDownloadURL();
            singleUrl = singleUrl.toString();
            imgArray.push(singleUrl)
        } else {
            for (let index = 0; index < selectedItem.item.numImages; index++) {
                let imgUrl = await firebase.storage().ref(`${itemID}/${index}`).getDownloadURL()
                imgUrl = imgUrl.toString()
                imgArray.push(imgUrl)
            }
        }
        changeImageUrls(imgArray)
    }

    if(selectedItem.item && imageUrls.length === 0){
        loadImageUrls()
    }

    if(selectedItem.item && liked === null){
        changeLikeStatus(selectedItem.item.usersLike.includes(firebase.auth().currentUser.uid))
    }
    
    /**
     * This method adds the item to the user's favorites
     */
    const addToFavorites = () => {
        changeLikeStatus(true)
        firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(itemID).get().then(async (doc) => {
            const data = {...doc.data()}
            data.usersLike.push(firebase.auth().currentUser.uid)
            await firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(itemID).update(data)
            
        })
    }

    /**
     * This method removes the item from the user's favorites
     */
    const removeFromFavorites = () => {
        changeLikeStatus(false)
        firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(itemID).get().then(async (doc) => {
            const data = {...doc.data()}
            data.usersLike = data.usersLike.filter(user => user !== firebase.auth().currentUser.uid);
            await firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(itemID).update(data)
            
        })
    }

    return (
        <div>
            <NavBar/>
            <div className={"text-left"}>
                <h4 className={"mt-4 ml-4"}><Link to={`/search`} className={"text-decoration-none"}>&larr; Back</Link></h4>
            </div>
            {/*If the item has not been loaded from listReducer
            or has not been looked for in firebase, return nothing.
            The second turnary is if the item has been loaded (meaning
            that it has been found), load the item info. If the item
            does not exist in firestore, the return a message saying
            that the item was not found*/}
            {selectedItem.isLoaded ? (
                selectedItem.item ? (
                    <div className={"container text-left mt-4 w-75"} id={"item-div"}>
                        <div className="row">
                            <div className={"col-sm"}>
                                <h1>{selectedItem.item.title}</h1>
                            </div>
                            <div className={"col-sm text-right"}>
                                <Link to={`/list/${requestOrSell}/${selectedItem.item.uid}`} className={"btn btn-outline-primary rounded-pill mb-2 mr-2"}>
                                    View User's {requestOrSell === 'sell' ? 'Items' : 'Requests'}
                                </Link>
                                {selectedItem.item.uid !== firebase.auth().currentUser.uid ?
                                    <button onClick={liked ? removeFromFavorites : addToFavorites} className={"border rounded-circle outline-none border-grey"}>
                                        <div className={"px-1 py-1"}>{liked ? <h5 className={"m-0 pt-small"}><i className="fa fa-heart color-red"></i></h5>
                                            : <h5 className={"m-0 pt-small"}><i className="fa fa-heart-o" aria-hidden="true"></i></h5>}
                                        </div>
                                    </button> : null}
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className={"col-sm"}>
                                <h4>Creator of Post: {selectedItem.item.displayName}</h4>
                                <h4>Contact Info: {selectedItem.item.email}</h4>
                                <h4>Price: ${selectedItem.item.price}</h4>
                                {selectedItem.item.description === '' ? null : <h4>Details: {selectedItem.item.description}</h4>}
                                <h4>Condition: {selectedItem.item.condition}</h4>
                                {selectedItem.item.itemType === 'book' ? (
                                    <React.Fragment>
                                        <h4>Course: {selectedItem.item.classCategory.toUpperCase()} {selectedItem.item.courseNum}</h4>
                                        <h4>ISBN: {selectedItem.item.isbn}</h4>
                                    </React.Fragment>
                                ) : null}
                            </div>
                            <div className={"col-sm text-right"}>
                                {imageUrls.map(url => {
                                    return (
                                        <img src={url} key={url} className={"mx-2 my-2 border rounded width-40 zoom-on-hover"}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ) : <h1>Item not found</h1>
            ) : null}
            <Footer/>
        </div>
    )
}


export default Item