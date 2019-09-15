'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  requestify = require('requestify'),
  app = express().use(bodyParser.json()),
  PAT = 'EAAHX10M1JFwBACLhrcMds7SbLGQCD7Fi5zfkMdNJZABTr3RZCZBeZBsSl0JLHlrOdTSQDjBc6UNRxYkpyoPaBZC7hPQrZBOZCx55QuformoZBbgQo55Xtsi2zYZBRAp9Eyna6qO45z30UgMXGn4W8QSLGQaQPR5q4gAu5RoiSggkbggZDZD';

requestify.post('https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+PAT,
      {  "get_started": {"payload": "Hi"},      
        
    "greeting": [
    {
      "locale":"default",
      "text":"Welcome to the Football Page" 
    }
  ]

      }).then(function(success){
          console.log('persistent_menu success');
        }).fail(function(error){
          console.log('PM Error:', error);
        })

// Sets server port and logs message on success


app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));



// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "518794522207324"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});



// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {


    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      var senderID = webhook_event.sender.id;
      console.log('senderID', senderID);
      if(webhook_event.postback){
      var userPostBack = webhook_event.postback.payload;
      console.log('reply', userPostBack);
    }
    if(webhook_event.message){if(webhook_event.message.text){
          var userInput = webhook_event.message.text;
          console.log('userText', userInput);
        }
        if(webhook_event.message.attachments){
          var userPictureInput = webhook_event.message.attachments;
          console.log('userImage', userPictureInput);
        }}

        //Welcome Message
      if (userInput == 'Hi' || userPostBack == 'Hi'){
requestify.get('https://graph.facebook.com/'+senderID+'?fields=first_name,last_name,profile_pic&access_token='+PAT)
      .then(function (fbprofile){
        var fbdetails = []
        var fbprofilejson = JSON.parse(fbprofile.body);
        console.log('fbprofile', fbprofilejson.first_name);
        fbdetails.push(fbprofilejson.first_name);
        console.log(fbdetails)
requestify.post('https://graph.facebook.com/v4.0/me/messages?access_token='+PAT,
      {        
        "recipient":{
    "id":senderID
  },
  "message":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Hi "+fbdetails[0]+"! Please share your information with us so you can use our service",
        "buttons":[
          {
            "type": "web_url",
            "url": "google.com",
            "title": "Register",
            "webview_height_ratio": "tall"
          }
        ]
      }
    }
  }
      }).then(function(success){
          console.log('success');
        }).fail(function(error){
          console.log('Welcome Fail:', error);
        });
      })
      
      }



    });


    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

