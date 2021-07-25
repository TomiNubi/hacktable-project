const {sdk, SpeakerEvent} = require("symbl-node");
const appId = "42444d347074654f68584d726c6167355950526c676e657a4958636150525048";
const appSecret = "62534753426269305f57726f6a6e444c774b3473516a33734b78447436784959694454584e4562766349676178653953544b34724e454a79586550466b5f5275";

sdk.init({
  appId: appId,
  appSecret: appSecret,
  basePath: "https://api.symbl.ai",
}).then(async() => {
  console.log('SDK initialized.');
  try {
    const phoneNumber = "358972522471"; // US Zoom Numbers are "+16465588656", or "+14086380968".
    const meetingName = "Hacktable";
    const emailAddress = "tomisin.ogunnubi2020@gmail.com";

    const ZOOM_MEETING_ID = "91830207256";
    const ZOOM_PARTICIPANT_ID = "";
    const ZOOM_MEETING_PASSCODE = "384222";

    let dtmfSequence = `${ZOOM_MEETING_ID}#`;

    if (ZOOM_PARTICIPANT_ID) {
    dtmfSequence += `,,${ZOOM_PARTICIPANT_ID}#`;
    } else {
    dtmfSequence += `,,#`;
    }

    if (ZOOM_MEETING_PASSCODE) {
    dtmfSequence += `,,${ZOOM_MEETING_PASSCODE}#`;
    }


    sdk.startEndpoint({
    endpoint: {
        type: "pstn",
        phoneNumber: phoneNumber,
        dtmf: dtmfSequence,
    },
    actions: [
        {
        invokeOn: "stop",
        name: "sendSummaryEmail",
        parameters: {
            emails: [
            emailAddress
            ],
        },
        },
    ],
    data: {
        session: {
        name: meetingName,
        },
    },
    }).then((connection) => {
    const connectionId = connection.connectionId;
    console.log('connection', connection);
    console.log("Successfully connected.", connectionId);
    console.log('Full Conection Object', JSON.stringify(connection, null, 2));
    console.log("Calling into Zoom now, please wait about 30-60 seconds.");
    })
    .catch((err) => {
    console.error("Error while starting the connection", err);
    });
  } catch (e) {
    console.error(e);
  }
}).catch(err => console.error('Error in SDK initialization.', err));