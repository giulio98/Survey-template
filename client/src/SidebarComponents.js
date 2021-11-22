import { ListGroup, Col, FormControl,Button, InputGroup, Form, Modal, Badge, Spinner} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
const SearchForm = (props) => {
    return (
        <InputGroup className="input-group-md" style={{width:"auto", paddingBottom:"25px"}}>
        <FormControl
          placeholder="Search a survey..."
          aria-label="Search a survey..."
          aria-describedby="basic-addon2"
          className="search-form"
        />
        <InputGroup.Append >
          <Button className="search-button" variant="outline-secondary" style={{backgroundColor: "white",borderLeftColor: "white",borderBottomColor: "#ced4da",
                                                    borderTopColor: "#ced4da",borderRightColor:"#ced4da"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-search" viewBox="0 0 16 16">
                                 <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg></Button>
        </InputGroup.Append>
      </InputGroup>
    
           
           ) ;
} ;
const AddModal = (props) => {
    //states for input fields
    const [title, setTitle] = useState('') ;
    

    //states for validation(and error messages)
    const [titleValidity, setTitleValidity] = useState(true) ;

    //function to manage the Add/Edit button click inside the modal
    const handleAdd = () => {

        if(title === '') 
        {
            setTitleValidity(false) ;
        } 
        else
        {
            props.addSurvey({title: title, questions: []}) ;
            props.closeModal() ;
            resetForms() ;
        }
        
    } ;


    //function to reset (or to fill) the input fields
    const resetForms = () => {
        setTitle('') ;
        setTitleValidity(true) ;
      
    } ;

    return (
            <Modal show={props.showModal} 
            onHide={() => { props.closeModal(); resetForms(); }} 
            onShow={() => resetForms()}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() => { props.closeModal(); resetForms(); }}>
                    <Modal.Title>
                        {"Create a new Survey"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="addSurveyForm.Title">
                            <Form.Label>Survey title</Form.Label>
                            <span className="validity-error" hidden={titleValidity}>{titleValidity?"":" Title is required!"}</span>
                            <Form.Control value={title} className={titleValidity?"":"error-border"} onChange={event => {
                                                                                                                                    setTitle(event.target.value);
                                                                                                                                    setTitleValidity(true);
                                                                                                                                    }}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { props.closeModal(); resetForms();  }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        {"Create"}
                    </Button>
                </Modal.Footer>
        </Modal>
            ) ;
} ; 
const SurveySidebar = (props) => {
    //state to manage the modal(open/closed)
    const [showModal, setShowModal] = useState(false) ;

    //function to open the modal
    const openModal = () => setShowModal(() => true) ;

    //function to close the modal
    const closeModal = () => setShowModal(() => false) ;

    const elements = props.elements ;
    const listItems = elements.map( (element) => 
    <Link to={`/admin/surveys/${element.id}`} style={{ textDecoration: 'none' }} key = {element.id+"-sidebar"} >
            <ListGroup.Item action className={`sidebar-left-elem ${props.id === element.id? "sidebar-left-elem-active": ""}`}  
            key = {element.id+"-sidebar"}
            id = {element.id+"-sidebar"} 
            onClick={()=>{props.changeFilter(element.title,element.id);}}>
                <div className="d-flex justify-content-between">
                {element.title}
                { element.submitted === 1 ?
                <>
                <div>
                {element.num}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>
                
                </div>
                <Badge variant="info" style={{color:"green", backgroundColor:"transparent", border:"1px solid transparent", borderColor:"green"}}>
                    Submitted</Badge>
                </>
                    :
                    <Badge variant="info" style={{color:"#ffc107", backgroundColor:"transparent", border:"1px solid transparent", borderColor:"#ffc107"}}>
                    Pending</Badge>
                   }
                </div>
           
            </ListGroup.Item>
            </Link>
        ) ;

    return ( <>
            <Col sm={4} as="aside"  style={{textAlign:"left" , backgroundColor:"#fafafa"}}
            className={`collapse d-sm-flex pt-3 pl-3 pr-3 list-group list-group-flush sidebar-left ${props.collapsed?"":"show"}`} 
            id="CollapsableSidebar">
                <SearchForm></SearchForm>
                {
                props.updatingSurvey ?
                <Spinner animation="border" variant="danger" ></Spinner>
                :
                listItems 
                }
                {
                props.updatingSurvey ?
                ""
                :
                <>
                <div style={{ borderTop: "2px solid black ", marginLeft: 70, marginRight: 70,paddingBottom:"25px"}}></div>
                <div className="d-flex justify-content-center" style={{paddingBottom:"25px"}}>
                    <Button variant="outline-secondary" style={{backgroundColor:"#e9ecef",borderColor:"#e9ecef",color:"#292b2d"}} onClick={()=>{ openModal();}}>New Survey</Button>
                
                </div>
                </>
                } 
                
                
            </Col> 
             <AddModal  showModal={showModal} closeModal={closeModal} addSurvey={props.addSurvey}></AddModal> 
           </>
            ) ;  
} ;
const UserSidebar = (props) => {
    const elements = props.elements ;
    const listItems = elements.map( (element) => 
    <Link to={`/user/surveys/${element.id}`} style={{ textDecoration: 'none' }} key = {element.id+"-sidebar"} >
            <ListGroup.Item action className={`sidebar-left-elem ${props.id === element.id? "sidebar-left-elem-active": ""}`}  
            key = {element.id+"-sidebar"}
            id = {element.id+"-sidebar"} 
            onClick={()=>{props.changeFilter(element.title,element.id);}}>
                {element.title}
            </ListGroup.Item>
    </Link>
        ) ;

    return ( 
            <Col sm={4} as="aside" style={{textAlign:"left" , backgroundColor:"#fafafa"}}
            className={`collapse d-sm-flex pt-3 pl-3 pr-3 list-group list-group-flush sidebar-left ${props.collapsed?"":"show"}`} 
            id="CollapsableSidebar">
                <SearchForm></SearchForm>
                {
                props.updatingSurvey ?
                <Spinner animation="border" variant="danger" ></Spinner>
                :
                listItems 
                }
            </Col> 
            ) ;  
} ;
export {SurveySidebar, UserSidebar} ;