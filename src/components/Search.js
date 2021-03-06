import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, SearchBox, Hits, Pagination, Stats} from 'react-instantsearch-dom';
import {Link} from 'react-router-dom';
import './styles/Search.css';
import NavBar from './NavBar';
import Footer from './Footer';
import {useSelector} from 'react-redux'
import {useFirebase} from 'react-redux-firebase';

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APPLICATION_ID, 
    process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_API_KEY
    );

/**
 * This is the hit component which displays one item/result from
 * algolia
 * @param hit the result from algolia 
 */
const HitComponent = ({hit}) => {
    const firebase = useFirebase();
    const [liked, changeLikeStatus] = React.useState(hit.usersLike.includes(firebase.auth().currentUser.uid));
    const isSell = useSelector(state => state.categories.isSell)

    /**
     * This method adds an itmem to the user's favorites
     */
    const addToFavorites = () => {
        
        firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(hit.objectID).get().then(async (doc) => {
            const data = {...doc.data()};
            data.usersLike.push(firebase.auth().currentUser.uid);
            await firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(hit.objectID).update(data)
            changeLikeStatus(true);
        })
    };

    /**
     * This method removes an item from the user's favorites
     */
    const removeFromFavorites = () => {
        
        firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(hit.objectID).get().then(async (doc) => {
            const data = {...doc.data()};
            data.usersLike = data.usersLike.filter(user => user !== firebase.auth().currentUser.uid);
            await firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(hit.objectID).update(data)
            changeLikeStatus(false);
        })
    };
    const requestOrSell = useSelector(state => state.categories.isSell);
    return (
        <div className={"card card-rounded"}>
            {hit.uid !== firebase.auth().currentUser.uid ?
                <div className={"pt-2 pr-2 position-absolute right-0"}>
                    <button onClick={liked ? removeFromFavorites : addToFavorites} className={"border rounded-circle outline-none border-grey like-btn"}>
                        <div className={"px-1 py-1"}>
                            {liked ? <h6 className={"m-0 pt-small"}>
                                    <i className="fa fa-heart color-red"></i>
                                </h6>
                            : <h6 className={"m-0 pt-small"}>
                                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                                </h6>
                            }
                        </div>
                    </button>
                </div>
                : null}

            <div className={"container center-text card-height"}>
                <div className={"inner-div"}>
                    <img className="card-img-top w-50 pt-2 image-sizing" src={hit.imageUrl} />
                </div>
            </div>
            <div className="card-body text-left">
                <h4 className="card-title text-dark mb-0 card-image-overflow">{hit.title}</h4>
                <h5 className="card-text py-1 text-muted">{isSell ? null : 'Asking Price: '}${hit.price}</h5>
            </div>
            <div className="d-inline p-2 bg-primary text-white rounded-bottom-less">
                <Link className="text-decoration-none text-light" to={`/view/${hit.objectID}/${requestOrSell ? 'sell' : 'request'}`}>
                    See more &#8594;
                </Link>
            </div>
        </div>
    )
};

/**
 * This sub-component deals with making the hits displayed in
 * one area and also includes the pagination of the results
 */
const Content = () => {
    return (
        <React.Fragment>
            <div className={"container"}>
                <Hits hitComponent={HitComponent}/>
                <Pagination className={"mt-5 mb-5"} showLast/>
            </div>
        </React.Fragment>
    )
};

/**
 * This is the main component where the user can use
 * algolia's instant search
 */
const Search = () => {
    const isSell = useSelector(state => state.categories.isSell);
    const firebase = useFirebase();
    return (
    <div>
        <NavBar/>
        <div className={"main-content"}>
        <div className={"pt-4"}>
            <h4 className={"d-inline-block mr-4 border-bottom border-primary"}>
                <Link className="text-decoration-none text-primary" to={`/search`}>All {isSell ? 'Listings' : 'Requests'}</Link>
            </h4>
            <h4 className={"d-inline-block mr-4"}>
                <Link className="text-decoration-none text-muted" to={`/list/${isSell ? 'sell' : 'request'}/${firebase.auth().currentUser.uid}`}>My {isSell ? 'Listings' : 'Requests'}</Link>
            </h4>
            <h4 className={"d-inline-block mr-4"}>
                <Link className={"text-decoration-none text-muted"} to={`/list/${isSell ? 'sell' : 'request'}/favorites`}>Favorite {isSell ? 'Listings' : 'Requests'}</Link>
            </h4>
        </div>
        <InstantSearch
            indexName={isSell ? 'sell' : 'request'}
            searchClient={searchClient}
        >
            <div className={"search-div"}>
                <div className={"text-right w-75 pr-5"}>
                    <p className={"ais-Stats-text mb-1 tooltip-hover"}>Help <i class="fas fa-question-circle">
                        <span className="tooltiptext">Search for: Titles, ISBN #'s, Authors, Class Categories, Item Types</span>
                    </i>
                    </p>
                </div>
                <SearchBox />
            </div>
            <div className={"mt-2 mb-3"}>
                <Stats/>
            </div>
            <Content/>
        </InstantSearch>
        </div>
        <Footer/>
    </div>
    );
};

export default Search