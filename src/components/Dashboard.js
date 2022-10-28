import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Table } from 'react-bootstrap'
import client from '../pbconn'
import NewSubPart from '../modals/NewSubPart'
import NewOrder from '../modals/NewOrder'


export default function Dashboard() {
    const [subparts, setSubparts] = React.useState([])
    const [subPartModal, setSubPartModal] = React.useState(false)
    const [orderModal , setOrderModal] = React.useState(false)
    const [orders, setOrders] = React.useState([])
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        getSubparts();
        getOrders();
    }, [])
    if (!currentUser) {
        return <Navigate to='/' />
    }

    async function getSubparts() {
        const subPartsList = await client.records.getList('subparts', 1, 10, {
            sort : '-created'
        })
        const subPartsItems = subPartsList.items
        for (let index = 0; index < subPartsItems.length; index++) {
            const element = subPartsItems[index];
            const partStock = await client.records.getList('subpart_stock', 1, 50, {
                filter: 'subpart = "' + element.id + '"',
            });
            //add stock to subpart
            var partStockTotal = 0
            for (let index = 0; index < partStock.items.length; index++) {
                const element = partStock.items[index];
                partStockTotal += element.stock_qty
            }
            element.qty = partStockTotal
        }
        setSubparts(subPartsItems)
    }

    async function getOrders() {
        const ordersList = await client.records.getList('orders', 1, 10, {
            sort : '-due',
            expand: "customer"
        })
        const ordersItems = ordersList.items
        for (let index = 0; index < ordersItems.length; index++) {
            const element = ordersItems[index];
            element.customer = ordersItems[index]["@expand"].customer
        }
        setOrders(ordersItems)
    }

    
  return (
    <>
    <NewSubPart show={subPartModal} onHide={() => setSubPartModal(false)} />
    <NewOrder show={orderModal} onHide={() => setOrderModal(false)} />
        <Container style={{ minHeight: "100vh", paddingTop: "10px"}}>
            <Col md={12} lg={8}>
            <Card>
                <Card.Header>
                    <h2 style={{display:"inline"}}>Sub Parts</h2>
                    <Button onClick={() => setSubPartModal(true)} style={{float:"right"}} variant="primary">Add Sub Part</Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Sub Part ID</th>
                                <th>Sub Part Name</th>
                                <th>Sub Part Description</th>
                                <th>Sub Part Qty</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subparts && subparts.map((subpart) => (
                                <tr key={subpart.id}>
                                    <td>{subpart.id}</td>
                                    <td>{subpart.name}</td>
                                    <td>{subpart.description}</td>
                                    <td>{subpart.qty}</td>
                                    <td><Link to={'/subpart/' + subpart.id}>View</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            </Col>
            <Col md={12} lg={8}>
            <Card>
                <Card.Header>
                    <h2 style={{display:"inline"}}>Orders</h2>
                    <Button onClick={() => setOrderModal(true)} style={{float:"right"}} variant="primary">Add Order</Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Order Date</th>
                                <th>Order Status</th>
                                <th>Order Due</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customer.name}</td>
                                    <td>{order.created}</td>
                                    <td>{order.status}</td>
                                    <td>{order.due}</td>
                                    <td><Link to={'/order/' + order.id}>View</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            </Col>
        </Container>
    </>
  )
}
