import React from 'react';
import NavBar from './NavBar'
import {populate} from '../actions'
import {useSelector, useDispatch} from 'react-redux' 


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
                          <h3 key={item.title}>{item.title}</h3>
                          <p key={item.author}>Author: {item.author}
                            <button key={"button:" + item.id}>See item details</button>
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

