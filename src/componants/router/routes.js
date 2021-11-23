import {
    Routes,
    Route,
    Navigate
}
    from "react-router-dom";
import NavBarCart from '../navbar/navbar';
import ProductForm from "../add-products/product-form";
import Cart from "../cart/cart";
import Error404 from "../error404/error404";
import ProductGrid from "../home/product-grid/product-grid";
import ProductDisplay from "../home/productDisplay/productDisplay";
import LogIn from "../Log in/logIn";
import Register from "../register/register";


function RouterComp() {
    return (
        <Routes>

            <Route path='/' element={<Navigate replace to="/login" />} />

            <Route exact path='/home' element={<><NavBarCart /> <ProductGrid /></>} />
            <Route exact path='/add-product' element={<><NavBarCart /> <ProductForm /> </>} />
            <Route exact path='/cart' element={<><NavBarCart /> <Cart /> </>} />
            <Route exact path='/home/product/:id' element={<><NavBarCart /> <ProductDisplay /> </>} />
            <Route exact path='/login' element={<LogIn />} />
            <Route exact path='/register' element={<Register />} />
            <Route path='*' element={<Error404 />} />
        </Routes>
    )
}

export default RouterComp