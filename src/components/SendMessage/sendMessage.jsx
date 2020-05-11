import React, { useEffect, useState, useRef } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { firestore } from '../../configs/firebase'
import noBgicon from "../../assets/images/noBg_icon.jpg"
import loveicon from "../../assets/images/love_icon.jpg"
import angryicon from "../../assets/images/angry_icon.jpg"
import thinkicon from "../../assets/images/think_icon.jpg"
import liticon from "../../assets/images/lit_icon.jpg"
import mockicon from "../../assets/images/mock_icon.jpg"

function SendMessage() {

    let { username } = useParams()

    const inputRef = useRef(null)

    const [userInfo, setUserInfo] = useState({
        name: "",
        error: false
    })
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState(false)
    const [sentStatus, setSentStatus] = useState("muted")
    const [bg, setBg] = useState("noBg")
    
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
            background: bg,
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

    function handleBgChange(e){
        setBg(e.target.id)
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
                                            <Form.Control placeholder="Enter your message here..." ref={inputRef} className={`fontDefault bgDefault ${bg}`} as="textarea" rows="8" spellCheck="false" required name="message"/>
                                        </Form.Group>

                                        <p>Select a background :</p>

                                        {/* <div className="container mb-2">
                                            <div className="row">
                                                <div onClick={handleBgChange} className="col text-center m-2 py-4 noBg rounded" id="noBg">
                                                </div> 
                                                <div onClick={handleBgChange} className="col text-center m-2 py-4 love rounded" id="love">
                                                </div>
                                                <div onClick={handleBgChange} className="col text-center m-2 py-4 angry rounded" id="angry">
                                                </div>   
                                            </div>
                                            <div className="row">
                                                <div onClick={handleBgChange} className="col text-center m-2 py-4 mock rounded" id="mock">
                                                </div>
                                                <div onClick={handleBgChange} className="col text-center m-2 py-4 lit rounded" id="lit">
                                                </div>
                                                <div onClick={handleBgChange} className="col text-center m-2 py-4 think rounded" id="think">
                                                </div> 
                                            </div>
                                        </div> */}

                                        <div className="d-flex flex-column mb-2">
                                            <div className="d-flex justify-content-around align-items-center mb-3">
                                                <img onClick={handleBgChange} id="noBg" className="rounded-circle" width="50px" height="50px" src={noBgicon} alt=""/>
                                                <img onClick={handleBgChange} id="love" className="rounded-circle" width="50px" height="50px" src={loveicon} alt=""/>
                                                <img onClick={handleBgChange} id="angry" className="rounded-circle" width="50px" height="50px" src={angryicon} alt=""/>  
                                            </div>
                                            <div className="d-flex justify-content-around align-items-center">
                                                <img  onClick={handleBgChange} id="mock" className="rounded-circle" width="50px" height="50px" src={mockicon} alt=""/>
                                                 <img onClick={handleBgChange} id="lit" className="rounded-circle" width="50px" height="50px" src={liticon} alt=""/>
                                                <img onClick={handleBgChange} id="think" className="rounded-circle" width="50px" height="50px" src={thinkicon} alt=""/>   
                                            </div>
                                        </div>

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
