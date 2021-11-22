const url = 'http://localhost:3000'
async function loadSurveysAdmin(){
    const response = await fetch(url+'/api/surveys') ;
    const fetchedSurveys = await response.json() ;
    return fetchedSurveys.map( sn => ({survey:sn.survey,num:sn.num }) ) ;
} ;
async function addSurvey(survey) { 
    const response = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        "title": survey.title, 
        "submitted": 0
      } )
    });
    if (response.ok) {
        return null;
    } else {
        return { 'err': 'POST error' };
    }
} ;
async function loadQuestionSurvey(id) {
    const response = await fetch(url+'/api/surveys/'+id) ;
    const fetchedQuestions = await response.json() ;
    return fetchedQuestions.map(qa=>({question:qa.question, answers:qa.answers.map(a=>({id:a.answerId,description:a.description}))}));

}
async function postQuestion(question){
    const response = await fetch(url+'/api/surveys/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        "questionDescription": question.description, 
        "type": question.type,
        "minimum": question.minimum,
        "maximum": question.maximum
      } )
    });
    if (response.ok) {
        const questionId= await response.json() ;
        return questionId;
    } else {
        return { 'err': 'POST error' };
    }

}
async function postQuestionSurvey(id,questionId,answerDescription){
    const response = await fetch(url+'/api/surveys/'+id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        "answerDescription": answerDescription, 
        "questionId": questionId
      } )
    });
    if (response.ok) {
        return null;
    } else {
        return { 'err': 'POST error' };
    }
    
} ;

async function setSubmitted(id) {
    const response = await fetch(url+'/api/surveys/setsubmitted/' + id, {
        method: 'PUT',
    });
    if (response.ok) {
        return null;
    } else {
        return { 'err': 'PUT error' };
    }
} ;
//API to do the login
async function logIn(credentials) {
    let response = await fetch(url+'/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if(response.ok) {
      const user = await response.json();
      return user.username;
    }
    else {
      try {
        const errDetail = await response.json();
        throw errDetail.message;
      }
      catch(err) {
        throw err;
      }
    }
} ;

//API to do the logout
async function logOut() {
    await fetch(url+'/api/sessions/current', { method: 'DELETE' });
} ;

async function getUserInfo() {
    const response = await fetch(url+'/api/sessions/current');
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo;  // an object with the error coming from the server
    }
}
async function retrieveMaxIdAnswer(){
    const response = await fetch(url+'/api/maxanswerid') ;
    const fetchedId = await response.json() ;
    return fetchedId ;
} ;
async function retrieveMaxIdQuestion(){
    const response = await fetch(url+'/api/maxquestionid') ;
    const fetchedId = await response.json() ;
    return fetchedId ;
} ;
async function retrieveMaxIdSurvey(){
    const response = await fetch(url+'/api/maxsurveyid') ;
    const fetchedId = await response.json() ;
    return fetchedId ;
} ;
// USER
async function createUser(name){
    const response = await fetch(url+'/api/user/'+name, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const lastIdUser = await response.json();
        return lastIdUser;
    } else {
        return { 'err': 'POST error' };
    }

}
async function loadAllSurveys(){
    const response = await fetch(url+'/api/user/surveys') ;
    const fetchedSurveys = await response.json() ;
    return fetchedSurveys.map( s => ({id: s.id, adminId: s.adminId, title: s.title, submitted: s.submitted}) ) ;
} ;
async function postQuestionSurveyUser (id,questionId,answerId, userId, text){
    const response = await fetch(url+'/api/user/surveys/'+id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        "questionId": questionId, 
        "answerId": answerId,
        "userId": userId,
        "text": text
      } )
    });
    if (response.ok) {
        return null;
    } else {
        return { 'err': 'POST error' };
    }

}
async function getNumUser(surveyId){
    const response = await fetch(url+'/api/surveys/submitted/'+surveyId) ;
    const fetchedNumber = await response.json() ;
    return fetchedNumber ;

}
async function loadQuestionSurveyUser(userId, surveyId) {
    const response = await fetch(url+'/api/surveys/submitted/user/'+userId+"&"+surveyId) ;
    const fetchedQuestions = await response.json() ;
    return fetchedQuestions;

}
async function loadUsersInfo(surveyId){
    const response = await fetch(url+'/api/surveys/submitted/listusers/'+surveyId) ;
    const fetchedUsers= await response.json() ;
    return fetchedUsers ;
}

const API = {logIn, logOut, getUserInfo, loadSurveysAdmin, 
    addSurvey, loadQuestionSurvey, retrieveMaxIdAnswer, retrieveMaxIdQuestion, retrieveMaxIdSurvey
    ,postQuestionSurvey, postQuestion, setSubmitted, createUser, loadAllSurveys,
    postQuestionSurveyUser, getNumUser, loadQuestionSurveyUser, loadUsersInfo} ;
export default API ;