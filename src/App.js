import React from 'react';
import {BrowserRouter,Route, Switch } from 'react-router-dom'
// import QuizzBee from './components/QuizzBee'
// import Graph from './components/Graph'
import Style from './style.css'
import Loadable from 'react-loadable';


function Loading() {
  return <div className="Aligner"><h3>Loading...</h3></div>;
}

const QuizzBee = Loadable({
  loader: () => import('./components/QuizzBee'),
  loading: Loading,
});

const Graph = Loadable({
  loader: () => import('./components/Graph'),
  loading: Loading,
});



class App extends React.Component {
 // fake authentication Promise
 authenticate(){
  return new Promise(resolve => setTimeout(resolve, 1000)) // 2 seconds
}

componentDidMount(){
  this.authenticate().then(() => {
    const ele = document.getElementById('ipl-progress-indicator')
    if(ele){
      // fade out
      ele.classList.add('available')
      setTimeout(() => {
        // remove from DOM
        ele.outerHTML = ''
      }, 1000)
    }
  })

}
render() { return (
    <div className="App">

        <BrowserRouter>
          <Switch>
          <Route component={QuizzBee} exact path="/" />
          <Route component={Graph} exact path="/Graph" />
          </Switch>
        </BrowserRouter>
        
      
    </div>
  );
}}



export default App;
