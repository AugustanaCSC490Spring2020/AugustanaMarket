import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, SearchBox, Hits, Pagination} from 'react-instantsearch-dom';
import {Link} from 'react-router-dom';
import NavBar from './NavBar';

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APPLICATION_ID, 
    process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_API_KEY
    );

const HitComponent = ({hit}) => {
    return (
       <div>
        <h4>{hit.title}</h4>
        <Link to={`/view/${hit.objectID}/sell`}><button>View</button></Link>
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
    const [isSell, updateIsSell] = React.useState(true)
    return (
    <div>
        <NavBar/>
        <Link to='/search'onClick={() =>updateIsSell(!isSell)}>{isSell ? 'See Requests' : 'See Sellings'}</Link>
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