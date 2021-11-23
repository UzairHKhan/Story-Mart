import { Col, Image } from "react-bootstrap"
import { Link } from "react-router-dom";
import image from '../../images/apple watch series 5.jpeg';

function ProductItem({ name, price, index }) {
    return (
        <Col className="p-view"
        key = {index}
        as={Link}
        to={`/home/product/${index}`}>
            <Image src={image} height="100px" weight="100px" alt="img" />
            <h5>{name}</h5>
            <h5>{`Rs. ${price}`}</h5>
        </Col>
    )
}

export default ProductItem