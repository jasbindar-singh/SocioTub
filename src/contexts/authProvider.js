import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../configs/firebase';

export const AuthContext = createContext();

function AuthProvider(props) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


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

    function setCurrentUser(userData){
        setUser(userData)
    }

    function clearCurrentUser(){
        setUser(null)
    }

    const value = {
        user, setCurrentUser, clearCurrentUser, loading
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
