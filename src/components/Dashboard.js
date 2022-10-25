import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Table } from 'react-bootstrap'
import client from '../pbconn'


export default function Dashboard() {
    const [subparts, setSubparts] = React.useState([])
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        getSubparts();
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
                filter: 'subpart >= "' + element.id + '"',
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

    
  return (
    <>
        <Container style={{ minHeight: "100vh", paddingTop: "10px"}}>
            <Col md={4}>
            <Card>
                <Card.Header>
                    <h2 style={{display:"inline"}}>Sub Parts</h2>
                    <Button style={{float:"right"}} variant="primary">Add Sub Part</Button>
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
                                <tr>
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
        </Container>
    </>
  )
}
