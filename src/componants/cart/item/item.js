import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, ButtonToolbar, Button, Row, Col } from "react-bootstrap";
import { subQuantity, addQuantity, removeCart } from "../../redux/stateCart"

function Item({ item, index }) {

    const dispatch = useDispatch();
    const CartCount = useSelector((state) => state.CartProducts.data);

    const amount = useMemo(() => {
        return item.price * item.quantity
    }, [item.quantity])


    return (
        <>
            <Row mb={3}>
                <Col sm={2}>
                    {item.name}
                </Col>
                <Col sm={2}>
                    {item.variantName.map((val, index) =>
                        <Row key = {`${index}-${val}`}>
                            {val}
                        </Row>
                    )}
                </Col>
                <Col sm={6}>
                    <ButtonToolbar
                        aria-label="Toolbar with Button groups"
                    >
                        <ButtonGroup className="me-2" aria-label="First group">
                            <Button
                                variant="outline-secondary"
                                onClick={() => dispatch(subQuantity({ index }))}
                            >-
                            </Button>
                            <Button
                                variant="secondary"
                                disabled
                            >{CartCount[index].quantity}
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={() => dispatch(addQuantity({ index }))}
                            >+
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup aria-label="Second group">
                            <Button
                                variant="outline-secondary"
                                disabled
                            >x Rs.{item.price}
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={() => dispatch(removeCart({ index }))}
                            >Delete
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
                <Col>
                    Rs.{amount}
                </Col>
            </Row>
            <br />
        </>
    )
}

export default Item