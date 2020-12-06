import React, {useContext} from 'react'
import {
    Navbar,
    Nav,
} from 'react-bootstrap'
import { Icon } from '@iconify/react';
import menuIcon from '@iconify/icons-mdi-light/menu';
import { auth } from '../../configs/firebase';
import { AuthContext } from '../../contexts/authProvider';
import { withRouter } from 'react-router-dom';

function Navigation(props) {

    const { user } = useContext(AuthContext);

    async function handleClick(){
        await auth
        .signOut()
        .then(() => {
            console.log("Logged Out!") 
        })
        .catch(err => {
            console.log(err.message)
        })
        props.history.push("/login")
    }

    return (
        <Navbar expand="lg" variant="dark" className="navigation">
            <div className="d-flex justify-content-between" style={{width: "170px"}}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" >
                    <Icon aria-controls="basic-navbar-nav" icon={menuIcon} style={{color: '#fff'}} width={26} height={26}/>
                </Navbar.Toggle>
                <Navbar.Brand href="/">SocioTub</Navbar.Brand>
            </div>
            
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {
                        !!user ? (
                            <>
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link href="/about">About</Nav.Link>
                                <Nav.Link onClick={handleClick}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                                <Nav.Link href="/about">About</Nav.Link>
                            </>
                        )
                    }
                </Nav>
            </Navbar.Collapse> 
        </Navbar>
    )
}

export default withRouter(Navigation)
