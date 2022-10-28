import React from 'react'
import { Modal, Form, Button, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import client from '../pbconn'

export default function NewSubPart(props) {
    const [customerList, setCustomerList] = React.useState([])
    const [customerID, setCustomerID] = React.useState('')
    const customerRef = React.useRef()
    const dateRef = React.useRef()

    const navigate = useNavigate()  
    
    async function getCustomerList() {
        const customers = await client.records.getList('customers', 1, 5, {
            filter: 'name ~ "' + customerRef.current.value + '"',
        });
        setCustomerList(customers.items)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const order = {
            customer: customerID,
            due: dateRef.current.value,
            status: 'Pending'
        }
        const newOrder = await client.records.create('orders', order)
        navigate('/order/' + newOrder.id)
    }

  return (
    <Modal {...props}>
        <Modal.Header closeButton>
            <Modal.Title>Create an Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Customer Search</Form.Label>
                    <Form.Control type="text" placeholder="Enter Customer Name" ref={customerRef} onChange={() => getCustomerList()} />
                    <ListGroup>
                        { customerList && customerList.map((customer) => (
                            <ListGroup.Item action key={customer.id} onClick={() => {
                                setCustomerID(customer.id)
                                customerRef.current.value = customer.name
                                setCustomerList([])
                            }}>
                                {customer.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    { customerID && (
                    <Form.Text className="text-muted">
                        Customer ID: {customerID}
                    </Form.Text>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" ref={dateRef}/>
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
