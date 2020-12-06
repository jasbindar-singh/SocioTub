import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
import { Row, Col, Spinner, Modal, Button, InputGroup, Form } from 'react-bootstrap'
import Message from '../Message/message'
import { firestore } from '../../configs/firebase'
import { AuthContext } from '../../contexts/authProvider'

function Dashboard() {

    const { user } = useContext(AuthContext);

    const linkRef = useRef(null);

    const [ messages, setMessages ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [show, setShow] = useState(false);
    const [deleteID, setDeleteID] = useState(null);
    const [copySuccess, setCopySuccess] = useState("Copy");
    const [username, setUsername] = useState(null);

    useEffect(() => {
        async function fetchData(){

            let messageArray = []
            setLoading(true)

            await firestore
            .collection("users")
            .doc(user.uid)
            .get()
            .then(doc => {
                setUsername(doc.data().username)
            })
            .catch(err => {
                alert(err)
            })

            await firestore
            .collection(`users/${user.uid}/messages`)
            .orderBy("created", "desc")
            .get()
            .then(data => {
                data.forEach(doc => {
                    messageArray.push(doc.data())
                })

                setMessages([...messageArray])
                setLoading(false)

            })
            .catch(err => {
                alert(err.message)
            })
        }

        fetchData()
    }, [user])

    const handleClose = () => {
        setShow(false);
        setDeleteID(null)
    }
    const handleShow = useCallback(() => setShow(true), []);

    const getID = useCallback(function(id){
        setDeleteID(id);
    }, [])

    async function handleDelete(){
        if(!!deleteID){
            await firestore
            .collection(`users/${user.uid}/messages`)
            .doc(deleteID)
            .delete()
            .then(() => {
                setMessages(messages.filter(message => message.id !== deleteID))
                handleClose()
            })
            .catch(err => {
                alert(err.message)
            })
        }
    }

    function copyToClipboard(e){
        linkRef.current.select();
        document.execCommand('copy');
        e.target.focus()
        setCopySuccess('Copied!');
    }

    return (
        <div className="py-5 px-5">
            <h1 className="mb-4">Dashboard</h1>
            {
                    loading ? (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" />
                        </div>
                ) : (
                    <>
                        <small className="text-muted sm">Share your link with everyone to receive secret message.!</small>
                        <InputGroup className="mb-3">
                            <Form.Control
                                ref={linkRef}
                                value={`${window.location.origin}/send/${username}`}
                                readOnly="readonly"
                            />
                            <InputGroup.Append>
                                <Button variant="primary" onClick={copyToClipboard}>{copySuccess}</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {
                            messages.length ? (
                                <>
                                    <Row xs={1} sm={1} md={2}>
                                        {
                                            messages.map(message => {
                                                return (
                                                    <Col key={message.id}>
                                                        <Message message={message} handleShow={handleShow} getID={getID}/>
                                                    </Col>
                                                );
                                            })
                                        }
                                    </Row>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Delete</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure, you want to delete this message?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                No
                                            </Button>
                                            <Button variant="primary" onClick={handleDelete}>
                                                Yes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            ) : (
                                <p className="text-dark">You dont have any messages till now.</p>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default Dashboard
