//This is meant to measure the students understanding

const { get } = require("request")


module.exports = {
     
    getLevelofUnderstanding : function (student, responses){
    var studentId = student.studentId
    var studentEmail = student.studentEmail
    var studentName = student.studentName

    /*
    Structure of 'student' and 'teacher' objects
     student ={
        name: 
        id:
        email
    }
   
    */

    const speechToTextFromAPI = responses.getMessagesResponse.messages
    const analyticsFromAPI = responses.getAnalyticsResponse
    const questionsfromAPI = responses.getQuestionsResponse.questions
    const trackersFromAPI = responses.getTrackersResponse

    var totalPointsQuestions = 0
    var totalPointsTrackers= 0
    var culmulatedScore = 0
    

    /*
        0-33% : Low undertanding
        34- 67% : Medium understanding
        67 - 100% : High understanding

        There will be an option for the teacher to give feedback to the algorithm on whether the correct prediction was made and this will enable it improve overtime

     */
    //this includes: text snippets members and sentiment analysis

    /* The different testing metrics

    
    */

    //checking the amount of questions asked by the student

    // request.get({
    //     url: `https://api.symbl.ai/v1/conversations/${conversationId}/questions`,
    //     headers: { 'Authorization': `Bearer ${authToken}` },
    //     json: true
    // }, (err, response, body) => {
    //     questionsfromAPI = body.questions
        
    // });

    //getting the analytics for talking time:

    var student_talkingTime = 0
    
    for (var member of analyticsFromAPI.members){
        console.log(member.name, studentName)
        if (member.name === studentName){
            student_talkingTime = member.talkTime.seconds
            console.log(student_talkingTime)
        }
    }
/*
    request.get({
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/analytics`,
        headers: { 'Authorization': `Bearer ${authToken}` },
        json: true
    }, (err, response, body) => {
        for (var member in body.members){
            if (member.name === studentName){
                student_talkingTime = member.talkTime.time
            }
        }
    });
*/

    //getting all the statements made in that conversation
    
    // request.get({
    //     url: `https://api.symbl.ai/v1/conversations/${conversationId}/messages?sentiment=true`,
    //     headers: { 'Authorization': `Bearer ${authToken}` },
    //     json: true
    // }, (err, response, body) => {
    //     speechToTextfromAPI = body.messages;
    // });

    //flitering to all the statements made the student
   
    var student_textToSpeech = [] 
    
    for (var speech of speechToTextFromAPI){
        
        if(speech.from.email === studentEmail){
            student_textToSpeech.push(speech);
        }
    }


    //get all questions said by the student

    var studentQuestions = 0
    var studentTextsOnly = student_textToSpeech.map(item => item.text)
    var studentQuestionSentiment = 0

    for (var question of questionsfromAPI){
        if (studentTextsOnly.includes(question)){
            studentQuestions++
            let i = studentTextsOnly.indexOf(question)
            studentQuestionSentiment += student_textToSpeech[i].sentiment.polarity.score
        }
    }

    //this checks the amount of questions asked by the student as a percentage of the total sentences they say
   // we average out this value

    //var studentQuestionPercent = (studentQuestions/studentTextsOnly) * student_talkingTime

    //This first calculates the average talktime per paragraph, then multiples it by the number of questions asked to get the average total question time
    //This value is then divided by total talk time to get the percent of time spent aksing questions by the student
    var studentQuestionPercent = ((studentTextsOnly.length/student_talkingTime) * studentQuestions) /student_talkingTime
    console.log(student_talkingTime, studentQuestions)
    var avgQuestionSenitment = studentQuestionSentiment/studentQuestions 
    console.log(avgQuestionSenitment)
    totalPointsQuestions = studentQuestionPercent * avgQuestionSenitment



    var trackers = [{
        name: "low-understand",
        vocabulary: ["I don't understand", "It's confusing", "Wrong", "Incorrect"]
    },
    {
        name: "med-understand",
        vocabulary:[]
    },
    {
        name: "high-understand",
        vocabulary: ["I understand", "It makes sense", "I get it"]
    }
    

    ]

    //use trackers with negative phrase. I cant use this with the zoom meeting thing but I can now just try with a recorded video which also allows me to access the members/ But then they all use the conversation id thing
    
    var totalLowUnderstand = 0
    var totalMedUnderstand = 0
    var totalHighUnderstand = 0

    
    for (var tracker of trackersFromAPI){
       

            for (var match of tracker.matches){
                for (var messageRef in match.messageRefs ){
                    if (studentTextsOnly.includes(messageRef.text)){
                        if(tracker.name === "low-understand"){
                             totalLowUnderstand++
                         }
                         if(tracker.name === "med-understand"){
                            totalMedUnderstand++
                        }
                        if(tracker.name === "high-understand"){
                            totalHighUnderstand++
                        }
                }
            }
            
        }
    }
            //add a math function to account for the offset value
            //for now we'll just count the amount of trackers realted to the student indicating low understanding

            //get percentage of low-understanding, med-understanding and high understanding

        var totalTrackers = totalLowUnderstand +totalMedUnderstand+ totalHighUnderstand                    
        
        totalPointsTrackers = ((totalLowUnderstand/totalTrackers * -1) + (totalMedUnderstand/totalTrackers *0.5) + (totalHighUnderstand/totalTrackers * 1))

    //get the matches for the tracker, compare it with the sentences said by the students so see which ones they have
    //as an extension you could check the actual time point when the student said what they said
    // for the entities we have to ensure that this in in reference to te teacher, this is difficult to determine so we'll leave it as an extension

    //currently we'll just do it based on the words of the students indicating a lack of understanding during the class


    //Final complilation

    culmulatedScore = totalPointsTrackers + totalPointsQuestions

    //totalPointsTrackerScale = -1 to 1
    //totalPointsQuestionsScale = -1 to 1
    //culmulatedScoreScale = -2 to 2

    //How do I shrink a scale of -2 to 2 to a scale of 0 to 1 where -2 = 0 and 2 = 1
    //Find a more efficent way but for now:

    var finalUnderstandingPercentage = (culmulatedScore+2)/4

    return finalUnderstandingPercentage



}
}


