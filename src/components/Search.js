import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, SearchBox, Hits, Pagination, RefinementList} from 'react-instantsearch-dom';
import {Link} from 'react-router-dom';
import './styles/Search.css';
import NavBar from './NavBar';
import {useSelector, useDispatch} from 'react-redux'
import {useFirebase} from 'react-redux-firebase';
import {switchSearch} from '../redux/actions'

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APPLICATION_ID, 
    process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_API_KEY
    );

const HitComponent = ({hit}) => {
    const requestOrSell = useSelector(state => state.categories.isSell)
    const firebase = useFirebase()
    const [liked, changeLikeStatus] = React.useState(hit.usersLike.includes(firebase.auth().currentUser.uid))

    const addToFavorites = () => {
        changeLikeStatus(true)
        firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(hit.objectID).get().then(async (doc) => {
            const data = {...doc.data()}
            data.usersLike.push(firebase.auth().currentUser.uid)
            await firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(hit.objectID).update(data)
            
        })
    }

    const removeFromFavorites = () => {
        changeLikeStatus(false)
        firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(hit.objectID).get().then(async (doc) => {
            const data = {...doc.data()}
            data.usersLike = data.usersLike.filter(user => user !== firebase.auth().currentUser.uid);
            await firebase.firestore().collection(requestOrSell ? 'sell' : 'request').doc(hit.objectID).update(data)
            
        })
    }
    return (
        <div className={"card"}>
            <div className={"container w-100 center-text"}>
                <img className="card-img-top w-50 pt-2" src={hit.imageUrl} alt="Card image cap" />
            </div>
            <div className="card-body text-left">
                <b><h4 className="card-title">{hit.title}</h4></b>
                <h5 className="card-text">${hit.price}</h5>
                {hit.uid !== firebase.auth().currentUser.uid ? <button onClick={liked ? removeFromFavorites : addToFavorites}>{liked ? 'Unlike' : 'Like'}</button> : null}
            </div>
            <div className="d-inline p-2 bg-primary text-white rounded-bottom-less">
                <Link className="text-decoration-none text-light" to={`/view/${hit.objectID}/${requestOrSell ? 'sell' : 'request'}`}>
                    See more &#8594;
                </Link>
            </div>
        </div>
    )
};

const Filters = () => {
    return (
        <React.Fragment>
            <div className={"container"}>
                <h5>Filters</h5>
                <RefinementList classCategory={"price"} withSearchBox/>
            </div>
        </React.Fragment>
    )
};

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
const Search = () => {
    const isSell = useSelector(state => state.categories.isSell);
    const firebase = useFirebase();
    return (
    <div>
        <NavBar/>
        <div className={"pt-4"}>
            <h4 className={"d-inline-block mr-3 border-bottom border-primary"}>
                <Link className="text-decoration-none text-primary" to={`/search`}>All {isSell ? 'Listings' : 'Requests'}</Link>
            </h4>
            <h4 className={"d-inline-block ml-3"}>
                <Link className="text-decoration-none text-muted" to={`/list/${isSell ? 'sell' : 'request'}/${firebase.auth().currentUser.uid}`}>My {isSell ? 'Listings' : 'Requests'}</Link>
            </h4>
        </div>
        <InstantSearch
            indexName={isSell ? 'sell' : 'request'}
            searchClient={searchClient}
        >
            <div className={"search-div"}>
                <SearchBox/>
            </div>
            <Filters/>
            <Content/>
        </InstantSearch>
    </div>
    );
};

export default Search