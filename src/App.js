import React, { useState,useEffect, createContext } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login/login';
import ProtectedRoute from './components/ProtectedRoute/protectedRoute';
import Navigation from './components/Navbar/navbar';
import Register from './components/Register/register';
import Dashboard from './components/Dashboard/dashboard';
import SendMessage from './components/SendMessage/sendMessage';
import { auth } from './configs/firebase';
import { Spinner } from 'react-bootstrap';
import About from './components/About/about';
import Home from './components/Home/home';

export const AuthContext = createContext();

function App() {

  console.log("App Rendered!")

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unsubscribeFromAuth = null;
    setLoading(true)
    unsubscribeFromAuth = auth.onAuthStateChanged(user => {
        if(user)
          setUser(user)
        else
          setUser(null)
        setLoading(false)
    });

    return () => unsubscribeFromAuth();
  }, [])

  return (
    <AuthContext.Provider value={user}>
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
            </Switch>
          </div>
          </>
        )
      }
    </AuthContext.Provider>
  );

}

export default App;
