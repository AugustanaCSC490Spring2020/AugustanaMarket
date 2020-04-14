import React, { Component } from 'react';
import NavBar from './NavBar'
import {populate} from '../actions'
import {useSelector, useDispatch} from 'react-redux' 


const ItemList = () => {
    const itemList = useSelector(state => state.listReducer);
    const dispatch = useDispatch();
    if (!itemList.isLoaded) {
        dispatch(populate());
    }

    


    // const handleLoad = () => {
    //     let newState = [];
    //     const itemsRef = firebase.firestore().collection("items").doc("all-items").collection("books");

    //     itemsRef.get().then(documentSnapshot => {

    //         documentSnapshot.forEach(doc => {
    //         const item = doc.data();
    //         newState.push(item);
                
    //         })
    //         // for (let item in items) {
    //         //   newState.push({
    //         //     id: item,
    //         //     title: items[item].title,
    //         //     author: items[item].author,
    //         //     price: items[item].price,
    //         //     ISBN: items[item].isbn,
    //         //   });
            
          
    //     }).then(dispatch(populate(newState)));
        
    // }


    return( 
        <div>
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

/*class ItemList extends Component {

    constructor() {
      super();
      this.state = {
        title: "",
        author: "",
        price: "",
        ISBN: "",
        items: [],
      }
    }
  

  
  //Takes a snapshot of the books data from firestore, stores it into the items state
    componentDidMount() {
      const itemsRef = firebase.firestore().collection("items").doc("all-items").collection("books");
      itemsRef.get().then(documentSnapshot => {
        let newState = [];
        if (document.snapshot.exists) {
          let items = documentSnapshot.data;
          for (let item in items) {
            newState.push({
              id: item,
              title: items[item].title,
              author: items[item].author,
              price: items[item].price,
              ISBN: items[item].isbn,
            });
          }
        }
        this.setState({
          items: newState
        });
      });
    }



    //Dispatch statements

  
  
  //Displays navbar and every item in items state
    render() {
      return (
        <div>
          <header>
              <div className='wrapper'>
                <NavBar> </NavBar>   
              </div>
          </header>
          <div className='container'>
            <section className='display-item'>
                <div className="wrapper">
                  <ul>
                    {this.state.items.map((item) => {
                      return (
                        <li key={item.id}>
                          <h3>{item.title}</h3>
                          <p>Author: {item.author}
                            <button>See item details</button>
                          </p>
                        </li>
                      )
                    })}
                  </ul>
                </div>
            </section>
          </div>
        </div>
      );
    }
  }
  export default ItemList;
*/


