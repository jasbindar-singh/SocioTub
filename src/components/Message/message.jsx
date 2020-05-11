import React, { useRef } from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import deleteIcon from '@iconify/icons-mdi-light/delete';
import downloadIcon from '@iconify/icons-mdi-light/download';
import htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

function Message({message, handleShow, getID}) {

    const cardRef = useRef(null)

    async function downloadImage(e){
        let target = cardRef.current;
        
        await htmlToImage.toBlob(target)
        .then(function (blob) {
            saveAs(blob, 'sociotub_ss.png');
        });
    }

    return (
        <div className="mb-4">
            <Card ref={cardRef} style={{height: "200px"}}>
                <Card.Body className={`d-flex justify-content-center align-items-center ${message.background}`}>
                    <Card.Text>
                        {message.message}
                    </Card.Text>
                </Card.Body>
            </Card>
            <div className="d-flex justify-content-between align-items-center">
                <div className="mt-2 ml-1">
                    <Card.Subtitle className="mb-2 text-muted">{message.sender}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted small">{message.created.toDate().toLocaleString()}</Card.Subtitle>
                </div>
                <ButtonGroup size="sm" className="mr-1">
                    <Button variant="outline-primary" alt="Download">
                        <Icon onClick={downloadImage} icon={downloadIcon} style={{fontSize: '26px'}} />
                    </Button>
                    <Button variant="outline-danger" alt="Delete">
                        <Icon id={message.id} icon={deleteIcon} style={{fontSize: '26px'}} onClick={e => {
                            handleShow()
                            getID(e.target.id)
                        }}/>
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default React.memo(Message)
