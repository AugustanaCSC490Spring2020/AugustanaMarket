import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, SearchBox, Hits, Pagination} from 'react-instantsearch-dom';
import {Link} from 'react-router-dom';
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
       <div>
        <h4>{hit.title}</h4>
        <Link to={`/view/${hit.objectID}/${requestOrSell ? 'sell' : 'request'}`}><button>View</button></Link>
    </div> 
    )
}

const Content = () => {
    return (
        <React.Fragment>
            <Hits hitComponent={HitComponent}/>
            <Pagination showLast/>
        </React.Fragment>
    )
}
const Search = () => {
    const isSell = useSelector(state => state.categories.isSell)
    const dispatch = useDispatch()
    return (
    <div>
        <NavBar/>
        <Link to='/search'onClick={() => dispatch(switchSearch())}>{isSell ? 'See Requests' : 'See Sellings'}</Link>
        <InstantSearch
            indexName={isSell ? 'sell' : 'request'}
            searchClient={searchClient}
        >
            <SearchBox/>
            <Content/>
        </InstantSearch>
    </div>
    );
}

export default Search