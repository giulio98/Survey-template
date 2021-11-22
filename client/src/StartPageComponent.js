import { MainPageNavbar } from "./NavbarComponents";
import { Container, Row, Col, InputGroup,Form} from "react-bootstrap";
import Figure from 'react-bootstrap/Figure'
import imageMain from './imageMain.jpg' ;
import { useState, useEffect} from "react";
import { Button } from "react-bootstrap";
const MainPage = (props) =>{
    const [username, setUsername] = useState('') ;
    const [usernameValidity, setUsernameValidity] = useState(true) ;
    const handleEnter = () => {
        let username_validity = true ;
        
        if(username === '') {
            username_validity = false ;
            setUsernameValidity(false) ;
        } ;
        if(username_validity){
            props.enterUser(username) ;
        }
    } ;
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `MainPage | Survey`;
      });
    return(
    <>
    <MainPageNavbar></MainPageNavbar>
    
    <Container>
    <Row className="vheight-90">
    <Col sm={6} as="aside" style={{textAlign:"left"}}>
        <div style={{fontFamily: "Arial,sans-serif", position:"absolute", top:"20%"}}>
        <h2 style={{ fontWeight:"bold", textAlign:"left"}}>Welcome to Survey !</h2>
        <br></br>
            <h5 style={{ fontWeight:"bold", textAlign:"left", color:"rgb(146 146 146)"}}>Start filling out our Surveys by entering</h5><h5
            style={{ fontWeight:"bold", textAlign:"left", color:"rgb(146 146 146)"}}> your name</h5>
            <Form.Group >
        <InputGroup style={{marginTop:"30px"}}>
        <InputGroup.Prepend >
            <InputGroup.Text style={{backgroundColor: "white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
            </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
            className={`form-control-md ${usernameValidity?"":"error-border-login"}`} 
            value = {username}
            style={{borderLeftColor: "white"}}
            onChange = {event => {
                setUsername(event.target.value) ;
                setUsernameValidity(true) ;
                }}
        />
        </InputGroup>
        <span className="validity-error-login " hidden={usernameValidity}>{usernameValidity?"":"Insert a name!"}</span>  
        </Form.Group>
        <Button style={{backgroundColor:"#db4c3f", borderColor:"#db4c3f",marginTop:"40px"}} block onClick={handleEnter}>{<h5>Start</h5>}</Button> 
        
        
        </div>
        

    </Col>
    <Col sm={6}>
    <Figure>
    <Figure.Image
        width={600}
        height={180}
        alt="171x180"
        src={imageMain}
    />
    </Figure>
    </Col>
    
    </Row>
    </Container>
    </>
    );
} ;
export default MainPage ;