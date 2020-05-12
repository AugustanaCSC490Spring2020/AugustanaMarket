import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, SearchBox, Hits, Pagination} from 'react-instantsearch-dom';
import {Link} from 'react-router-dom';
import './styles/Search.css';
import NavBar from './NavBar';
import {useSelector, useDispatch} from 'react-redux'
import {switchSearch} from '../redux/actions'

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APPLICATION_ID, 
    process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_API_KEY
    );

const HitComponent = ({hit}) => {
    const requestOrSell = useSelector(state => state.categories.isSell)
    return (
        <div className={"card"}>
            <div className={"container w-100 center-text"}>
                <img className="card-img-top w-50 pt-2" src="../../textbook-example.png" alt="Card image cap" />
            </div>
            <div className="card-body text-left">
                <b><h4 className="card-title">{hit.title}</h4></b>
                <h5 className="card-text">${hit.price}</h5>
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
    const dispatch = useDispatch();
    return (
    <div>
        <NavBar/>
        <Link to='/search'onClick={() => dispatch(switchSearch())}>{isSell ? 'See Requests' : 'See Sellings'}</Link>
        <InstantSearch
            indexName={isSell ? 'sell' : 'request'}
            searchClient={searchClient}
        >
            <div className={"search-div"}>
                <SearchBox/>
            </div>
            <Content/>
        </InstantSearch>
    </div>
    );
};

export default Search