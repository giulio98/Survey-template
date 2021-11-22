'use strict';

const express = require('express');
const morgan = require('morgan') ;
const surveysDao = require('./surveys-dao.js') ;
const { body, validationResult } = require('express-validator') ;
const session = require('express-session') ; 
const passport = require('passport') ;
const passportLocal = require('passport-local') ;
const adminDao = require('./admin-dao.js') ;
// Passport initialization
// (local strategy uses 'username' by default)
passport.use(new passportLocal.Strategy((username, password, done) => {
  // verification callback for authentication
  adminDao.getUser(username, password).then(user => {
    if (user)
      done(null, user);
    else
      done(null, false, { message: 'Wrong username or Password!' });
  }).catch(err => {
    // db error
    done(err);
  });
}));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  adminDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// init express 
const port = 3001;
const app = new express();
app.use(morgan('dev')) ;
app.use(express.json()) ;

// Middleware to check if the session is authenticated or not
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'Not authenticated' });
} ;
// Session initialization
app.use(session({
  secret: 'this and that and other', 
  resave: false,
  saveUninitialized: false
}));
// Making passport use session cookies
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
  res.send('Server currently active.')
}) ;
app.get('/api/user/surveys', async (req,res) => {
  try {
      let surveys = await surveysDao.getAllSurveys() ;
      res.json(surveys) ;
      } catch(error) {
          res.status(500).json(error) ;
      }
}) ;
//function to retrieve all surveys for an admin
app.get('/api/surveys', isLoggedIn, async (req,res) => {
  try {
      let surveys = await surveysDao.getAdminSurveys(req.user.id) ;
      let surveysUsers = await Promise.all(surveys.map(async (s)=>{
        let numUser = await surveysDao.getNumUser(s.id) ;
        return {survey:s,num:numUser} ;
      }));
      console.log(surveysUsers)
      res.json(surveysUsers) ;
      } catch(error) {
          res.status(500).json(error) ;
      }
}) ;
//function to create a survey
app.post('/api/surveys',[
  body('title', "Title required!").notEmpty(),
  body('submitted', "Submitted should be a Boolean!").isBoolean() 
  ],
  isLoggedIn,
  async (req, res) => {
  const errors = validationResult(req) ;
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() }) ;
  }
  let title = req.body.title ;
  let submitted = req.body.submitted ;

  try{
  let lastID = await surveysDao.createSurvey({title: title, submitted: submitted}, req.user.id) ;
  res.json(lastID) ;
  res.end() ;
  } catch(error) {
      res.status(500).json(error) ;
  }
}) ;
//function to get questions and answers
app.get('/api/surveys/:id', async (req,res) => {
  const id = req.params.id ;

      try{
        let questions = await surveysDao.getAllQuestions(id) ;
        let questionsAnswer= await Promise.all(questions.map(async (q)=>
        {
          let answers = await surveysDao.getClosedAnswers(id, q.questionId);
          console.log(answers)
          return{question:q, 
            answers: answers }
        })) ;
        res.json(questionsAnswer) ;
        res.end() ;
      }
      catch{
          res.status(500).json(error)
      }
    
      
     
}) ;
//function to post a question

app.post('/api/surveys/question',[
  body('questionDescription', "Question Description is required!").notEmpty(),
  body('type', "Type is required!").notEmpty(),
  body('minimum', "Minimum is required!").notEmpty(),
  body('maximum', "Maximum is required!").notEmpty(),
  ],
  isLoggedIn,
  async (req, res) => {
  const errors = validationResult(req) ;
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() }) ;
  }
  let questionDescription = req.body.questionDescription ;
  let type = req.body.type ;
  let minimum = req.body.minimum ;
  let maximum = req.body.maximum ;

  try{
  let lastIDQuestion = await surveysDao.createQuestion(questionDescription,type,minimum,maximum) ;
  res.json(lastIDQuestion) ;
  res.end() ; 
  } catch(error) {
      res.status(500).json(error) ;
  }
}) ;
//function to post a questionAnswer to Survey

app.post('/api/surveys/:id',[
  body('answerDescription', "Answer Description is required!").notEmpty(),
  body('questionId', "Question Id is required!").notEmpty(),
  ],
  isLoggedIn,
  async (req, res) => {
  const errors = validationResult(req) ;
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() }) ;
  }
  const id = req.params.id ;
  let answerDescription = req.body.answerDescription ;
  let questionId= req.body.questionId ;

  try{
  let lastIDAnswer = await surveysDao.createAnswer(answerDescription) ;
  await surveysDao.createQuestionToSurvey(id,questionId,lastIDAnswer) ;
  res.json() ;
  res.end() ; 
  } catch(error) {
      res.status(500).json(error) ;
  }
}) ;

app.put('/api/surveys/setsubmitted/:id', isLoggedIn, async (req, res) => {
  let id = req.params.id ;

  try{
  let ID = await surveysDao.setSubmitted(id) ;
  res.json(ID) ;
  res.end() ;
  } catch(error) {
      res.status(500).json(error) ;
  }
}) ;
app.post('/api/user/:name', async(req,res)=>{
  const name = req.params.name ;
  try{
    let lastIdUser= await surveysDao.createUser(name) ;
    res.json(lastIdUser) ;
    res.end() ;


  }
  catch(error){
    res.status(500).json(error) ;

  }

})
//get n user
app.get('/api/surveys/submitted/:id', isLoggedIn, async(req,res) =>{
  const surveyId= req.params.id ;
  try {
    let nUser = await surveysDao.getNumUser(surveyId) ;
    console.log(nUser)
    res.json(nUser) ;
    } catch(error) {
        res.status(500).json(error) ;
    }
})
//get useridname
app.get('/api/surveys/submitted/listusers/:id', isLoggedIn, async(req,res)=>{
  const surveyId= req.params.id ;
  try {
    let users = await surveysDao.getUsersInfo(surveyId) ;
    res.json(users) ;
    } catch(error) {
        res.status(500).json(error) ;
    }

})
//get question and answer user
app.get('/api/surveys/submitted/user/:id&:surveyId', isLoggedIn, async(req,res)=>{
  const userId = req.params.id ;
  let surveyId = req.params.surveyId ;
  try{
  let surveysUser = await surveysDao.getSurveyUser(userId,surveyId) ;
  console.log(surveysUser) ;
  let questionAnswers = await  Promise.all(surveysUser.map(async (row)=>{ //contiene questionId: questionId e answers: [answerId]
    let question = await surveysDao.getQuestionUser(row.questionId) ; //prendo da question
    let answers =await Promise.all(row.answers.map(async (aid)=>{
      if(aid.answerId===0)
        return({answerId:0, description:"none",text:"none"})
      else{
      let returnedAnswers= await surveysDao.getAnswerUser(aid.answerId, question.id, surveyId, userId) ;
      return returnedAnswers;
      }
    }));
    console.log(answers) ;
    console.log(answers) ;
    return {question: question, answers:answers}
  }))
  res.json(questionAnswers) ;
  res.end() ;
  }
  catch{
    res.status(500).json(error)
  }

})
app.get('/api/surveys/submitted/user/answer/:id', isLoggedIn, async(req,res)=>{
  const answerId= req.params.id;
  try{
    let answers =await surveysDao.getAnswerUser(answerId) ;
    res.json(answers) ;
    res.end();
  }

  catch{
    res.status(500).json(error) ;
  }
})

/*** Users APIs ***/

// Function for Login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});
 
// Function for Logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

// Function to check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});
app.get('/api/maxanswerid', async (req,res) => {
  try {
      let result = await surveysDao.getMaxIdAnswer() ;
      res.json(result) ;
      } catch(error) {
          res.status(500).json(error) ;
      }
}) ;
app.get('/api/maxquestionid', async (req,res) => {
  try {
      let result = await surveysDao.getMaxIdQuestion() ;
      res.json(result) ;
      } catch(error) {
          res.status(500).json(error) ;
      }
}) ;
app.get('/api/maxsurveyid', async (req,res) => {
  try {
      let result = await surveysDao.getMaxIdSurvey() ;
      res.json(result) ;
      } catch(error) {
          res.status(500).json(error) ;
      }
}) ;
//user
app.post('/api/user/surveys/:id',[
  body('questionId', "question Id is required!").notEmpty(),
  body('answerId', "answer Id is required!").notEmpty(),
  body('userId', "user Id is required!").notEmpty(),
  ],
  async (req, res) => {
  const id = req.params.id ;
  let questionId= req.body.questionId ;
  let answerId= req.body.answerId ;
  let userId = req.body.userId ;
  let text = req.body.text ;
  

  try{
  let result= await surveysDao.createQuestionToSurveyUser(id,questionId,answerId, userId, text) ;
  res.json(result) ;
  res.end() ; 
  } catch(error) {
      res.status(500).json(error) ;
  }
}) ;

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});