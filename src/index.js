import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import {App, Login, SignUp, Play, LeaderBoard} from './App';

ReactDOM.render(
  <Router>
     <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/play" component={Play}/>
        <Route exact path="/leaderboard" component={LeaderBoard}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

