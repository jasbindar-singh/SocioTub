import React, { useEffect, useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { firestore } from '../../configs/firebase'

function SendMessage() {

    let { username } = useParams()

    const [userInfo, setUserInfo] = useState({
        name: "",
        error: false
    })
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState(false)
    const [sentStatus, setSentStatus] = useState("muted")
    
    useEffect(() => {
        let _mounted = true;

        setLoading(true)

        firestore
        .collection("users")
        .where("username", "==", username)
        .get()
        .then(doc => {
            if(_mounted){
                setUserInfo({name: "User Not Found", error: true})
                doc.forEach(data => {
                    setUserInfo(data.data())
                })
                setLoading(false)
            }
        })
        .catch(err => {
            alert(err.message);
        })

        return () => _mounted=false

    }, [username])

    async function handleSubmit(e){
        
        e.preventDefault()

        setLoadingMessage(true)

        const { name, message } = e.target.elements;

        let messageRef = await firestore.collection(`users/${userInfo.id}/messages`).doc()
        
        let messageData = {
            message: message.value,
            sender: name.value || "Secret Friend",
            background: "url",
            id: messageRef.id,
            created: new Date()
        } 
        
        await messageRef
        .set(messageData)
        .then(() => {
            setLoadingMessage(false)
            setSentStatus("success")
            name.value = ""
            message.value = ""
        })
        .catch(err => {
            alert(err.message)
            setSentStatus("danger")
        })
    }

    return (
        <div className="py-5 px-5">
            { 
                loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <>
                        {
                            userInfo.error ? (
                                <div className="d-flex justify-content-center">
                                    <h2>User not found.</h2>
                                </div>
                                    
                            ) : (
                                <>
                                    <h5 className="mb-4">Go on, and send your secret message to {userInfo.name}</h5>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="formBasicName">
                                            <Form.Label>Your secret identity</Form.Label>
                                            <Form.Control type="text" placeholder="Optional" name="name"/>
                                        </Form.Group>

                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Enter your message</Form.Label>
                                            <Form.Control as="textarea" rows="3" spellCheck="false" required name="message"/>
                                        </Form.Group>

                                        <p><Form.Text className="text-muted">Your identity wont be shared so, don't take it as an advantage and send inappropriate message.
                                        Be someone's friend and make their day with your "secret" message.</Form.Text></p>

                                        {
                                            sentStatus === "muted" ? (
                                                <p className={`text-${sentStatus}`}></p>
                                            ) : (
                                                sentStatus === "success" ? (
                                                    <p className={`text-${sentStatus}`}>Message Sent.</p>
                                                ) : (
                                                    <p className={`text-${sentStatus}`}>Message not sent. Try again.</p>
                                                )
                                            )
                                        }

                                        <Button variant="primary" type="submit">
                                            {
                                                loadingMessage ? (
                                                    <>
                                                        <Spinner animation="border" size="sm" />
                                                        &nbsp;&nbsp;
                                                    </>
                                                ) : (
                                                    ""
                                                )
                                            }
                                            Send
                                        </Button>
                                    </Form>
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default SendMessage
