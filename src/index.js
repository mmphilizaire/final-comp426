import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import {App, Login, SignUp, Play, LeaderBoard} from './App';

ReactDOM.render(
  <HashRouter>
     <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/play" component={Play}/>
        <Route exact path="/leaderboard" component={LeaderBoard}/>
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);

