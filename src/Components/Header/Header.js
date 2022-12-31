import './Header.css'
import { Row, Col, Button, Form } from 'react-bootstrap';
import logo from '../media/logo.png'
import image from '../media/logo.svg'
import Article from '../Article/Article';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import SignIn from '../SignIn/Signin';

function Header() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // handle login    
    let login  = SignIn()

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [token, setToken] = useState(null)

    const handleUsername = (event) => {
        console.log(event.target.value)
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        console.log(event.target.value)
        setPassword(event.target.value)
    }

    const handleLogin = (event) => {
        event.preventDefault()
        let data;
        data = { 
            'username': username,
            'password': password,
        }
    
        fetch("http://127.0.0.1:8000/dj-rest-auth/login/", {method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify(data)}).then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                // handleMessage('Error, Try Again later')
                
            }else if(response.ok){
                localStorage.setItem('token', data['access_token'])
                setShow(false)
                setToken(true)
            }       
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken(false)
    }

    return (
        <div>
        <Row className='m-0'>
            <Col xs={4} className="p-2 text-start test-one h4 header-logo my-auto"><img className="App-logo" src={image}></img></Col>
            <Col xs={8} className="p-2 text-end my-auto text-one">
            <Button variant="link text-decoration-none text-black hover" className='d-inline' >{login ? <div onClick={handleLogout}>Logout</div>: <div onClick={handleShow}>Login</div>}</Button> 
            <Button variant="link text-decoration-none text-black hover" className='d-inline  ms-2'>Signup</Button></Col>
            <Col xs={12} className="logo p-0"><div className='overlay'><img src={logo} alt="logo" /></div></Col>
        </Row>
        <div className='text-three text-start h6 p-1 text-grey'>Incoporating dj-rest-auth with Django Rest Framework | Jan 2023 | Zahur Meerun</div>
        <Row className='m-0'>
            <Col className='d-none d-md-block col-md-2'></Col>
            <Col className='col-12 col-md-8'>
                <Row className='m-0'>
                    {Article()}
                </Row>
            </Col>
            <Col className='d-none d-md-block col-md-2'></Col>
        </Row>

        <Modal show={show} onHide={handleClose} onSubmit={handleLogin}>
            <Modal.Header  className='border-0' closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" name="username" placeholder="username" onChange={handleUsername} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handlePassword}/>
                </Form.Group>
                <Button variant="dark" type="submit" size="sm">
                    Submit
                </Button>
            </Form>
            </Modal.Body>
        </Modal>

    </div>
  );
}

export default Header;
