import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, withRouter, Route, Link, Switch } from "react-router-dom";

import Home from './pages/home';
import PationsList from './pages/pationslist';
import viewTocken from './pages/viewTocken';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/pationsList' component={PationsList} />
      <Route exact path='/viewTocken/:id' component={viewTocken} />
      </Switch>
  </Router>
 <p>** // - Hospitel Details - // **</p>
 </div>


  );
}

export default App;
