import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App';
import { auth } from '../../configs/firebase';
import { Redirect } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';

function Login(props) {

    const user = useContext(AuthContext);
    
    const [ loading, setLoading ] = useState(false);

    if(user){
        return <Redirect to="/dashboard" />
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)

        const {email, password} = e.target.elements;

        await auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then(user => {
            //Success
            setLoading(false)
            props.history.push("/dashboard");
        })
        .catch(err => {
            //Error
            alert(err.message)
            setLoading(false)
        })

    }

    return (
        <div className="py-5 px-5">
            <h1 className="mb-4">Login</h1>
            <h5 className="mb-3">Login to an existing acount on SocioTub.</h5>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                </Form.Group>

                <p className="text-muted">We'll never share your Credentials!</p>

                <Button variant="primary" type="submit">
                    {
                        loading ? (
                            <>
                                <Spinner animation="border" size="sm" />
                                &nbsp;&nbsp;
                            </>
                        ) : (
                            ""
                        )
                    }
                    Login
                </Button>
            </Form>
        </div>   
    )
}

export default Login
