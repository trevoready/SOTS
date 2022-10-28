import React from 'react'
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import client from '../pbconn'

export default function Order() {
    const {id} = useParams();
    const [customerID, setCustomerID] = React.useState('')
    const [customerName, setCustomerName] = React.useState('')
    const [customerAddress, setCustomerAddress] = React.useState('')
    const [customerPhone, setCustomerPhone] = React.useState('')
    const [customerEmail, setCustomerEmail] = React.useState('')
    const [orderDate, setOrderDate] = React.useState('')
    const [dueDate, setDueDate] = React.useState('')
    const [orderStatus, setOrderStatus] = React.useState('')


    React.useEffect(() => {
        getOrder()
    }, [])

    async function getOrder() {
        const order = await client.records.getOne('orders', id, {
            expand: 'customer'
            })
        console.log(order)
        setCustomerID(order["@expand"].customer.id)
        setCustomerName(order["@expand"].customer.name)
        setCustomerAddress(order["@expand"].customer.address)
        setCustomerPhone(order["@expand"].customer.phone)
        setCustomerEmail(order["@expand"].customer.email)
        setOrderDate(order.created)
        setDueDate(order.due)
        setOrderStatus(order.status)

    }
  return (
    <>
        <Container  style={{ minHeight: "100vh", paddingTop: "10px"}}>
            <Card>
                <Card.Header>
                    <h2 style={{display:"inline"}}>Order</h2>
                </Card.Header>
                <Card.Body>
                    <p>Order ID: {id}</p>
                    <p>Customer ID: {customerID}</p>
                    <p>Customer Name: {customerName}</p>
                    <p>Customer Address: {customerAddress}</p>
                    <p>Customer Phone: {customerPhone}</p>
                    <p>Customer Email: {customerEmail}</p>
                    <p>Order Date: {orderDate}</p>
                    <p>Due Date: {dueDate}</p>
                    <p>Order Status: {orderStatus}</p>
                </Card.Body>
            </Card>
        </Container>
    </>
  )
}
