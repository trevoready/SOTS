import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import client from '../pbconn'

export default function NewSubPart(props) {
    const nameRef = React.useRef()
    const descRef = React.useRef()
    const navigate = useNavigate()
    
    async function handleSubmit(e) {
        e.preventDefault()
        const subPart = {
            name: nameRef.current.value,
            description: descRef.current.value,
        }
        const part = await client.records.create('subparts', subPart)
        navigate('/subpart/' + part.id)
        props.onHide()
    }
        
  return (
    <Modal {...props}>
        <Modal.Header closeButton>
            <Modal.Title>Create a SubPart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>SubPart Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter SubPart Name" ref={nameRef} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>SubPart Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter SubPart Description" ref={descRef} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
  )
}
