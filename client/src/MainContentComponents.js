
import { ListGroup, Col, Form, Button, Row, Modal, Alert, Badge, Spinner} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddButton = (props) => {
    return (
            <a className="add-button" onClick={()=>{ props.openModal();}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg>
            </a>
            ) ;
} ;

const FilterTitle = (props) => <h1 className="survey-title">{props.title}</h1> ;

const QuestionListReport = (props) =>{
    return (
        <ListGroup as="ul" variant="flush" className="questionlist">
            { props.elements.map( (e) => <QuestionRowReport question={e} key={e.id} />)}
        </ListGroup>
        ) ;

}
const QuestionRowReport = (props) =>{
    return (<ListGroup.Item className="questionlist-elem survey-main" key={props.question.id}>
                    
                    <QuestionInfoReport {...props}/>
            </ListGroup.Item>) ;

}
const QuestionInfoReport = (props) =>{
    return (
        <div>
        {
            props.question.type==="open" ? 
            <>
            <div className="d-flex">
            <div className="p-2">
            <h4>{props.question.description}</h4>
            </div>
            <div className="p-2">
            {props.question.minimum === 0 ? 
                <div>
                <Badge variant="info" style={{color:"green", backgroundColor:"transparent", border:"1px solid transparent", borderColor:"green"}}>optional</Badge>
                </div>
                :
                <div>
                <Badge variant="info" style={{color:"red", backgroundColor:"transparent", border:"1px solid transparent", borderColor:"red"}}>mandatory</Badge>
                </div>
                }
            </div>
            </div>
            <br></br>
            {
            (props.question.answers[0].answerId===0 || props.question.answers[0].text==="none") ?
            <div>
                No answer provided
            </div>  
            :
            <Form>
            <Form.Group className="mb-3" key={props.question.id}>
            <Form.Control as="textarea" rows={4} placeholder={props.question.answers[0].text} readOnly/>
            </Form.Group>
            </Form>
            }
            </>
            :
            <>
            <div className="d-flex">
            <div className="p-2">
            <h4>{props.question.description}</h4>
            </div>
            <div className="p-2" style={{paddingTop:"10px!important"}}>
                    {props.question.minimum===0 ?
                    <Badge variant="info" style={{color:"green", backgroundColor:"transparent", border:"1px solid transparent", borderColor:"green"}}>
                    min:{props.question.minimum}; max:{props.question.maximum}</Badge>
                    :
                    <Badge variant="info" style={{color:"red", backgroundColor:"transparent", border:"1px solid transparent", borderColor:"red"}}>
                        min:{props.question.minimum}; max:{props.question.maximum}</Badge>
                    }
                </div>
            </div>
            <br></br>
            {
            props.question.answers[0].answerId===0?
            <div>
                No answer provided
            </div>  
            :
            <Form>
                {   
                    props.question.answers.map((a)=>
                    <Form.Group key={a.answerId} className="mb-3" >
                    <Form.Check disabled type="checkbox" checked={true} label={a.description} /> 
                    </Form.Group>
                    )
                }
            </Form>
            }
            </>

            
        }
        </div>
        ) ;

}
const QuestionsList = (props) => {
    return (
            <ListGroup as="ul" variant="flush" className="questionlist">
                { props.elements.map( (e) => <QuestionRow question={e} userQuestions={props.userQuestions} addTextQuestion={props.addTextQuestion} addAnswerQuestion={props.addAnswerQuestion}  key={e.id} user={props.user} removeQuestion={props.removeQuestion} changeOrder={props.changeOrder} />)}
            </ListGroup>
            ) ;
} ;
const ResponseList = (props) => {
    return (
            <ListGroup as="ul" variant="flush" className="questionlist">
                { props.elements.map( (e) => <ResponseRow element={e} retrieveQuestionsUser={props.retrieveQuestionsUser} key={e.userId}/>)}
            </ListGroup>
            ) ;
} ;
const QuestionRow = (props) => {
    return (<ListGroup.Item className="questionlist-elem survey-main" key={props.question.id}>
                    
                    <QuestionInfo {...props}/>
            </ListGroup.Item>) ;
} ;
const ResponseRow = (props) => {
    return (<ListGroup.Item className="questionlist-elem survey-main" key={props.element.userId}>
                    
                    <ResponseInfo {...props}/>
            </ListGroup.Item>) ;
} ;
const ResponseInfo = (props) =>{
    return (
        <div className="d-flex">
            <div className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
            </svg>
            </div>
            <div className="p-2">
            <h4>{props.element.name}</h4>
            </div>
            <div className="ml-auto p-2" style={{padding:"0.3rem!important"}}>
            <Link to={`/admin/surveys/reports/${props.element.userId}`} style={{ textDecoration: 'none' }} key = {props.element.userId} >
            <Button variant="light" style={{color:"#db4c3f",fontWeight:"bold"}} onClick={()=>props.retrieveQuestionsUser(props.element.userId)}>Browse Answer</Button>
            </Link>
            </div>
            

            

        </div>
    )

}

const QuestionInfo = (props) => {
    const [text, setText] = useState('')
    
    return (
            <div>
            {   
                props.question.type==="open" ? 
                <>
                <div className="d-flex">
                <div className="p-2">
                <h4>{props.question.description}</h4>
                </div>
                <div className="p-2" style={{paddingTop:"15px!important"}}>
                {props.question.minimum === 0 ? 
                <div>
                <Badge variant="info" style={{color:"green", backgroundColor:"transparent", border:"1px solid transparent", borderColor:"green"}}>optional</Badge>
                </div>
                :
                <div>
                <Badge variant="info" style={{color:"red", backgroundColor:"transparent", border:"1px solid transparent", borderColor:"red"}}>mandatory</Badge>
                </div>
                }
                </div>
                { props.user === "admin" ?
                <QuestionControls id={props.question.id} removeQuestion={props.removeQuestion} changeOrder={props.changeOrder}/>
                :
                ""
                }
                </div>
                <br></br> 
                {
                    props.user === "admin" ?  
                <Form>
                <Form.Group className="mb-3" key={props.question.id}>
                <Form.Control as="textarea" rows={4} readOnly/>
                </Form.Group>
                </Form>
                : /*form user open question*/ 
                <Form>
                <Form.Group className="mb-3" key={props.question.id}> 
                <Form.Control value={text} onChange={event => {
                                                  setText(event.target.value) ;
                                                  props.addTextQuestion(props.question,event.target.value) ;
                                                }}  as="textarea" rows={4}/>
                </Form.Group>
                </Form>
                }
                </>
                
                :
                <>

                <div className="d-flex">
                <div className="p-2">
                <h4>{props.question.description}</h4>
                </div>
                <div className="p-2" style={{paddingTop:"10px!important"}}>
                    {props.question.minimum===0 ?
                    <Badge variant="info" style={{color:"green", backgroundColor:"transparent", border:"1px solid transparent", borderColor:"green"}}>
                    min:{props.question.minimum}; max:{props.question.maximum}</Badge>
                    :
                    <Badge variant="info" style={{color:"red", backgroundColor:"transparent", border:"1px solid transparent", borderColor:"red"}}>
                        min:{props.question.minimum}; max:{props.question.maximum}</Badge>
                    }
                </div>
                { props.user === "admin" ? 
                <QuestionControls id={props.question.id} removeQuestion={props.removeQuestion} changeOrder={props.changeOrder}/>
                :
                ""
                
                }
                </div>
                <br></br>
                <Form>
                    {   props.user === "admin" ?
                        props.question.answers.map((a)=>
                        <Form.Group key={a.id} className="mb-3" >
                        <Form.Check disabled type="checkbox" label={a.description} /> 
                        </Form.Group>
                        )
                        : /*form user closed question*/ 
                        props.question.answers.map((a)=>
                        <Form.Group  key={a.id}  className="mb-3">
                        <Form.Check type="checkbox" label={a.description} onChange={
                            (event)=>{
                                props.addAnswerQuestion(props.question,a) ;
                            }
                        } />
                        </Form.Group>
                        )


                        
                    }
                </Form>

                </>
            }
            </div>
            ) ;
} ;
const QuestionControls = (props) => {
    return (
        
        <div className="ml-auto p-2" style={{paddingTop:"0px!important"}}>
        <Button className="delete-button" onClick={()=>props.changeOrder(props.id,"up")} variant="outline-secondary" >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-caret-up" viewBox="0 0 16 16">
    <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
        </svg>
        </Button>
        <Button className="delete-button" onClick={()=>props.changeOrder(props.id,"down")} variant="outline-secondary" >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-caret-down" viewBox="0 0 16 16">
        <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
        </svg>
         </Button>
         
            <Button className="delete-button" onClick={()=>props.removeQuestion(props.id)} variant="outline-secondary" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                </svg>
            </Button>
            
            </div>
            ) ;
} ;
const AdminMainContentReport = (props) =>{
    return (
        <>
            <Col as='main' xs={12} sm={8}>
                <div id="questionlist-container">
                    
                    <FilterTitle title={props.title}></FilterTitle>
                    {
                    props.updatingQuestion ? "" :
                    <div className="d-flex" style={{paddingLeft:"3px"}}>
                    <div className="mr-auto p-2">
                    <Link to={`/admin/surveys/reports/${props.currUserId}`} style={{ textDecoration: 'none' }} onClick={()=>props.goBackward()} key = {props.survey.id} >
                    <Button className="delete-button"  variant="outline-secondary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" color="black" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                    </svg>
                    </Button>
                    </Link>
                    </div>
                    <div className="p-2">
                    <Link to={`/admin/surveys/reports/${props.currUserId}`} style={{ textDecoration: 'none' }} onClick={()=>props.goForward()} key = {props.survey.id} >
                    <Button className="delete-button"  variant="outline-secondary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" color="black" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                    </svg>
                    </Button>
                    </Link>
                    </div>
                    </div>
                    }
                    {
                    props.updatingQuestion ?
                    <Spinner animation="border" variant="danger" style={{ position:"absolute",top:"10%",left:"50%"}}></Spinner>
                    :
                    <>
                    <h3 style={{color:"rgb(108, 117, 125)", paddingLeft:"10px", paddingTop:"10px", paddingBottom:"10px"}}>Answers by {props.currUserName}</h3>
                    <QuestionListReport elements={props.questions}></QuestionListReport>
                    <div className="d-flex" style={{paddingLeft:"3px"}}>
                    <div className="mr-auto p-2">
                    <Link to={`/admin/surveys/reports/${props.currUserId}`} style={{ textDecoration: 'none' }} onClick={()=>props.goBackward()} key = {props.survey.id} >
                    <Button className="delete-button"  variant="outline-secondary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" color="black" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                    </svg>
                    </Button>
                    </Link>
                    </div>
                    <div className="p-2">
                    <Link to={`/admin/surveys/reports/${props.currUserId}`} style={{ textDecoration: 'none' }} onClick={()=>props.goForward()} key = {props.survey.id} >
                    <Button className="delete-button"  variant="outline-secondary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" color="black" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                    </svg>
                    </Button>
                    </Link>
                    </div>
                    </div>
                    </> 
                   
                    }
                </div>
            </Col>
          
        </>
            ) ;

}
const AdminMainContent = (props) =>{
    //state to manage the modal(open/closed)
    const [showModal, setShowModal] = useState(false) ;

    //function to open the modal
    const openModal = () => setShowModal(() => true) ;

    //function to close the modal
    const closeModal = () => setShowModal(() => false) ;

    // state to close the welcome message
    //const [closeMessage, setCloseMessage] = useState(false) ;
    /*
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `${props.title} | ToDo Manager`;
      });
      */
    return (
        <>
            <Col as='main' xs={12} sm={8}>
                <div id="questionlist-container">
                    
                    <FilterTitle title={props.title}></FilterTitle>
                    
                    {
                    props.title=== '' ?
                    <>
                    <div className="d-flex justify-content-center" style={{paddingTop:"15%"}}>
                    <h5 style={{color:"#9e9e9e"}}>No Survey selected</h5>
                    
                    </div>
                    <div className="d-flex justify-content-center">
                    <p style={{color:"#757575"}}>When you select a survey, its details will appear here.</p>
                    </div>
                    </>
                    :
                    props.updatingQuestion ?
                    <Spinner animation="border" variant="danger" style={{ position:"absolute",top:"10%",left:"50%"}}></Spinner>
                    :
                    (props.survey.submitted===0 && props.questions.length===0) ? 
                    <>
                    <div className="d-flex justify-content-center" style={{paddingTop:"15%"}}>
                        <h5 style={{color:"#9e9e9e"}}>No Question for this survey</h5>
                        
                    </div>
                    <div className="d-flex justify-content-center">
                        <p style={{color:"#757575"}}>When you create questions for a survey, it will appear here.</p>
                    </div>
                    </>
                    :
                    (props.survey.submitted===0 && props.questions.lenght!==0) ?
                    
                    <QuestionsList elements={props.questions} user={"admin"} removeQuestion={props.removeQuestion} changeOrder={props.changeOrder}/* updatingPage={props.updatingPage}*/></QuestionsList>  
                    :
                    props.userInfo.length!==0 ?
                    <>
                    <div className="d-flex justify-content-start">
                        
                        <h5 style={{color:" #6c757d", paddingBottom:"10px", paddingTop:"10px"}}>This survey was answered by {props.userInfo.length} users</h5>
                    </div>
                    <div>
                        <ResponseList elements={props.userInfo} retrieveQuestionsUser={props.retrieveQuestionsUser}></ResponseList>
                       
                    </div>
                    </>
                    :
                    <>
                    <div className="d-flex justify-content-center" style={{paddingTop:"15%"}}>
                        <h5 style={{color:"#9e9e9e"}}>Still no one has answered this survey...</h5>
                    </div>
                    <div className="d-flex justify-content-center">
                    <p style={{color:"#757575"}}>Please select another survey.</p>
                    </div>
                    </>
                    }
                    {
                    
                    props.survey.submitted === 0 ?
                    props.updatingQuestion ? "":
                    <>
                    
                    <div className="d-flex justify-content-start">
                    <AddButton openModal={openModal} ></AddButton>
                    </div>
                    {props.questions.length === 0 ? "" :
                    props.updatingQuestion ? "":
                    <div className="d-flex justify-content-end" style={{paddingBottom:"25px", paddingRight:"25px"}}>
                    <Button style={{backgroundColor:"#db4c3f", borderColor:"#db4c3f",marginTop:"40px"}} onClick={()=>props.submitSurvey(props.survey.id)} ><h5>Submit</h5></Button>
                    </div>
                    }
                    </>
                    :
                    ""
                    }
                </div>
            </Col>
            <AddModal  showModal={showModal} closeModal={closeModal} addQuestion={props.addQuestion}></AddModal> 
        </>
            ) ;

}
const AdminMainContentEmpty = (props) =>{
    return (
        <Col as='main' xs={12} sm={8}>
            <div id="questionlist-container">
                
                
                <div className="d-flex justify-content-center" style={{paddingTop:"15%"}}>
                    <h5 style={{color:"#9e9e9e"}}>No Survey selected</h5>
                    
                </div>
                <div className="d-flex justify-content-center">
                    <p style={{color:"#757575"}}>When you select a survey, its details will appear here.</p>
                </div>
                
                
               
            </div>
            
        </Col>
        ) ;

}
const AddModal = (props) => {
    //states for input fields
    const [description, setDescription] = useState('') ;
    const [type, setType] = useState('open') ;
    const [minimum, setMinimum] = useState(0) ;
    const [maximum, setMaximum] = useState(1) ;
    const [answers, setAnswers] = useState([]) ;
    const [maximumInput, setMaximumInput] = useState(true) ;
    const [numberAnswer, setNumberAnswer] = useState(0);
    

    //states for validation(and error messages)
    const [descriptionValidity, setDescriptionValidity] = useState(true) ;
    const [maximumValidity, setMaximumValidity] = useState(true) ;
    const [answerValidity, setAnswerValidity] = useState(true) ;
    const [minimumValidity, setMinimumValidity] = useState(true) ;
    const [numberAnswerValidity, setNumberAnswerValidity] = useState(true) ;

    //function to manage the Add/Edit button click inside the modal
    const handleAdd = () => {
        let answer_validity=true;
        let minimum_validity=true;

        if(description === '') {
            setDescriptionValidity(false) ;
        } 
        else{
            if(type==='open'){
                if(minimum<0 || minimum>1){
                    setMinimumValidity(false) ;
                    minimum_validity=false;
                }
                if(minimum_validity===true){
                props.addQuestion({description: description, type: type, minimum: minimum, maximum: maximum, answers:[]}) ;
                props.closeModal() ;
                resetForms() ;
                }

            }
            else{
                if(maximum>10 || maximum<0){
                    setMaximumValidity(false) ;
                }
                else{
                    if(maximum>numberAnswer){
                        setMaximumValidity(false) ;
                    }
                    else if(minimum>numberAnswer || minimum<0){
                        setMinimumValidity(false) ;
                    }
                    else if(numberAnswer===0 || numberAnswer<0){
                        setNumberAnswerValidity(false) ;
                    }
                    else{
                    
                        if(Number(numberAnswer)!==answers.length){
                            answer_validity=false ;
                            setAnswerValidity(false)
                        }
                    
                    if(answer_validity===true){
                    props.addQuestion({description: description, type: type, minimum: minimum, maximum: maximum, answers:answers}) ;
                    props.closeModal() ;
                    resetForms() ;
                    }
                    }
                }

            }
        }
        
    } ;


    //function to reset (or to fill) the input fields
    const resetForms = () => {
            setDescription('') ;
            setType('open') ;
            setMinimum(0) ;
            setMaximum(1) ;
            setAnswers([]) ;
            setNumberAnswer(0) ;
            setMaximumInput(true) ;

            setDescriptionValidity(true) ;
            setMaximumValidity(true) ;
            setAnswerValidity(true) ;
            setMinimumValidity(true) ;
            setNumberAnswerValidity(true) ;
        
    } ;

    return (
            <Modal show={props.showModal} 
            onHide={() => { props.closeModal(); resetForms(); }} 
            onShow={() => resetForms()}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={() => { props.closeModal(); resetForms(); }}>
                    <Modal.Title>
                        {"Add question"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="addQuestionForm.Description">
                            <Form.Label>Question description</Form.Label>
                            <span className="validity-error" hidden={descriptionValidity}>{descriptionValidity?"":" Description is required!"}</span>
                            <Form.Control value={description} className={descriptionValidity?"":"error-border"} onChange={event => {
                                                                                                                                    setDescription(event.target.value);
                                                                                                                                    setDescriptionValidity(true);
                                                                                                                                    }} as="textarea" rows={2} />
                        </Form.Group>
                            <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridType">
                            <Form.Label>Type of question</Form.Label>
                            <Form.Control as="select" value={type} onChange={event =>{
                                setType(event.target.value) ;
                                if(event.target.value==='closed')
                                    setMaximumInput(false) ;
                                else{
                                    setMaximum(1) ;
                                    setNumberAnswer(0) ;
                                    setMaximumInput(true) ;
                                    }
                            }}>
                                <option>open</option>
                                <option>closed</option>
                            </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMinumum">
                            <Form.Label>Minimum answers</Form.Label>

                            <Form.Control  value={minimum} className={minimumValidity?"":"error-border"} onChange={event => {
                                                                               setMinimum(event.target.value);
                                                                               setMinimumValidity(true) ;
                                                                                }} type="number"/>
                            <span className="validity-error" hidden={minimumValidity}>{minimumValidity?"":"Inconsistent number!"}</span>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMaximum">
                            <Form.Label>Maximum answers</Form.Label>
                           
                            <Form.Control disabled={maximumInput} className={maximumValidity?"":"error-border"} value={maximum} onChange={event => {
                                                                                                                                        setMaximum(event.target.value);
                                                                                                                                        setMaximumValidity(true) ;
                                                                                                                                        }} type="number"/>
                             <span className="validity-error" hidden={maximumValidity}>{maximumValidity?"":"Inconsistent number!"}</span>
                        </Form.Group>
                        </Row>
                        <Form.Group  controlId="formGridNumber">
                        <Form.Label>Select number of answers</Form.Label>
                        <span className="validity-error" hidden={numberAnswerValidity}>{numberAnswerValidity?"":"Select a number greater than zero!"}</span>
                        <Form.Control   disabled={maximumInput} className={numberAnswerValidity?"":"error-border"} value={numberAnswer} onChange={event => {
                                                                            setNumberAnswer(event.target.value);
                                                                            setNumberAnswerValidity(true) ;
                                                                            }} type="number"/>
                        </Form.Group>
                        
                        <span className="validity-error" hidden={answerValidity}>{answerValidity?"":"Complete all answer descriptions!"}</span>
                        {
                        
                        Array.from({length:numberAnswer},(_,i)=>i).map((i)=>
                        <Form.Group key={i} >
                            
                            <Form.Control value={answers[i]===undefined ? "" : answers[i] }  type="text" placeholder={"Type answer..."} onChange={event => {
                                                                            let newArr = [...answers]; // copying the old array
                                                                            newArr[i] = event.target.value; // replace e.target.value with whatever you want to change it to
                                                                            setAnswers(newArr);
                                                            
                                                                            
                                    
                                    
                                                                            }
                                                                    }></Form.Control>
                        </Form.Group>
                         )
                        }

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { props.closeModal();  resetForms();  }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        {"Create"}
                    </Button>
                </Modal.Footer>
        </Modal>
            ) ;
} ; 

const UserMainContent = (props) =>{
    
    const handleSubmitUser = () => {
        let submit_validity= true ; 
        //verifiche
        for(let i=0; i<props.questions.length; i++){
            let min = props.questions[i].minimum ;
            let max = props.questions[i].maximum ;
            if(props.userQuestions[i].answers.length<min || props.userQuestions[i].answers.length>max){
                submit_validity=false ;
                props.setSubmitRes("danger") ;
                props.setMessage("There are some errors, please check all fields!") ;
            }
            if(props.questions[i].type==="open" && min===1 && props.userQuestions[i].answers[0].text===""){
                submit_validity=false ;
                props.setSubmitRes("danger") ;
                props.setMessage("There are some errors, please check all fields!") ;

            }

        }
        if(submit_validity===true){
            props.submitSurveyUser(props.survey.id) ;

        }

    } ;
    return (
        <Col as='main' xs={12} sm={8}>
            <div id="questionlist-container">
            <FilterTitle title={props.title}></FilterTitle>
                { 
                
                 props.questions.length=== 0 ? 
                 <>
                 <div className="d-flex justify-content-center" style={{paddingTop:"15%"}}>
                     <h5 style={{color:"#9e9e9e"}}>There is no question for this survey</h5>
                     
                 </div>
                 <div className="d-flex justify-content-center">
                     <p style={{color:"#757575"}}>Please select an other survey.</p>
                 </div>
                 </>
                 :
                props.updatingQuestion ?
                <Spinner animation="border" variant="danger" style={{ position:"absolute",top:"10%",left:"50%"}}></Spinner>
                :
                <QuestionsList elements={props.questions} userQuestions={props.userQuestions} addTextQuestion={props.addTextQuestion} addAnswerQuestion={props.addAnswerQuestion} user={"user"}></QuestionsList>  
                
                }
                {
                    
                    props.questions.length===0 ? ""
                    :
                    <>
                    <div className="d-flex justify-content-center" >
                    {props.message!=='' ?
                       <Alert variant={props.submitRes}  onClose={() => {props.setMessage(''); props.setSubmitRes('')}} dismissible>{props.message}</Alert>
                       
                        :
                        ""
                    }
                    </div>
                    {
                    props.updatingQuestion ?
                    ""
                    :
                    <div className="d-flex justify-content-end" style={{paddingBottom:"25px"}}>
                    <Button style={{backgroundColor:"#db4c3f", borderColor:"#db4c3f",marginTop:"40px",marginRight:"20px"}} onClick={handleSubmitUser}>Submit</Button>
                    </div>
                    }
                    </>
                }
               
            </div>
            
        </Col>
        ) ;

}
const UserMainContentEmpty = (props) =>{
    return (
        <Col as='main' xs={12} sm={8}>
            <div id="questionlist-container">
                
                
                <div className="d-flex justify-content-center" style={{paddingTop:"15%"}}>
                    <h5 style={{color:"#9e9e9e"}}>No Survey selected</h5>
                    
                </div>
                <div className="d-flex justify-content-center">
                    <p style={{color:"#757575"}}>When you select a survey, its details will appear here.</p>
                </div>
                
                
               
            </div>
            
        </Col>
        ) ;

}
export {AdminMainContent,AdminMainContentEmpty,UserMainContent, UserMainContentEmpty, AdminMainContentReport} ;