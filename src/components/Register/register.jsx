import React, { useState, useContext } from 'react'
import { Form, Button, InputGroup, Row, Col, Spinner } from 'react-bootstrap'
import { firestore, auth } from '../../configs/firebase';
import { Redirect, withRouter } from 'react-router-dom';
import { AuthContext } from '../../App';

function Register(props) {

    const user = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [isValidUsername, setIsValidUsername] = useState("muted")
    const [ loading, setLoading ] = useState(false);

    if(user){
        return <Redirect to="/dashboard" />
    }

    function handleChange(e){
        setIsValidUsername("muted")
        setUsername(e.target.value)
    }

    async function isUsernameUnique(){
        
        if(username.length > 6){
            await firestore
            .collection("users")
            .where("username", "==", username.toLowerCase().trim())
            .get()
            .then(doc => {
                setIsValidUsername("success");
                doc.forEach(data => {
                    if(data.exists)
                        setIsValidUsername("danger");
                    else
                        setIsValidUsername("success");
                })
            })
        }
        else
            alert("Username must be greater than 6 characters.")

    }

    function isPasswordMatching(password, cpassword){
        if(password === cpassword)
            return true;
        else
            return false;
    }

    async function handleSubmit(e){
        e.preventDefault()

        let { username, email, name, password, cpassword } = e.target.elements

        if(isValidUsername === "success"){
            if(isPasswordMatching(password.value, cpassword.value)){

                setLoading(true)

                await auth
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(user => {
                    let id = user.user.uid

                    let dataInfo = {
                        id,
                        username: username.value,
                        name: name.value,
                        email: email.value
                    }

                    firestore
                    .collection("users")
                    .doc(id)
                    .set(dataInfo)
                    .then(() => {
                        props.history.push("/dashboard")
                    })
                    .catch(err => {
                        alert(err.message)
                        setLoading(false)
                    })
                })
                .catch(err => {
                    setLoading(false)
                    alert(err.message)
                })
            }
            else
                alert("Password Not Matching.")
        }
        else
            alert("Username check required.")
    }
        

    return (
        <div className="py-5 px-5">
            <h1 className="mb-4">Register</h1>
            <h5 className="mb-3">Create a new acount on SocioTub.</h5>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="basic-url">Username</label>
                <InputGroup className="mb-3">
                    <Form.Control
                        name="username"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-url"
                        minLength={6}
                        maxLength={15}
                        onChange={handleChange}
                        required
                    />
                    <InputGroup.Append>
                        <Button onClick={isUsernameUnique} variant="primary">Check</Button>
                    </InputGroup.Append>
                </InputGroup>

                {
                    isValidUsername === "muted" ? (
                        <p className={`text-${isValidUsername}`}>Check username availability.</p>
                    ) : (
                        isValidUsername === "success" ? (
                            <p className={`text-${isValidUsername}`}>Username available.</p>
                        ) : (
                            <p className={`text-${isValidUsername}`}>Username not available.</p>
                        )
                    )
                }

                <Row>
                    <Col sm>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Enter name" />
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col sm>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" required minLength={6} />
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Group controlId="formBasicCPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control name="cpassword" type="password" placeholder="Confirm Password" required minLength={6} />
                        </Form.Group>
                    </Col>
                </Row>

                <p className="text-muted">We'll never share your Credentials!</p>
                <p className="text-muted">All the fields have limitation of Min - 6 and Max - 15 letters.</p>

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
                    Register 
                </Button>
            </Form>
        </div>
    )
}

export default withRouter(Register)
