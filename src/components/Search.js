import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, SearchBox, Hits, Pagination, Stats} from 'react-instantsearch-dom';
import {Link} from 'react-router-dom';
import './styles/Search.css';
import NavBar from './NavBar';
import Footer from './Footer';
import {useSelector, useDispatch} from 'react-redux'
import {useFirebase} from 'react-redux-firebase';
import {switchSearch} from '../redux/actions'

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APPLICATION_ID, 
    process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_API_KEY
    );

const HitComponent = ({hit}) => {
    const requestOrSell = useSelector(state => state.categories.isSell)
    return (
        <div className={"card card-rounded"}>
            <div className={"container center-text card-height"}>
                <img className="card-img-top w-50 pt-2 image-sizing" src={hit.imageUrl} />
            </div>
            <div className="card-body text-left">
                <h4 className="card-title text-dark mb-0">{hit.title}</h4>
                <h5 className="card-text py-1 text-muted">${hit.price}</h5>
            </div>
            <div className="d-inline p-2 bg-primary text-white rounded-bottom-less">
                <Link className="text-decoration-none text-light" to={`/view/${hit.objectID}/${requestOrSell ? 'sell' : 'request'}`}>
                    See more &#8594;
                </Link>
            </div>
        </div>
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
            <h4 className={"d-inline-block mr-3"}>
                <Link className="text-decoration-none text-muted" to={`/list/${isSell ? 'sell' : 'request'}/${firebase.auth().currentUser.uid}`}>My {isSell ? 'Listings' : 'Requests'}</Link>
            </h4>
            <h4 className={"d-inline-block mr-3"}>
                <Link className={"text-decoration-none text-muted"} to={`/list/${isSell ? 'sell' : 'request'}/favorites`}>Favorite {isSell ? 'Listings' : 'Requests'}</Link>
            </h4>
        </div>
        <InstantSearch
            indexName={isSell ? 'sell' : 'request'}
            searchClient={searchClient}
        >
            <div className={"search-div"}>
                <p>Searchable things: Titles, ISBN #s, Authors, Class Categories, Item Type</p>
                <SearchBox/>
                <Stats/>
            </div>
            <Content/>
        </InstantSearch>
        <Footer/>
    </div>
    );
};

export default Search