import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Navigate from './components/Navigate';


class RouterContext extends Component{

   render(){
      return(
        <Router>
          <div>
             <Route exact path='/' component={Home} />
             <Route exact path='/navigate' component={Navigate} />
          </div>
        </Router>
      );
   }
}
export default RouterContext;