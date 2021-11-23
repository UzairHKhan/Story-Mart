import { useEffect, useMemo, useState } from "react";
import { Form, Button, Container, Card, Col, Row, InputGroup, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, getRegisteredUsers, setLoggedInUser } from "../../helpers/localstorage.helper";



function LogIn() {

    const userArr = useMemo(() => {
        return getRegisteredUsers()
    }, [])

    let loggedInUser = getLoggedInUser()
    const navigate = useNavigate()
    useEffect(() => {
        loggedInUser.id ? navigate('/home') : navigate('/login')
    }, [])

    const [flagLogin, setLogIn] = useState(false)
    const [flag, setFlag] = useState(true)
    const [flagPass, setFlagPass] = useState(false)
    const [user, setUser] = useState(
        {
            email: '',
            password: ''
        }
    )
    const handleChange = e => {
        let value = e.target.value;

        setUser(val => {
            const clone = { ...val }
            clone[e.target.name] = value;
            return clone
        })
    }
    const handleOnClick = () => {

        if (
            user.email &&
            user.password
        ) {
            const found = userArr.find((item) => item.email === user.email && item.password === user.password)
            setLoggedInUser(found)
            {
                found ?
                    navigate('/home')
                    :
                    setLoggedInUser({})
                setLogIn(true)
            }
        }

        else {
            setFlag(false)
        }
    }

    return (
        <>
            {flagLogin &&
                <Container>
                    <Alert variant='danger'>
                        ERROR! invalid email or password
                    </Alert>
                </Container>
            }
            <Container className='login-card'>
                <Card border='light' bg='dark' style={{ width: '35rem' }}>
                    <Card.Header>
                        <strong>Log In</strong>
                    </Card.Header>
                    <Form>
                        <Card.Body>


                            <Form.Group className="mb-3" controlId="formBasicEmail" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name='email'
                                    placeholder="Enter email"
                                    isInvalid={!(user.email || flag)}
                                    onChange={(e) => { handleChange(e); setFlag(true); setLogIn(false) }}
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
                                        isInvalid={!(user.password || flag)}
                                        onChange={(e) => { handleChange(e); setFlag(true); setLogIn(false) }}
                                    />
                                    {flagPass ?
                                        <Button variant="outline-secondary" id="button-addon2" onClick={() => setFlagPass(false)}>
                                            Hide
                                        </Button>
                                        :
                                        <Button variant="outline-secondary" id="button-addon2" onClick={() => setFlagPass(true)}>
                                            Show
                                        </Button>
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        Password is Required
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Text className="text-muted">
                                        <Link to=''>Forgotten password?</Link>
                                    </Form.Text>
                                </Col>
                                <Col className='alg-right'>
                                    <Form.Text className="text-muted">
                                        No account?<span> </span>
                                        <Link to='/register'>Create one!</Link>
                                    </Form.Text>
                                </Col>
                            </Row>

                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Row className="login-btn">
                                <Button type='reset' variant="primary" onClick={() => handleOnClick()}>
                                    Log In
                                </Button>
                            </Row>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        </>
    )
}

export default LogIn;