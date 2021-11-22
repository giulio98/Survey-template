import 'bootstrap/dist/css/bootstrap.min.css' ;
import './App.css';
import { useEffect, useState } from 'react';
import LoginPage from './LoginPageComponent.js'
import MainPage from './StartPageComponent.js'
import {AdminPage, AdminPageEmpty, AdminPageReport} from './AdminPageComponent';
import {UserPage, UserPageEmpty} from './UserPageComponent';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom' ;
import API from './API.js' ;

function Answer(id, description, text=''){
  this.id=id ;
  this.description= description ;
  this.text= text ;
}

function Question(id, description, type, minimum, maximum, answers){
  if(!id) throw new Error('ID is required!') ;
  else if (!description) throw new Error('Description is required!') ;
  this.id = id ;
  this.description = description ;
  this.type = type ;
  this.minimum = minimum ;
  this.maximum = maximum ;
  this.answers = answers ;
  

}
function Survey(id, title, questions, submitted, num=0){
  if (!id) throw new Error('ID is required!') ;
  else if (!title) throw new Error('Title is required!') ;
  this.id = id ; 
  this.title = title ;
  this.questions = questions ;
  this.submitted = submitted ;
  this.num=num ;
} ;

function SurveyList(){
  this.surveys = [] ;

  //method to add a task to the tasks list
  this.addSurvey = (survey) => this.surveys.push(survey) ;
} ;
function QuestionList(){
  this.questions = [] ;
  //method to add a task to the tasks list
  this.addQuestion = (question) => this.questions.push(question) ;
} ;
function AnswerList() {
  this.answers = [] ;
  this.addAnswer = (answer) => this.answers.push(answer) ;
}

function App() {
  
  const [surveys, setSurveys] = useState([]) ;
  const [questions, setQuestions] = useState([]) ;
  const [userQuestions, setUserQuestions] = useState([]) ;
  const [userInfo, setUserInfo] = useState([]) ;
  const [title, setTitle] = useState('') ;
  const [titleId, setTitleId] = useState('');
  const [currSurvey, setCurrSurvey] = useState('') ;
  const [maxIdAnswer,setMaxIdAnswer] = useState('') ;
  const [maxIdQuestion,setMaxIdQuestion] = useState('') ;
  const [maxIdSurvey,setMaxIdSurvey] = useState('') ;
  const [currUserId, setCurrUserId] = useState('') //id dello user report
  const [currUserName,setCurrUserName] = useState('') ;
   // State to manage login
  const [loggedIn, setLoggedIn] = useState(false) ;
  const [currentUser, setCurrentUser] = useState('') ; //admin loggato
  const [userId, setUserId] = useState('') ; //admin loggato

  const [updatingSurvey, setUpdatingSurvey] = useState(true) ;
  const [updatingQuestion, setUpdatingQuestion] = useState(true) ;

  const [submitRes, setSubmitRes] = useState('') ;
  const [message, setMessage] = useState('') ;
   //Check if the user is already logged in
   useEffect(()=> {
    const checkAuth = async() => {
      try {
        
        const userInfo = await API.getUserInfo() ;
        setLoggedIn(true);
      } catch(err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, []);
   //Rehydrate with all tasks at mount time, when a filter is selected and when a task is added/deleted/updated
useEffect(() => {
  if(updatingSurvey && (loggedIn|| currentUser!=='')){
      if(currentUser===''){
      API.loadSurveysAdmin().then((retrievedSurveys)=> {
        setSurveys(retrievedSurveys.length?retrievedSurveys.map( sn => new Survey(sn.survey.id, sn.survey.title, new QuestionList().questions, sn.survey.submitted, sn.num)):retrievedSurveys) ;
        setCurrSurvey('') ;
        setQuestions([]) ;
        setTitle('') ;
        setTitleId('') ;
        setUpdatingSurvey(false) ;
      }) ;
      }
      else{
        API.loadAllSurveys().then((retrievedSurveys)=>{
          setSurveys(retrievedSurveys.length?retrievedSurveys.map( s => new Survey(s.id, s.title, new QuestionList().questions, s.submitted)):retrievedSurveys) ;
          setCurrSurvey('') ;
          setQuestions([]) ;
          setTitle('') ;
          setTitleId('') ;
          setUpdatingSurvey(false) ;

        }) ;

      }
  } ;
}, [updatingSurvey,currentUser, loggedIn]) ;
  useEffect(() => {
    if(updatingQuestion && currSurvey){
      if(currentUser!==''){
        API.loadQuestionSurvey(currSurvey.id).then((retrievedQuestions)=> {
        setQuestions
        (retrievedQuestions.length?retrievedQuestions.map( qa => new Question
            (qa.question.questionId, qa.question.description, qa.question.type, qa.question.minimum,qa.question.maximum,
              qa.answers))
          :retrievedQuestions) ;
        
        
          setUserQuestions
          (retrievedQuestions.length?retrievedQuestions.map( qa => new Question
            (qa.question.questionId, qa.question.description, qa.question.type, qa.question.minimum,qa.question.maximum,
              new AnswerList().answers))
          :retrievedQuestions) ;

        
          setUpdatingQuestion(false) ;
        }) ;
      }
      else if(currentUser==='' && loggedIn){
        if(currSurvey.submitted===1){
          if(currUserId!==''){
          API.loadQuestionSurveyUser(currUserId,currSurvey.id).then((retrievedQuestions)=> {
            setQuestions
            (retrievedQuestions.length?retrievedQuestions.map( qa => new Question
                (qa.question.id, qa.question.description, qa.question.type, qa.question.minimum,qa.question.maximum,
                  qa.answers))
              :retrievedQuestions) ;
              setUpdatingQuestion(false) ;
          })
          }
         else{
            API.loadUsersInfo(currSurvey.id).then((retrivedUserInfo)=>{
            setUserInfo(retrivedUserInfo) ;
            setUpdatingQuestion(false) ;
          })
          }
        }
        else if(currSurvey.submitted===0){
          API.loadQuestionSurvey(currSurvey.id).then((retrievedQuestions)=> {
            setQuestions
            (retrievedQuestions.length?retrievedQuestions.map( qa => new Question
                (qa.question.questionId, qa.question.description, qa.question.type, qa.question.minimum,qa.question.maximum,
                  qa.answers))
              :retrievedQuestions) ;
              setUpdatingQuestion(false) ;

          });
        }
      }
      API.retrieveMaxIdAnswer().then((retrievedId)=> setMaxIdAnswer(retrievedId.maxid) ) ;
      API.retrieveMaxIdQuestion().then((retrievedId)=> setMaxIdQuestion(retrievedId.maxid) ) ;
      API.retrieveMaxIdSurvey().then((retrievedId)=> setMaxIdSurvey(retrievedId.maxid) ) ;
    } ;

  }, [updatingQuestion,currSurvey, loggedIn, currUserId,currentUser]) ;
   // Function to do the login
   const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUpdatingSurvey(true)
    } catch(err) {
      return err ;
    }
  }
  const doEnterUser = async (name) => {
      setCurrentUser(name);
      API.createUser(name).then((retrievedId)=>{
        setUpdatingSurvey(true) ;
        setUserId(retrievedId) ;
      }) ;
  }
  
  // Function to do the logout
  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setSurveys([]) ;
    setQuestions([]) ;
    setUserInfo([]) ;
    setTitle('') ;
    setTitleId('') ;
    setCurrSurvey('') ;
    setMaxIdAnswer('') ;
    setMaxIdQuestion('') ;
    setMaxIdSurvey('') ;
    setCurrUserId('') ;
    setCurrentUser('') ;
    setUserId('') ;
    setUpdatingSurvey(true) ;
    setUpdatingQuestion(true) ;
  }
  const cleanAdmin = () => {
    setSurveys([]) ;
    setQuestions([]) ;
    setUserInfo([]) ;
    setTitle('') ;
    setTitleId('') ;
    setCurrSurvey('') ;
    setMaxIdAnswer('') ;
    setMaxIdQuestion('') ;
    setMaxIdSurvey('') ;
    setCurrUserId('') ;
    setUpdatingSurvey(true) ;
    setUpdatingQuestion(true) ;
  }

  const addSurvey = (newSurvey) => {
    API.addSurvey(newSurvey).then(()=>{
    setCurrSurvey('') ;
    setUpdatingSurvey(true) ;
    setUpdatingQuestion(true) ;
  }) ;
  } ;
  
  
  

  const changeFilter =(filter, id) =>{
    setTitle(()=>filter) ;
    setTitleId(()=>id) ;
    setCurrSurvey(()=>surveys.filter((s)=>s.id===id)[0]) ;
    setCurrUserId('') ;
    setUpdatingQuestion(true) ;
  }
  const submitSurvey = (surveyId) =>{
    for(let question of questions){
      API.postQuestion(question).then((questionId)=>{
        if(question.answers.length===0 )
        API.postQuestionSurvey(surveyId,questionId,"Free")
        else{
        for(let answer of question.answers){
          API.postQuestionSurvey(surveyId,questionId,answer.description);
        }
        }
      })
    }
    API.setSubmitted(surveyId).then(setUpdatingSurvey(true));
  }
  const submitSurveyUser = (surveyId)=>{
    for(let question of userQuestions){
      if(question.answers.length===0)
        API.postQuestionSurveyUser(surveyId, question.id,0,userId,'').then((res)=>{
          if(res===null){
          setSubmitRes("success") ;
          setMessage("Survey correctly submitted!") ;
          cleanUser() ;
          
          }
          else{
            setSubmitRes("danger") ;
            setMessage("There are some error with the db...") ;

          }
        }) ;
      else{
        for(let answer of question.answers) //anche se è risposta aperta ci sarà almeno un aswer di tipo free
        {
          API.postQuestionSurveyUser(surveyId,question.id,answer.id,userId,answer.text!==''? answer.text: "none").then((res)=>{
            if(res===null){
            setSubmitRes("success") ;
            setMessage("Survey correctly submitted!") ;
            cleanUser() ;
            
            }
            else{
              setSubmitRes("danger") ;
              setMessage("There are some error with the db...") ;

            }
          }) ;
        }
      }
    }
    //mettere feedback user
  }
  //STATIC
  const addQuestion = (newQuestion) => {
    let i=0 ;
     const q = new Question(maxIdQuestion+1, 
       newQuestion.description, 
       newQuestion.type, 
       newQuestion.minimum,
       newQuestion.maximum,
       newQuestion.answers.lenght!==0 ? 
       newQuestion.answers.map((a)=>{
         i+=1 ;
         return new Answer(maxIdAnswer+i,a)
       })
       :
       newQuestion.answers) ;
     setMaxIdQuestion( oldMaxId => oldMaxId + 1) ;
     setMaxIdAnswer(oldMaxId=> oldMaxId+i) ;
     setQuestions( oldQuestions => [...oldQuestions, q]) ;
   } ;
  const removeQuestion = (questionId) => {
    setQuestions( oldQuestions => oldQuestions.filter( (question) => question.id !== questionId )) ;
  } ;
  const changeOrder = (questionId, type) =>{
    let newArr = [...questions];
    for(let i=0; i< newArr.length; i++){
      if(newArr[i].id===questionId){
        if(type==="up" && i!==0){
          let tmp=newArr[i-1] ;
          newArr[i-1] = newArr[i] ;
          newArr[i] = tmp ;
          break ;
        }
        else if(type==="down" && i!==(newArr.length-1)){
          let tmp=newArr[i+1] ;
          newArr[i+1] = newArr[i] ;
          newArr[i] = tmp ;
          break ;
        }
        else{
          break ;
        }
      }
    }
    setQuestions(newArr);
    
  }
  const addTextQuestion=(question, text)=>{
    let newArr=[...userQuestions] ;
    for(let i=0; i< newArr.length; i++ ){
        if(newArr[i].id===question.id){
            newArr[i].answers=[...question.answers] ;
            newArr[i].answers[0].text=text;
        }
    }
    setUserQuestions(newArr) ;

  }
  const addAnswerQuestion = (question, answer) =>{
    let present=0 ;
    let newArr=[...userQuestions] ;
    for(let i=0; i< newArr.length; i++){
      if(newArr[i].id===question.id){
        for(let j=0; j< newArr[i].answers.length; j++){
          if(newArr[i].answers[j].id===answer.id){
            present=1 ;
            newArr[i].answers.splice(j,1) ;
          }
        }
        if(present===0){
          newArr[i].answers.push(new Answer(answer.id,answer.description)) ;
        }
      }
    }
    setUserQuestions(newArr) ;
  }
  const goForward = () => {
    let found=0 ;
    let last = 1;
    for(let user of userInfo){
      if(found ==1){
        setCurrUserId(user.userId) ;
        setCurrUserName(user.name) ;
        setUpdatingQuestion(true) ;
        last=0 ;
        break ;
      }
      if(user.userId===currUserId){
        found=1;

      }
    }
    if(last===1){
      setCurrUserId(userInfo[0].userId) ;
      setCurrUserName(userInfo[0].name) ;
      setUpdatingQuestion(true) ;

    }
  }
  const goBackward = () => {
    let back_user= '';
    for(let user of userInfo){
      if(user.userId===currUserId){
        break ;
      }
      back_user=user ;
    }
    if(back_user===''){
      setCurrUserId(userInfo[userInfo.length-1].userId) ;
      setCurrUserName(userInfo[userInfo.length-1].name) ;
      setUpdatingQuestion(true) ;
    }
    else{
    setCurrUserId(back_user.userId) ;
    setCurrUserName(back_user.name) ;
    setUpdatingQuestion(true) ;
    }
  }
  const retrieveQuestionsUser = (userId) =>{
    setCurrUserId(()=>userId) ;
    for(let user of userInfo){
      if(user.userId===userId){
        setCurrUserName(user.name) ;
      }
    }
    setUpdatingQuestion(true) ;
  }
  const cleanUser = () => {
    setSurveys([]) ;
    setQuestions([]) ;
    setTitle('') ;
    setTitleId('') ;
    setCurrSurvey('') ;
    setSubmitRes('') ;
    setMessage('') ;
    setUserQuestions([]) ;
    setMaxIdAnswer('') ;
    setMaxIdQuestion('') ;
    setMaxIdSurvey('') ;
    setCurrentUser('') ;
  }
  

  return (
    
       <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'
            render={() =>
              <>{loggedIn ?
                <Redirect to='/admin' /> :
                <Redirect to='/main'/>
                }
              </> 
            }
          />
          <Route  path='/main'
            render={() =>
              <>{currentUser==='' ?
                <MainPage enterUser={doEnterUser}></MainPage>
                :
                <Redirect to="/user"/>
                }
              </> 
            }
          />
          <Route path='/login'
            render={() => 
                <>{loggedIn ? 
                  <Redirect to="/admin" /> : 
                  <LoginPage login={doLogIn}/>
                  }
                </>
            }
          />
          <Route exact path='/user'
            render={() => 
                <>{currentUser==='' ? 
                  <Redirect to="/main" /> :
                  <UserPageEmpty survey={currSurvey} cleanUser={cleanUser} updatingSurvey={updatingSurvey} surveys={surveys} title={title} titleId={titleId} changeFilter={changeFilter}></UserPageEmpty>
                  }
                </>
            }
          />
          <Route path='/user/surveys/:id'>
           
          {currentUser==='' ? 
            <Redirect to="/main" /> :
            <UserPage 
            cleanUser={cleanUser}
            submitSurveyUser={submitSurveyUser} surveys={surveys} title={title} 
            titleId={titleId}
            userQuestions={userQuestions} addTextQuestion={addTextQuestion} 
            addAnswerQuestion={addAnswerQuestion}  changeFilter={changeFilter} 
            questions={questions} survey={currSurvey}
            submitRes={submitRes} setSubmitRes={setSubmitRes}
            message={message} setMessage={setMessage}
            updatingQuestion={updatingQuestion}
            updatingSurvey={updatingSurvey}
            ></UserPage>
          }
         </Route>
         <Route exact path='/admin'
         render={() => 
                <>{loggedIn ?
                   
                  <AdminPageEmpty 
                  cleanAdmin={cleanAdmin}
                  addSurvey={addSurvey} updatingSurvey={updatingSurvey} 
                  surveys={surveys} title={title}
                  titleId={titleId}
                  changeFilter={changeFilter}
                  logout={doLogOut} 
                  ></AdminPageEmpty>
                  :
                  <LoginPage login={doLogIn}/>
                  }
                </>
            }
          />
           <Route exact path='/admin/surveys/:id'
            render={() => 
                <>{loggedIn ? 
                  <AdminPage 
                  cleanAdmin={cleanAdmin}
                  addSurvey={addSurvey} submitSurvey={submitSurvey} survey={currSurvey} addQuestion={addQuestion} removeQuestion={removeQuestion} changeOrder={changeOrder}
                  surveys={surveys} title={title} titleId={titleId}
                  questions={questions} changeFilter={changeFilter} logout={doLogOut} 
                  updatingQuestion={updatingQuestion}
                  updatingSurvey={updatingSurvey}
                  userInfo={userInfo}
                  retrieveQuestionsUser={retrieveQuestionsUser}
                  ></AdminPage>
                  :
                  <LoginPage login={doLogIn}/>
                  }
                </>
            }
          />
          <Route path='/admin/surveys/reports/:id'
          render={() => 
            <>{loggedIn ? 
              <AdminPageReport 
              cleanAdmin={cleanAdmin}
              addSurvey={addSurvey}   survey={currSurvey} 
              surveys={surveys} title={title} titleId={titleId}  
              questions={questions} changeFilter={changeFilter} logout={doLogOut} 
              updatingQuestion={updatingQuestion}
              updatingSurvey={updatingSurvey}
              userInfo={userInfo}
              goForward={goForward}
              goBackward={goBackward}
              currUserId={currUserId}
              currUserName={currUserName}
              ></AdminPageReport>
              :
              <LoginPage login={doLogIn}/>
              }
            </>
        }
          />
        </Switch>
      </div>
    </Router>     
  );
}

export default App;
