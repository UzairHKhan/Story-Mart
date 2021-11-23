import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getLoggedInUser } from "../../helpers/localstorage.helper";
import { productAdd } from "../redux/state";
import VarientField from "./varientField/varientField";

function ProductForm() {

    const dispatch = useDispatch();

    const user = getLoggedInUser()
    const navigate = useNavigate()
    useEffect(() => {
        user.id && user.admin ? navigate('/add-product') : navigate('/login')
    }, [])

    const [productValue, setProductValue] = useState(
        {
            category: 'Smart Watch',
            name: '',
            price: '',
            id: nanoid(),
            varients: []
        }
    )
    console.log(productValue)
    const handleChange = (e) => {
        let value = e.target.value;
        if (e.target.name === 'price') {
            value = +value
        }

        setProductValue(val => {
            const clone = { ...val }
            clone[e.target.name] = value;
            return clone
        })
    }
    const addButton = () => {
        dispatch(productAdd(productValue));
        setProductValue((pre) => ({
            ...pre,
            varients: []
        }))

    }
    const deleteVarient = (index) => {

        setProductValue((pre) => {
            const clone = { ...pre }
            const newArr = [...pre.varients]
            newArr.splice(index, 1);
            clone.varients = newArr;
            return clone;
        })

    }

    // console.clear()
    // useEffect(() => {
    // console.log(productValue)
    // }, [productValue])
    const categoryArr = ['Smart Watch', 'Cosmetics', 'Mobile Accessories', 'Others']

    return (
        <>
            <Container>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            Category
                        </Form.Label>
                        <Col sm={5}>
                            <Form.Select
                                name="category"
                                placeholder="Product Category"
                                onChange={(e) => handleChange(e)}
                            >
                                {categoryArr.forEach(val => { 
                                return <option>val</option>}
                                )}
                            </Form.Select>
                            {/* <Form.Control
                                type="text"
                                name="category"
                                placeholder="Product Category"
                                onChange={(e) => handleChange(e)}
                            /> */}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            Name
                        </Form.Label>
                        <Col sm={5}>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                onChange={(e) => handleChange(e)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            Price
                        </Form.Label>
                        <Col sm={5}>
                            <Form.Control
                                type="number"
                                name="price"
                                placeholder="Product Price"
                                onChange={(e) => handleChange(e)}
                            />
                        </Col>
                    </Form.Group>
                    {productValue.varients.map((varient, index) =>
                            <VarientField
                                key={varient.id}
                                index={index}
                                varient={varient}
                                inputVal={varient.type}
                                deleteVarient={deleteVarient}
                                onChange={(value) => {
                                    setProductValue((val) => {
                                        const clone = { ...val }
                                        clone.varients[index] = value;
                                        return clone
                                    })
                                }}
                            />
                    )}
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            Vareants
                        </Form.Label>
                        <Col sm={3}>
                            <Button
                                variant="outline-secondary"
                                onClick={() =>
                                    setProductValue((prev) => ({
                                        ...prev,
                                        varients: [...prev.varients, { type: "", options: [], id: nanoid() }]
                                    }))
                                }>
                                Add Varient
                            </Button>
                        </Col>
                    </Form.Group>
                    <br />
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={1}>
                            <Button
                                type="reset"
                                variant="outline-secondary"
                                onClick={() => addButton()}
                                disabled={!(productValue.category && productValue.name && productValue.price)}
                            >Add
                            </Button>
                        </Col>
                        <Col sm={1}>
                            <Button
                                variant="outline-danger"
                                type='reset'
                                onClick={() =>
                                    setProductValue((pre) => ({
                                        ...pre,
                                        varients: []
                                    }))}
                            >Reset
                            </Button>
                        </Col>
                        {/* <Col sm={2}>
                            <Button
                                variant="outline-secondary"
                                onClick={() =>
                                    setProductValue((prev) => ({
                                        ...prev,
                                        varients: [...prev.varients, { type: "", options: [] }]
                                    }))
                                }>
                                Add Varient
                            </Button>
                        </Col> */}
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export default ProductForm