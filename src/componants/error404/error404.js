import { Card, Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"



function Error404() {
    return (
        <>
            <Container className='error404-card'>
                <Card border='light' bg='dark' style={{ width: '35rem' }}>
                    <Card.Header>
                       <h1> 404 </h1>
                    </Card.Header>
                    <Card.Body>
                        File not found
                        <br /><br />
                        The site configured at this address does not contain the requested file.
                        <br /><br />
                        If this is your site, make sure that the filename case matches the URL.
                        For root URLs (like http://example.com/) you must provide an index.html file.

                    </Card.Body>
                    <Card.Footer className="text-muted">
                    If you are trying to vist Story-Mart click on this button <Button variant="outline-primary" as={Link} to='/home' > Story-Mart </Button>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default Error404