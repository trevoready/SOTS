import React from 'react'
import { Button, Form, Modal, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import client from '../pbconn'


export default function NewStockItem(props) {
    const [locationID, setLocationID] = React.useState('')
    const [locationsList, setLocationsList] = React.useState([])
    const partID = props.subpartid
    const locationRef = React.useRef()
    const qtyRef = React.useRef()
    const purchase_price = React.useRef()

    const navigate = useNavigate()

    async function getLocations() {
        const locations = await client.records.getList('locations', 1, 5, {
            filter: 'name ~ "' + locationRef.current.value + '"',
        });
        setLocationsList(locations.items)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const purchase_price_per_unit = purchase_price.current.value / qtyRef.current.value
        const stockItem = {
            subpart: partID,
            location: locationID,
            stock_qty: qtyRef.current.value,
            purchase_price_per_unit: purchase_price_per_unit,
        }
        const newStockItem = await client.records.create('subpart_stock', stockItem)
        props.onHide()
    }
  return (
    <Modal {...props}>
        <Modal.Header closeButton>
            <Modal.Title>Add Stock Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                <Form.Label>Location</Form.Label>
                { !locationID && (
                    <>
                    <Form.Control type="text" placeholder="Enter Location" ref={locationRef} onChange={() => getLocations()} />
                    <ListGroup>
                        { locationsList && locationsList.map((location) => (
                            <ListGroup.Item action key={location.id} onClick={() => {
                                setLocationID(location.id)
                                locationRef.current.value = location.name
                                setLocationsList([])
                            }}>
                                {location.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    </>
                    )}
                    { locationID && (
                    <Form.Text className="text-muted">
                        Location ID: {locationID}
                    </Form.Text>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>QTY</Form.Label>
                    <Form.Control type="number" placeholder="Enter QTY" ref={qtyRef} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Purchase Price Of Added Amount</Form.Label>
                    <Form.Control type="number" placeholder="Enter Purchase Price" ref={purchase_price}/>
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
