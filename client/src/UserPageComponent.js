import {UserNavbar} from './NavbarComponents';
import {Row, Container} from 'react-bootstrap' ;
import {UserSidebar} from './SidebarComponents';
import {UserMainContent, UserMainContentEmpty} from './MainContentComponents';
import { useEffect } from 'react';

const UserPage = (props) =>{
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `UserPage | Survey | Fill`;
      });
    return(
        
    <>
    <UserNavbar cleanUser={props.cleanUser}></UserNavbar>
    <Container fluid>
    <Row className="vheight-100">
    <UserSidebar updatingSurvey={props.updatingSurvey} elements={props.surveys} title={props.title} id={props.titleId} changeFilter={props.changeFilter}></UserSidebar>
    <UserMainContent 
    updatingQuestion={props.updatingQuestion}
    submitSurveyUser={props.submitSurveyUser} 
    userQuestions={props.userQuestions} addTextQuestion={props.addTextQuestion} 
    addAnswerQuestion={props.addAnswerQuestion}  title={props.title} 
    questions={props.questions} survey={props.survey}
    submitRes={props.submitRes} setSubmitRes={props.setSubmitRes}
    message={props.message} setMessage={props.setMessage}
    ></UserMainContent>
    </Row>
    </Container>
    </>
    ) ;
}
const UserPageEmpty = (props) =>{
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `UserPage | Survey`;
  });
  return(
        
    <>
    <UserNavbar cleanUser={props.cleanUser}></UserNavbar>
    <Container fluid>
    <Row className="vheight-100">
    <UserSidebar updatingSurvey={props.updatingSurvey} elements={props.surveys} title={props.title} id={props.titleId} changeFilter={props.changeFilter}></UserSidebar>
    <UserMainContentEmpty
    title={props.title} 
    ></UserMainContentEmpty>
    </Row>
    </Container>
    </>
    ) ;

}
export {UserPage, UserPageEmpty} ;
