
import { useEffect } from 'react';
import { Row, Container} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getLoggedInUser } from '../../../helpers/localstorage.helper';
import DropDownList from '../dropdown/dropDownList';
import ProductItem from '../product/product';


function ProductGrid() {
    const user = getLoggedInUser()
    const navigate = useNavigate()
    const productGrid = useSelector((state) => state.Products.data);
    const productCategory = useSelector((state) => state.Products.categories);

    useEffect(() => {
        user.id ? navigate('/home') : navigate('/login')
    }, [])

    return (
        <Container>
            <DropDownList />
            <Row>
                {productGrid && productGrid.map((item, index) => (
                    (productCategory === 'All Category' || item.category === productCategory) &&
                        <ProductItem
                            key={index}
                            index={index}
                            name={item.name}
                            price={item.price}
                        />
                ))
                }
            </Row>
        </Container>
    );
}

export default ProductGrid;