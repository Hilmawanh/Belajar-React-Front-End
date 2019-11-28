import React, { Component } from 'react';
import './App.css';
import Header from'./components/header'
import Home from './pages/homepages'

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div style={{color:'blue'}}>
        <Header/>
        <Home/>
      </div>
     );
  }
}
 
export default App;

