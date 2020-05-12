import React from 'react';
import './App.css';
import {useSelector} from 'react-redux';
import {isLoaded} from 'react-redux-firebase';
import Router from './Router';

/**
 * This component is used to make sure that firebase
 * auth has been loaded. If it has not been loaded
 * yet, then the user gets a message saying loading.
 * Once the firebase auth has been loaded, then the
 * child components will be loaded instead.
 * @param children this is all the child components 
 */
function AuthIsLoaded({children}) {
  // source http://react-redux-firebase.com/docs/recipes/auth.html
  const auth = useSelector(state => state.firebase.auth);
  if(!isLoaded(auth)) return <div>Loading...</div>;
  return children
}
/**
 * This is the main component of the application
 * where all the different components get presented
 * based off of the url and firebase auth status
 */
function App() {
  return (
    <AuthIsLoaded>
      <div className="App">
       <Router/>
      </div>
    </AuthIsLoaded>
  )
    
}

export default App;
