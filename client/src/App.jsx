import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home'
import Register from './components/Register';
import Login from './components/Login';
import Service from './components/Service';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreateListing from './components/CreateListing';


import {BrowserRouter, Route} from 'react-router-dom';
class App extends Component {

    render() {
    return (
        <BrowserRouter>
            <div>
            <Route path ='/' component={Home} exact/>
            <Route path ='/login' component={Login}/>
            <Route path='/register'  component={Register}/>
            <Route path='/service' component = {Service}/>
            <Route path='/homepage' component = {HomePage}/>
            <Route path='/signup' component = {SignUp}/>
            <Route path='/signin' component = {SignIn}/>
            <Route path='/createlisting' component = {CreateListing}/>

            </div>
        </BrowserRouter>
    );
  }
}

export default App;
