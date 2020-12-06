import React, { useContext } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/login';
import ProtectedRoute from './components/ProtectedRoute/protectedRoute';
import Navigation from './components/Navbar/navbar';
import Register from './components/Register/register';
import Dashboard from './components/Dashboard/dashboard';
import SendMessage from './components/SendMessage/sendMessage';
import { Spinner } from 'react-bootstrap';
import About from './components/About/about';
import Home from './components/Home/home';
import PageNotFound from './components/PageNotFound/pagenotfound';
import { AuthContext } from './contexts/authProvider';


function App() {

  const { loading } = useContext(AuthContext);
  
  return (
    <>
      {
        loading ? (
          <div className="fullLoader">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
          <Navigation/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/send/:username" component={SendMessage}/>
              <Route path='*' exact component={PageNotFound} />
            </Switch>
          </div>
          </>
        )
      }
    </>
  );

}

export default App;
