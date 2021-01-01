import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom'
import Home from './pages/Home';
import Favorites from './pages/Favorite';
import RecentItems from './pages/Recent';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SearchItem from './components/SearchItem/SearchItem';
import {FaBars} from 'react-icons/fa';
import {useGlobalContext} from './components/context';

function App() {
  let history = useHistory();
  const {showLinks, setShowLinks} = useGlobalContext();
  return (
    <div className='app'>
      <div className='app-container'>
        <Router>
          <SearchItem/>
          <NavBar/>
          <div className='line'></div>
          <Switch>
          <Route path="/recent">
              <RecentItems/>
            </Route>
            <Route path="/favorites">
              <Favorites/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;