import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

function AuthProvider(props) {

    const [user, setUser] = useState(null);

    function setCurrentUser(userData){
        setUser(userData)
    }

    function clearCurrentUser(){
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, setCurrentUser, clearCurrentUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
