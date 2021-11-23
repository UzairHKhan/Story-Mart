import { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getLoggedInUser } from "../../helpers/localstorage.helper";
import Item from "./item/item";


function Cart() {

    const addToCart = useSelector((state) => state.CartProducts.data);

    const user = getLoggedInUser()
    const navigate = useNavigate()
    useEffect(() => {
        user.id && user.admin === false ? navigate('/cart') : navigate('/login')
    }, [])

    const total = useMemo(() => {
        let amountTotal = 0
        addToCart.forEach((item) => {
            amountTotal += item.price * item.quantity
        })
        return amountTotal
    }, [addToCart])

    return (
        <>
            <Container>
                <h2> Cart </h2>
                {addToCart && addToCart.map((item, index) =>
                    <Item
                        key={item.id}
                        index={index}
                        item={item}
                    />
                )}
                <Row>
                    <Col sm={10}></Col>
                    <Col>
                        {addToCart.length ? `Total: Rs.${total}/-` : ''}
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Cart;