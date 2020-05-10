import React from 'react'
import { Card } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import deleteIcon from '@iconify/icons-mdi-light/delete';

function Message({message, index, handleShow, getID}) {
    return (
        <div>
            <Card style={{marginBottom: "20px"}}>
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <Card.Title>#{index + 1}</Card.Title>
                        <Icon id={message.id} icon={deleteIcon} style={{color: '#000', fontSize: '26px'}} onClick={e => {
                            handleShow()
                            getID(e.target.id)
                        }}/>
                    </div>
                    <Card.Text>
                        {message.message}
                    </Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">{message.sender}</Card.Subtitle>
                </Card.Body>
            </Card>
        </div>
    )
}

export default React.memo(Message)
