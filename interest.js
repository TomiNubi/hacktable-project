

module.exports ={
     getLevelOfInterest: function (student, responses){
    var studentId = student.studentId
    var studentEmail = student.studentEmail
    var studentName = student.studentName

    const speechToTextFromAPI = responses.getMessagesResponse.messages
    const analyticsFromAPI = responses.getAnalyticsResponse
    const questionsfromAPI = responses.getQuestionsResponse.questions

    /*

    Structure of 'student' object
     student ={
        name: 
        id:
        email
    }
    */

    var totalPointsSentiment = 0
    var totalPointsTalkingTime= 0
    var culmulatedScore = 0

    
    //flitering to all the statements made the student
    var student_textToSpeech = []
    

    for (var speech of speechToTextFromAPI){
        
        if(speech.from.email === studentEmail){
          
            student_textToSpeech.push(speech);
        }
    }

  //  console.log("studentTextTospeech"+student_textToSpeech)

    //getting the analytics for talking time:

    var talkingTimes = []
    var studentTalkingTime = 0;
    
        // talkingTimes = body.members.map(item => item.talkTime.seconds)
        
        for (var member of analyticsFromAPI.members){
            
            talkingTimes.push(member.talkTime.seconds)
            if(member.name === studentName){
                studentTalkingTime = member.talkTime.seconds
                console.log("initial talktime" + studentTalkingTime)
            }
        }

    //I'm using the average sentiment
        
    for(var speech of student_textToSpeech){
        totalPointsSentiment+= speech.sentiment.polarity.score
    }
    var studentTextsOnly = student_textToSpeech.map(item => item.text)

    var studentQuestions = 0
    for (var question of questionsfromAPI){
        if (studentTextsOnly.includes(question)){
            studentQuestions++
        }
    }

    var studentQuestionPercent = ((studentTextsOnly.length/studentTalkingTime) * studentQuestions) /studentTalkingTime

    console.log("studentextomly" + studentTalkingTime)
    console.log("StudentQuestionPercent" + studentQuestionPercent)
    var avgPointsSentiment = totalPointsSentiment/student_textToSpeech.length

    var culmulatedScore = avgPointsSentiment + studentQuestionPercent

    //culmulatedscore is between -1 to 2
    var finalScore = (culmulatedScore+1)/3
    console.log("FinalScore" + finalScore)
    return finalScore

    

}
}