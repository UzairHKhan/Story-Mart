import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Form, Button, Container, Card, Col, Row, InputGroup, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, setRegisteredUsers, getRegisteredUsers } from "../../helpers/localstorage.helper";

function Register() {

    let loggedInUser = getLoggedInUser()
    let RegisteredUsers = getRegisteredUsers()
    const navigate = useNavigate()
    const [userArr, setUserArr] = useState(RegisteredUsers)
    useEffect(() => {
        loggedInUser.id ? navigate('/home') : navigate('/register')
    }, [])

    useEffect(() => {
        setRegisteredUsers(userArr)
    }, [userArr])

    const [flag, setFlag] = useState(true)
    const [regFlag, setRegFlag] = useState(false)
    const [flagPass, setFlagPass] = useState(false)
    const [registerUser, setRegisterUser] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            reTypePassword: '',
            admin: false,
            id: nanoid()
        }
    )
    const handleChange = e => {
        let value = e.target.value;
        if (e.target.name === 'admin') {
            setRegisterUser(val => ({
                ...val,
                admin: e.target.checked
            }))
        }
        else {
            setRegisterUser(val => {
                const clone = { ...val }
                clone[e.target.name] = value;
                return clone
            })
        }
    }

    const handleOnClick = () => {

        if (
            registerUser.firstName &&
            registerUser.lastName &&
            registerUser.email &&
            registerUser.password &&
            registerUser.password === registerUser.reTypePassword
        ) {
            setUserArr(pre => [...pre, registerUser])
            setRegFlag(true)
        }

        else {
            setFlag(false)
        }
    }
    return (
        <>
            {regFlag &&
                <Container>
                    <Alert variant='success'>
                        Account created as {registerUser.admin ? 'Admin' : 'User'}
                    </Alert>
                </Container>
            }
            <Container className='login-card'>
                <Card border='light' bg='dark' style={{ width: '35rem' }}>
                    <Card.Header>
                        <strong>Register</strong>
                    </Card.Header>
                    <Form>
                        <Card.Body>

                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    md="6"
                                >
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        isInvalid={!(registerUser.firstName || flag)}
                                        onChange={(e) => { handleChange(e); setFlag(true);setRegFlag(false) }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        First Name is Required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                >
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        isInvalid={!(registerUser.lastName || flag)}
                                        onChange={(e) => { handleChange(e); setFlag(true);setRegFlag(false) }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Last Name is Required
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Row>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name='email'
                                    placeholder="Enter email"
                                    isInvalid={!(registerUser.email || flag)}
                                    onChange={(e) => { handleChange(e); setFlag(true);setRegFlag(false) }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Email is Required
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type={flagPass ? "text" : "password"}
                                        name='password'
                                        placeholder="Password"
                                        isInvalid={!(registerUser.password || flag)}
                                        onChange={(e) => { handleChange(e); setFlag(true); setRegFlag(false) }}
                                    />
                                    {flagPass ?
                                        <Button variant="outline-secondary" id="button-addon2" onClick={() => setFlagPass(false)}>
                                            Hide
                                        </Button>
                                        :
                                        <Button
                                            variant="outline-secondary"
                                            id="button-addon2" onClick={() => setFlagPass(true)}
                                        >
                                            Show
                                        </Button>
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        Password is Required
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicRe-TypePassword">
                                <Form.Label>Re-type Password</Form.Label>
                                <Form.Control
                                    type={flagPass ? "text" : "password"}
                                    placeholder="Re-type Password"
                                    name="reTypePassword"
                                    onChange={(e) => { handleChange(e); setFlag(true); setRegFlag(false) }}
                                    isInvalid={registerUser.password !== registerUser.reTypePassword}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Password did not Match
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        name='admin'
                                        onChange={(e) => handleChange(e)}
                                        label="Admin"
                                    />
                                </Col>
                                <Col className='alg-right'>
                                    <Form.Text className="text-muted">
                                        Account exists?<span> </span>
                                        <Link to='/login'>Log In!</Link>
                                    </Form.Text>
                                </Col>
                            </Row>

                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Row className="login-btn">
                                <Button
                                    variant="primary"
                                    // type='reset'
                                    checked={registerUser.admin}
                                    onClick={() => handleOnClick()}
                                >
                                    Sign Up
                                </Button>
                            </Row>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        </>
    )
}

export default Register