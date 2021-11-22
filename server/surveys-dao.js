/* Data Access Object (DAO) module for accessing surveys table of surveys.db */

'use strict' ;

const db = require('./db') ;

exports.getAllSurveys = () =>{
    return new Promise((resolve,reject) =>{
        let query="SELECT * FROM surveys_admin WHERE submitted=1" ;
        db.all(query,[],(err,rows)=>{
            if (err) {
                reject (err) ;
                return ;
              };
      
              const surveys = rows.map((s) => ({
                id : s.id, 
                adminId : s.adminId, 
                title : s.title, 
                submitted : s.submitted
               }) ) ;
      
              resolve(surveys) ;

        }) ;
    }) ;
}
exports.getAdminSurveys = (id) =>{
    return new Promise((resolve,reject) =>{
        let query=`SELECT * FROM surveys_admin WHERE adminId="${id}"` ;
        db.all(query,[],(err,rows)=>{
            if (err) {
                reject (err) ;
                return ;
              };
      
              const surveys = rows.map((s) => ({
                id : s.id, 
                adminId : s.adminId, 
                title : s.title, 
                submitted : s.submitted
               }) ) ;
      
              resolve(surveys) ;

        }) ;
    }) ;
}
exports.createSurvey = (survey, adminId) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT into surveys_admin (adminId, title , submitted) VALUES (?, ?, ?)` 
      db.run(query, [adminId, survey.title, survey.submitted], function(err) {
        if (err) {
          reject(err) ;
          return ;
        } 
        resolve(this.lastID) ;
      }) ;
    }) ;
} ;
exports.getAllQuestions = (surveyId) => {
    return new Promise((resolve,reject) =>{
        let query=`SELECT surveyId, questionId, Q.description, Q.type, Q.minimum, Q.maximum
                   FROM surveys S, questions Q
                   WHERE S.surveyId="${surveyId}" AND
                   S.questionId=Q.id
                   GROUP BY surveyId, questionId` ;
        db.all(query,[],(err,rows)=>{
            if (err) {
                reject (err) ;
                return ;
              };
      
              const questions = rows.map((q) => ({
                surveyId : q.surveyId, 
                questionId : q.questionId, 
                description : q.description, 
                type : q.type,
                minimum : q.minimum,
                maximum : q.maximum
               }) ) ;
      
              resolve(questions) ;

        }) ;
    }) ;

}
exports.getClosedAnswers = (surveyId, questionId) =>{
    return new Promise((resolve,reject) =>{
        let query=`SELECT answerId, A.description
                   FROM surveys S, answers A
                   WHERE S.surveyId="${surveyId}" AND
                   S.questionId="${questionId}" AND
                   S.answerId= A.id` ;
        db.all(query,[],(err,rows)=>{
            if (err) {
                reject (err) ;
                return ;
              };
      
              const answers = rows.map((a) => ({
                answerId : a.answerId,
                description : a.description
                
               }) ) ;
      
              resolve(answers) ;

        }) ;
    }) ;

}
exports.createAnswer = (description) =>{
    return new Promise((resolve, reject) => {
        const query = `INSERT into answers (description) VALUES (?)` 
        db.run(query, [description], function(err) {
          if (err) {
            reject(err) ;
            return ;
          } 
          resolve(this.lastID) ;
        }) ;
    }) ;

}
exports.createQuestion = (description, type, minimum, maximum) =>{
    return new Promise((resolve, reject) => {
        const query = `INSERT into questions (description, type, minimum, maximum) VALUES (?, ?, ?, ?)` 
        db.run(query, [description, type, minimum, maximum], function(err) {
          if (err) {
            reject(err) ;
            return ;
          } 
          resolve(this.lastID) ;
        }) ;
    }) ;

}
exports.createQuestionToSurvey = (surveyId,questionId,answerId) =>{
    return new Promise((resolve, reject) => {
        const query = `INSERT into surveys (surveyId, questionId, answerId) VALUES (?, ?, ?)` 
        db.run(query, [surveyId, questionId, answerId], function(err) {
          if (err) {
            reject(err) ;
            return ;
          } 
          resolve() ;
        }) ;
    }) ;

}
exports.setSubmitted = (id) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE surveys_admin SET submitted = "1" WHERE id = ?`;
    db.run(query, [id], function(err) {
      if(err) {
        reject(err) ;
      }
      else if (this.changes !== 0){
        resolve(id) ;
      }
      else {
        resolve([{"Error":"element not existing!"}]) ;
      }
    }) ;
  }) ;
} ;
// get max Task id
exports.getMaxIdAnswer = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT MAX(id) as maxid FROM answers';
    db.get(sql, [], (err, row) => {
      if (err) {
        reject(err) ;
        return ; 
      }
      if (row == undefined) {
        resolve({error: 'Error retrieving max id.'});
      } else {
        const result = {
          maxid : row.maxid } ;
        resolve(result);
      }
    });
  });
};
exports.getMaxIdQuestion = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT MAX(id) as maxid FROM questions';
    db.get(sql, [], (err, row) => {
      if (err) {
        reject(err) ;
        return ; 
      }
      if (row == undefined) {
        resolve({error: 'Error retrieving max id.'});
      } else {
        const result = {
          maxid : row.maxid } ;
        resolve(result);
      }
    });
  });
};
exports.getMaxIdSurvey = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT MAX(id) as maxid FROM surveys_admin';
    db.get(sql, [], (err, row) => {
      if (err) {
        reject(err) ;
        return ; 
      }
      if (row == undefined) {
        resolve({error: 'Error retrieving max id.'});
      } else {
        const result = {
          maxid : row.maxid } ;
        resolve(result);
      }
    });
  });
};
exports.createUser = (name) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT into user (name) VALUES (?)` 
    db.run(query, [name], function(err) {
      if (err) {
        reject(err) ;
        return ;
      } 
      resolve(this.lastID) ;
    }) ;
}) ;

}
//user
exports.createQuestionToSurveyUser = (id,questionId,answerId, userId, text) =>{
  return new Promise((resolve, reject) => {
    const query = `INSERT into surveys_user (surveyId, questionId, answerId, userId, text) VALUES (?, ?, ?, ?, ?)` 
    db.run(query, [id, questionId, answerId, userId, text], function(err) {
      if (err) {
        reject(err) ;
        return ;
      } 
      resolve() ;
    }) ;
}) ;

}
exports.getNumUser=(surveyId) =>{
  return new Promise((resolve,reject) =>{
    let query=`SELECT COUNT(distinct userId) as n FROM surveys_user WHERE
               surveyId="${surveyId}"` ;
    db.all(query,[],(err,rows)=>{
        if (err) {
            reject (err) ;
            return ;
          };
          
          resolve(rows[0].n) ;

    }) ;
}) ;

}
exports.getUsersInfo = (surveyId) => {
  return new Promise((resolve,reject) =>{
    let query=`SELECT DISTINCT(userId), name FROM surveys_user, user
              WHERE surveyId="${surveyId}" AND
              surveys_user.userId=user.id` ;
    db.all(query,[],(err,rows)=>{
        if (err) {
            reject (err) ;
            return ;
          };
  
          resolve(rows) ;

    }) ;
}) ;

}
exports.getSurveyUser=(userId,surveyId) =>{
  return new Promise((resolve,reject) =>{
    let query=`SELECT * FROM surveys_user WHERE
               surveyId="${surveyId}" AND userId="${userId}"` ;
    db.all(query,[],(err,rows)=>{
        if (err) {
            reject (err) ;
            return ;
        };
        
        const rowsQA =rows.map((r)=>({
          questionId : r.questionId,
          answerId : r.answerId

        }));
      
        const result=Object.values(rowsQA.reduce((r, {questionId, answerId}) => {
          let key = questionId ;
          (r[key] || (r[key] = {questionId, answers: []})).answers.push({answerId});
          return r;
        }, {}));
        
        resolve(result) ;

    }) ;
}) ;

}
exports.getQuestionUser=(questionId)=>{
  return new Promise((resolve,reject) =>{
    let query=`SELECT * FROM questions WHERE
               id="${questionId}"` ;
    db.all(query,[],(err,rows)=>{
        if (err) {
            reject (err) ;
            return ;
        };
        const result =rows.map((r)=>({
          id : r.id,
          description : r.description,
          type : r.type,
          minimum : r.minimum,
          maximum : r.maximum

        }));
        resolve(result[0]) ;

    }) ;

});
}
exports.getAnswerUser=(answerId, questionId, surveyId, userId) =>{
  return new Promise((resolve,reject) =>{
      let query=`SELECT * FROM answers, surveys_user WHERE id="${answerId}"
       AND id=surveys_user.answerId AND 
       surveys_user.questionId=${questionId} AND
       surveys_user.surveyId=${surveyId} AND
       surveys_user.userId=${userId}
       ` ;
      db.all(query,[],(err,rows)=>{
          if (err) {
              reject (err) ;
              return ;
            };
    
            const answer = rows.map((a) => ({
              answerId: a.id,
              description : a.description,
              text : a.text
             }) ) ;
    
            resolve(answer[0]) ;

      }) ;
  }) ;

}

