import React, { Component } from 'react';
import Routes from './components/Containers/routes';
import Footer from './components/Functional/footer';

import './App.css';


class App extends Component {
  render() {
    return (
      <div>
          <Routes />
          <Footer />
      </div>
    )}
}



export default App;
