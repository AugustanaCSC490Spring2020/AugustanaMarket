import React from 'react';
import './App.css';
import {useSelector} from 'react-redux';
import {isLoaded} from 'react-redux-firebase';
import Router from './Router';

function AuthIsLoaded({children}) {
  const auth = useSelector(state => state.firebase.auth);
  if(!isLoaded(auth)) return <div>Loading...</div>;
  return children
}

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
