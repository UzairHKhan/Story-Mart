import { Col, Container, Image, Row, Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import image from '../../images/apple watch.jpeg';
import VarientName from "./varientName/varientName";
import { subQuantity, addQuantity, addCart } from "../../redux/stateCart";
import { nanoid } from "@reduxjs/toolkit";
import { getLoggedInUser } from "../../../helpers/localstorage.helper";

function ProductDisplay() {
    const pram = useParams();
    const productDisplay = useSelector((state) => state.Products.data);
    const CartCount = useSelector((state) => state.CartProducts.data);
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(productDisplay[+pram.id].price)
    const [variantPrices, setVariantPrices] = useState({})
    const [variantName, setVariantName] = useState([])

    const user = getLoggedInUser()
    const navigate = useNavigate()
    useEffect(() => {
        user.id ? navigate(`/home/product/${+pram.id}`) : navigate('/login')
    }, [])

    useEffect(() => {
        let variantPrice = {}
        productDisplay[+pram.id].varients.forEach((variant) => {
            variantPrice[variant.type] = 0
        })
        setVariantPrices(pre => {
            return { ...variantPrice };
        })
    }, [])



    const changePrice = (obj) => {

        variantPrices[obj.type] = obj.price;

        let total = productDisplay[+pram.id].price

        for (let key in variantPrices) {
            total += variantPrices[key]
        }
        setTotalPrice(total);
    }
    const addToCart = () => {
        return (
            {
                name: productDisplay[+pram.id].name,
                price: totalPrice,
                id: nanoid(),
                productId: productDisplay[+pram.id].id,
                variantName,
                quantity: 1
            }
        )
    }

    const indexOfCartProduct = CartCount.findIndex(item => {
        if (item.productId === productDisplay[+pram.id].id) {
            let isSame = false;

            isSame = !item.variantName.some((variant, idx) => variant !== variantName[idx]);

            return isSame;
        }
        return false
    })


    return (
        <Container className="p-dispaly">
            <Row>
                <Col sm={2}>
                    <Image src={image} roundedCircle height="200px" weight="200px" alt="img" />
                </Col>
                <Col sm={8}>
                    <h2>
                        Category: {productDisplay[+pram.id].category}
                    </h2>
                    <h4>
                        Name: {productDisplay[+pram.id].name}
                    </h4>
                    <h5>
                        Rs: {totalPrice}
                    </h5>
                </Col>
                <Col sm={2}>
                    {user.admin ? <></>
                    :
                    indexOfCartProduct >= 0 ?
                        <ButtonToolbar aria-label="Toolbar with Button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button
                                    variant="outline-info"
                                    onClick={() => dispatch(subQuantity({ index: indexOfCartProduct }))}
                                >
                                    -
                                </Button>
                                <Button
                                    variant="info"
                                    disabled
                                >
                                    {CartCount[indexOfCartProduct].quantity}
                                </Button>
                                <Button
                                    variant="outline-info"
                                    onClick={() =>
                                        dispatch(addQuantity({ index: indexOfCartProduct }))
                                    }
                                >
                                    +
                                </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                        :
                        <Button
                            variant="outline-info"
                            disabled={!(variantName.length)}
                            onClick={() => dispatch(addCart(addToCart()))}
                        >Add to Cart</Button>
                    }
                </Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    {
                        <VarientName
                            productDisplay={productDisplay[+pram.id]}
                            changePrice={changePrice}
                            variantName={(value, index) => {
                                setVariantName((prev) => {
                                    const clone = [...prev]
                                    clone[index] = value
                                    return clone
                                })
                            }
                            }
                        />
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default ProductDisplay;