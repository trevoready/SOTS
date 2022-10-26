import React from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Col, Container, Table, Form } from 'react-bootstrap';
import client from '../pbconn';
import { Navigate } from 'react-router-dom';

export default function SubPart() {
    const {id} = useParams();
    const { currentUser } = useAuth()
    const subpartidRef = React.useRef()
    const subpartnameRef = React.useRef()
    const subpartdescRef = React.useRef()
    const subpartunitRef = React.useRef()
    const subpartminqtyRef = React.useRef()
    React.useEffect(() => {
        getSubPart()
    }, [])
    if (!currentUser) {
        return <Navigate to='/' />
    }
    async function getSubPart() {
        const subPart = await client.records.getOne('subparts', id)
        subpartidRef.current.value = subPart.id
        subpartnameRef.current.value = subPart.name
        subpartdescRef.current.value = subPart.description
        subpartunitRef.current.value = subPart.unit
        subpartminqtyRef.current.value = subPart.min_qty
    }

  return (
    <>
        <Container style={{ minHeight: "100vh", paddingTop: "10px"}}>
          <Col md={12} lg={6}>
            <Card>
                <Card.Header>
                    <h2 style={{display:"inline"}}>Sub Part</h2>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group id="subpart_id">
                            <Form.Label>Sub Part ID</Form.Label>
                            <Form.Control type="text" ref={subpartidRef} disabled />
                        </Form.Group>
                        <Form.Group id="subpart_name">
                            <Form.Label>Sub Part Name</Form.Label>
                            <Form.Control type="text" ref={subpartnameRef} />
                        </Form.Group>
                        <Form.Group id="subpart_desc">
                            <Form.Label>Sub Part Description</Form.Label>
                            <Form.Control type="text" ref={subpartdescRef} />
                        </Form.Group>
                        <Form.Group id="subpart_unit">
                            <Form.Label>Sub Part Unit</Form.Label>
                            <Form.Control type="text" ref={subpartunitRef} />
                        </Form.Group>
                        <Form.Group id="subpart_min_qty">
                            <Form.Label>Sub Part Min Qty</Form.Label>
                            <Form.Control type="text" ref={subpartminqtyRef} />
                        </Form.Group>
                        <Button className="w-100" type="submit">
                            Update Sub Part
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            </Col>
        </Container>
    </>
  )
}
