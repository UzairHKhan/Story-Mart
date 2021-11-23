import { Form, Col, Row, Button } from "react-bootstrap"
import { useState, useEffect } from 'react';


function OptionField({ index, onChange, deleteOptions, id }) {

    const [valueOption, setValueOption] = useState({
        name: '',
        price: '',
        id
    });

    const handleChange = (e) => {
        let value = e.target.value;
        if (e.target.name === 'price') {
            value = +value
        }

        setValueOption(val => {
            const clone = { ...val }
            clone[e.target.name] = value;
            return clone
        })
    }


    useEffect(() => {
        onChange(valueOption);
    }, [valueOption]);

    return (
        <Form.Group as={Row} className="mb-3" key={index}>
            <Form.Label column sm={1}>
            </Form.Label>
            <Form.Label column sm={1}>
                Name
            </Form.Label>
            <Col sm={2} >
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => handleChange(e)}
                />
            </Col>
            <Form.Label column sm={1}>
                Price
            </Form.Label>
            <Col sm={2}>
                <Form.Control
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={(e) => handleChange(e)}
                />
            </Col>
            <Col sm={2}>
                <Button
                    variant="outline-danger"
                    onClick={() => deleteOptions(index)}
                >
                    Delete Options</Button>
            </Col>
        </Form.Group>
    );
}

export default OptionField;