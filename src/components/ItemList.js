import React from 'react';
import NavBar from './NavBar'
import {populate} from '../actions'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'; 


const ItemList = () => {
    const itemList = useSelector(state => state.list);
    const dispatch = useDispatch();
    if (!itemList.isLoaded) {
        dispatch(populate());
    }

    return( 
        <div>
          <NavBar/>
          <header>
              <div className='wrapper'>
              </div>
          </header>
          <div className='container'>
            <section className='display-item'>
                <div className="wrapper">
                  <ul>
                    {itemList.isLoaded ? itemList.items.map((item) => {
                      return (
                        <li key={item.id}>
                          <h3>{item.title}</h3>
                          <p>Author: {item.author}
                            <Link to={`/view/${item.id}`}><button>See item details</button></Link>
                          </p>
                        </li>
                      )
                    }) : null}
                  </ul>
                </div>
            </section>
          </div>
        </div>
      );
}

export default ItemList

