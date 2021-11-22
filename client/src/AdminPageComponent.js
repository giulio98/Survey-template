import {SurveyNavbar} from './NavbarComponents';
import {SurveySidebar} from './SidebarComponents';
import {Row, Container} from 'react-bootstrap'
import {AdminMainContent, AdminMainContentEmpty, AdminMainContentReport} from './MainContentComponents';
import { useEffect } from 'react';


const AdminPage = (props) =>{
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `AdminPage | Survey`;
      });
    return(
    <>
    <SurveyNavbar logout={props.logout} cleanAdmin={props.cleanAdmin}></SurveyNavbar>
    <Container fluid>
    <Row className="vheight-100">
    <SurveySidebar addSurvey={props.addSurvey} updatingSurvey={props.updatingSurvey} elements={props.surveys} title={props.title} id={props.titleId}  changeFilter={props.changeFilter}></SurveySidebar>
    <AdminMainContent updatingQuestion={props.updatingQuestion} addQuestion={props.addQuestion} changeOrder={props.changeOrder} removeQuestion={props.removeQuestion} title={props.title}
    submitSurvey={props.submitSurvey} survey={props.survey} questions={props.questions}
    userInfo={props.userInfo}
    retrieveQuestionsUser={props.retrieveQuestionsUser}
    >
    </AdminMainContent>
    </Row>
    </Container>
    </>
    ) ;
}
const AdminPageEmpty = (props) =>{
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `AdminPage | Survey`;
  });
return(
<>
<SurveyNavbar logout={props.logout} cleanAdmin={props.cleanAdmin}></SurveyNavbar>
<Container fluid>
<Row className="vheight-100">
<SurveySidebar addSurvey={props.addSurvey} updatingSurvey={props.updatingSurvey} elements={props.surveys} title={props.title} id={props.titleId}   changeFilter={props.changeFilter}></SurveySidebar>
<AdminMainContentEmpty  title={props.title}></AdminMainContentEmpty>
</Row>
</Container>
</>
) ;

}
const AdminPageReport = (props) =>{
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `AdminPage | Survey`;
  });
return(
<>
<SurveyNavbar logout={props.logout} cleanAdmin={props.cleanAdmin}></SurveyNavbar>
<Container fluid>
<Row className="vheight-100">
<SurveySidebar addSurvey={props.addSurvey} updatingSurvey={props.updatingSurvey} elements={props.surveys} title={props.title} id={props.titleId}   changeFilter={props.changeFilter}></SurveySidebar>
<AdminMainContentReport updatingQuestion={props.updatingQuestion} title={props.title}
survey={props.survey} questions={props.questions}
userInfo={props.userInfo}
goForward={props.goForward}
goBackward={props.goBackward}
currUserId={props.currUserId}
currUserName={props.currUserName}
>
</AdminMainContentReport>
</Row>
</Container>
</>
) ;

}
export { AdminPage, AdminPageEmpty, AdminPageReport} ;