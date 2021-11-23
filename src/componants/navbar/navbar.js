import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import { getLoggedInUser, setLoggedInUser } from '../../helpers/localstorage.helper';


function NavBarCart() {

  const navigate = useNavigate()
  const user = getLoggedInUser()

  const handleClick = () => {
    setLoggedInUser({})
    navigate('/login')
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Story-Mart</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/home'>Home</Nav.Link>
          {user.admin &&
          <Nav.Link as={Link} to='/add-product'>Add Product</Nav.Link>
          }
          {user.admin === false &&
          <Nav.Link as={Link} to='/cart'>Cart</Nav.Link>
          }
        </Nav>
        <Nav>
          <NavDropdown menuVariant="dark" title={`${user.firstName} ${user.lastName}`} id="collasible-nav-dropdown">
            <NavDropdown.Item disabled > {`${user.firstName} ${user.lastName}`} </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleClick()}>Sign Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBarCart;