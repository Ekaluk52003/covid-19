import React from 'react';
import {BrowserRouter,Route, Switch } from 'react-router-dom'
import QuizzBee from './components/QuizzBee'
import Graph from './components/Graph'
import Style from './style.css'

function App() {
  return (
    <div className="App">

        <BrowserRouter>
          <Switch>
          <Route component={QuizzBee} exact path="/" />
          <Route component={Graph} exact path="/Graph" />
          </Switch>
        </BrowserRouter>
        
      
    </div>
  );
}

export default App;
