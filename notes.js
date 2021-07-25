const authOptions = {
  method: 'post',
  url: "https://api.symbl.ai/oauth2/token:generate",
  body: {
    type: "application",
    appId: appId,
    appSecret: appSecret
  },
  json: true
};
request(authOptions, (err, res, body) => {
  if (err) {
    console.error('error posting json: ', err);
    throw err
  }
  
  accessToken = body.accessToken;
  console.log(JSON.stringify(body, null, 2));
});

const connection e = {
  _connectionId: '32e92f23-a30b-438e-8390-b3189cc535be',
  _webSocketUrl: 'wss://api.symbl.ai/events/32e92f23-a30b-438e-8390-b3189cc535be',
  _eventUrl: 'https://api.symbl.ai/v1/event/32e92f23-a30b-438e-8390-b3189cc535be',
  _status: 'active',
  _summaryInfo: null,
  _conversationId: '5306245918490624',
  _subscribers: {},
  _pushSpeakerEvents: false,
  _eventApi: e {
    webSocketUrl: 'wss://api.symbl.ai/events/32e92f23-a30b-438e-8390-b3189cc535be',
    eventUrl: 'https://api.symbl.ai/v1/event/32e92f23-a30b-438e-8390-b3189cc535be',
    options: { pushSpeakerEvents: false },
    connection: [Circular],
    eventsQueue: t {
      _events: [i <Complex prototype>],
      _eventsCount: 1,
      _carryoverConcurrencyCount: false,
      _isIntervalIgnored: true,
      _intervalCount: 0,
      _intervalCap: Infinity,
      _interval: 0,
      _intervalEnd: 0,
      _intervalId: undefined,
      _timeoutId: undefined,
      _queue: [e],
      _queueClass: [Function: e],
      _pendingCount: 0,
      _concurrency: 1,
      _isPaused: false,
      _resolveEmpty: [Function: c],
      _resolveIdle: [Function: c],
      _timeout: undefined,
      _throwOnTimeout: false
    },
    eventCount: 0,
    connectWebSocket: [Function: bound value],
    onConnectWebSocket: [Function: bound value],
    onErrorWebSocket: [Function: bound value],
    onMessageWebSocket: [Function: bound value],
    onCloseWebSocket: [Function: bound value],
    publishResults: [Function: bound value],
    apiClient: o {
      basePath: 'https://api.symbl.ai',
      authentications: [Object],
      defaultHeaders: {},
      timeout: 60000,
      cache: true,
      enableCookies: false,
      agent: [c],
      requestAgent: null
    },
    maxWaitTimeForWebSocketConnectionEstablishmentInSeconds: 60,
    webSocketConnectionEstablishmentPollInterval: 250,
    webSocketStatus: 'not_connected'
  }
}











connection e {
  _connectionId: '9ffafd33-f2de-4447-846f-54765f1274c8',
  _webSocketUrl: 'wss://api.symbl.ai/events/9ffafd33-f2de-4447-846f-54765f1274c8',
  _eventUrl: 'https://api.symbl.ai/v1/event/9ffafd33-f2de-4447-846f-54765f1274c8',
  _status: 'active',
  _summaryInfo: null,
  _conversationId: '6263255698767872',
  _subscribers: {},
  _pushSpeakerEvents: false,
  _eventApi: e {
    webSocketUrl: 'wss://api.symbl.ai/events/9ffafd33-f2de-4447-846f-54765f1274c8',
    eventUrl: 'https://api.symbl.ai/v1/event/9ffafd33-f2de-4447-846f-54765f1274c8',
    options: { pushSpeakerEvents: false },
    connection: [Circular],
    eventsQueue: t {
      _events: [i <Complex prototype>],
      _eventsCount: 1,
      _carryoverConcurrencyCount: false,
      _isIntervalIgnored: true,
      _intervalCount: 0,
      _intervalCap: Infinity,
      _interval: 0,
      _intervalEnd: 0,
      _intervalId: undefined,
      _timeoutId: undefined,
      _queue: [e],
      _queueClass: [Function: e],
      _pendingCount: 0,
      _concurrency: 1,
      _isPaused: false,
      _resolveEmpty: [Function: c],
      _resolveIdle: [Function: c],
      _timeout: undefined,
      _throwOnTimeout: false
    },
    eventCount: 0,
    connectWebSocket: [Function: bound value],
    onConnectWebSocket: [Function: bound value],
    onErrorWebSocket: [Function: bound value],
    onMessageWebSocket: [Function: bound value],
    onCloseWebSocket: [Function: bound value],
    publishResults: [Function: bound value],
    apiClient: o {
      basePath: 'https://api.symbl.ai',
      authentications: [Object],
      defaultHeaders: {},
      timeout: 60000,
      cache: true,
      enableCookies: false,
      agent: [c],
      requestAgent: null
    },
    maxWaitTimeForWebSocketConnectionEstablishmentInSeconds: 60,
    webSocketConnectionEstablishmentPollInterval: 250,
    webSocketStatus: 'not_connected'
  }
}

Successfully connected. 9ffafd33-f2de-4447-846f-54765f1274c8
Error while starting the connection TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'e'
    |     property '_eventApi' -> object with constructor 'e'
    --- property 'connection' closes the circle
    at JSON.stringify (<anonymous>)
    at C:\Users\tomis\Documents\hacktable-project\index.js:58:47
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
