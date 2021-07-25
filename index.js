var analyticsResponse = require("./sampleResponses/getAnalytics")
var questionsResponse = require("./sampleResponses/getQuestions")
var messagesResponse = require("./sampleResponses/getMessages")
var trackersResponse = require("./sampleResponses/getTrackers")

var getLevelofUnderstanding = require("./understanding")
var getLevelOfInterest = require("./interest")


// import { messagesResponse } from "./sampleResponses/getMessages";

// import { questionsResponse } from "./sampleResponses/getQuestions";
// import { trackersResponse } from "./sampleResponses/getTrackers";
// import { getLevelofUnderstanding } from "./understanding";
// import { getLevelOfInterest} from "./interest";

const student ={
    studentName: "Bob builder",
    studentEmail: "bob@builder.com",
    studentId: "a52def45-be6e-484f-908b-9ac66eaecabb",
}
const response = {
    getMessagesResponse: messagesResponse.messagesResponse,
    getAnalyticsResponse: analyticsResponse.analyticsResponse,
    getQuestionsResponse: questionsResponse.questionsResponse,
    getTrackersResponse: trackersResponse.trackersResponse
}
var interestScore = getLevelOfInterest.getLevelOfInterest(student, response)
var levelofUnderstandingScore = getLevelofUnderstanding.getLevelofUnderstanding(student, response)

console.log(interestScore, levelofUnderstandingScore)


