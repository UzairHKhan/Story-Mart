import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import OptionField from "../optionField/optionField";


function VarientField({ index, onChange, inputVal, deleteVarient, id }) {
    const [formValues, setFormValues] = useState({
        type: '',
        option: [],
        id
    });

    const handleChange = (e) => {
        let value = e.target.value;

        setFormValues(val => {
            const clone = { ...val }
            clone[e.target.name] = value;
            return clone
        })
    }
    useEffect(() => {
        onChange(formValues);
    }, [formValues]);

    const deleteOptions = (index) => {

        setFormValues((pre) => {
            const clone = { ...pre }
            const newArr = [...pre.option]
            newArr.splice(index, 1);
            clone.option = newArr;
            return clone;
        })

    }

    return (
        <>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm={2}>
                    Varient Name
                </Form.Label>
                <Col sm={2} >
                    <Form.Control
                        type="text"
                        name="type"
                        defaultValue={inputVal}
                        placeholder="Varient Name"
                        onChange={(e) => handleChange(e)}
                    />
                </Col>
                <Col sm={2}>
                    <Button
                        variant="outline-secondary"
                        onClick={() =>
                            setFormValues((val) => ({
                                ...val,
                                option: [...val.option, { name: '', price: '', id: nanoid() }]
                            })
                            )
                        }>
                        Add Option</Button>
                </Col>
                <Col sm={2}>
                    <Button
                        variant="outline-danger"
                        onClick={() => deleteVarient(index)}
                    >
                        Delete Varient</Button>
                </Col>
            </Form.Group>
            {formValues.option.map((val, index) =>
                <OptionField
                    key={val.id}
                    index={index}
                    id={val.id}
                    deleteOptions={deleteOptions}
                    onChange={(value) => {
                        setFormValues((val) => {
                            const clone = { ...val }
                            clone.option[index] = value;
                            return clone
                        })
                    }}
                />)}
        </>
    );
}

export default VarientField;