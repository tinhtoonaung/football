'use strict';

// Imports dependencies and set up http server
const
    express = require('express'),
    bodyParser = require('body-parser'),
    requestify = require('requestify'),
    ejs = require('ejs'),
    app = express().use(bodyParser.json()),
	admin = require('firebase-admin'),
    PAT = 'EAAHX10M1JFwBACLhrcMds7SbLGQCD7Fi5zfkMdNJZABTr3RZCZBeZBsSl0JLHlrOdTSQDjBc6UNRxYkpyoPaBZC7hPQrZBOZCx55QuformoZBbgQo55Xtsi2zYZBRAp9Eyna6qO45z30UgMXGn4W8QSLGQaQPR5q4gAu5RoiSggkbggZDZD';

//Add this in HTML
//<meta http-equiv = "refresh" content = "0; url = https://www.messenger.com/closeWindow/?image_url=https://png2.cleanpng.com/sh/8008181eacb2d3a476a83ec9eab8ae15/L0KzQYm3VsA3N6NrgpH0aYP2gLBuTfdzbaduhdtFLYbsfra0kP9qdqUyh9g2c3HvdX75hgN1aaZ3edD9LXbyf7W0gwJwa15ph9DuLUXlQYnoUPIyPZVmUKMCLkm1QIG3UsczOWY3UKU9MEa4R4SBU8YveJ9s/kisspng-grevimiz-vine-point-of-sale-restaurant-food-broc-done-5b18a0b15da817.9200027215283406573836.png&display_text=Done" />

const serviceAccount = ({
    "type": "service_account",
    "projectId": "football-project-e6829",
    "private_key_id": "3dc6aa45c981d829bd6d2295e7fb9d3b4d697440",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1U56sPqtxEAi8\nQSTXUsITc7qYvbyGmIx5L/djFvDHJkJ9CvvPOuv3sKXWjdh1FmRyye5JE5bDq0bC\n0PsVIch4BtdUDzuKTMKEIyzojBwW7TTk6mnUJBg/ZXIHPZ1zRpdfksc1uEY9EWCF\ng+sM/QlWKNKMuXW+plFK0tfH+rdx6GWHkP7qz3Wz6RXPVZee67pftIRcZBlzDkCz\ng08wz44DaJ8/TAExlNyPYmTU3c4uYNBb308zaLtgBUc9/E33VBd3uaobZFDUGx/m\nOrPNA+YeN3R47xuMRoamRzcvvT8PJgobd01LavGG7BwF4DZv7xRftgEJJqJWjPcl\nv/3Uc2azAgMBAAECggEACe/YsLjIfWwzBloNkk1DPHypm6g+NiQTAqspxADkVg2X\nNDIPZaZlew/vrqfcVmJRQ+ckC1Yq+3Md8BwyvlA5I7bAQyeIjEYznLkuw1m2Sl1a\nejcMcKc/uu2sx4/NWp1iO0cYaq28D6mtn/OARJhzVAjtrO+W78k+iDqwv5FST0gk\n73lRD1PYB6FfQCDbP8R4uRVAf3JNkuTvaDyS9ktV9rUOnQuEgCjGctXZ9k2K8K7W\nM07MOiXwQD2fnCOLXDU6r3TK/hmrqf47phKu5F0jZrwBIhuBJ/ieCd2ezwIyhAAK\nxF1mfajIlUvnGU3/w0TPy4FzoEcuWhmapbGTEIESDQKBgQDicdZmGTREikYulZOC\n0ZK90jeT1M5mqBhEvJp84KKtEdquAI4kBTPde/yU5NQqCBTntCe/TFWYvQ4kkp9g\nEQ6X/hJLsqApJuIG2kVglmz5MazZXgU5RtJakS4J3QneetvAFCo0It0Q+r+n/JZ7\nZ8bPRozUsDpurjO+Ebl4m+BufwKBgQDM/kKPXS2cMMVyU82aA7fTEG4bkXidbjnI\n/MqVvC2Sthsfv2RDMn1AQL7j66dUXzGCEuLBRHl/7bX2B5+KO59IL0+XgvxEyFop\nT+9pTndLTpfNUEGlSyL7+FNmX36zNrI7LGPh4IG+CujRCodGis6hqujerAxW678Q\nSQGDLxWVzQKBgErFXA4KdH/NSK9JJJQlr1aOe1uNATpUdu77d+eUJSMQqiyaclTi\nguW3cweXJ5dZY82+ZwF7qyfsBSd+YrHN8AuwEUp9iPUNqcSpfg8OnJ0MEg8URJVN\nFVhiZ9lJ62BTIQyjm+vrNyPMKEzH0sic08DNguMX7bNuQheYsq1oiwrxAoGBAI4W\nhyg8G8sxewp9z/s7LIWd09REBuiIaIFJx1n2b1hL5Y0h6msxaePJfQcaZody3Cwe\nzxHLVrQ3nnKEYi88mHE+adrJLfa3MNeF0pqZitKmDU6AnJ/n7r3cKGLDOl0aQnwF\njs4YAZYqlamftJhOyl8AyhzeAEeXbH3rPKMjVcDZAoGBAM1v4cqOcsiJJW0p9gdO\n6XWKSm4alJ2JnyNKnVLZ26NRezR/pvarrHZpE/zyZnYaCq3+hNt5DO6JmZjt3LRC\nnKiKzbx/7MHBfHCC+TSY77dK/fepRoDuoDV9oZ+/G3gkPBCzDNitcqwcMwPE71W2\naNfQ52wVs7OK5omr1y1A5f86\n-----END PRIVATE KEY-----\n",
    "client_email": "football-project-e6829@appspot.gserviceaccount.com",
    "client_id": "113742160940448332286",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/football-project-e6829%40appspot.gserviceaccount.com"
});

//  //admin.initializeApp(admin.credential.cert(serviceAccount));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/register/:id', function (req, res) {
    res.render('index.ejs', {  msgnrID: `${req.params.id}` } )
})

function quickReply(senderId, Text, quickReply) {
    requestify.post('https://graph.facebook.com/v5.0/me/messages?access_token=' + PAT,
        {
            "recipient": {
                "id": senderId
            },
            "messaging_type": "RESPONSE",
            "message": {
                "text": Text,
                "quick_replies": quickReply
            }
        }
    ).then(success => {
        console.log('success');
    }).catch(err => {
        console.log(err);
    })
}

function textMessage(senderId, Text) {
    requestify.post('https://graph.facebook.com/v5.0/me/messages?access_token=' + PAT,
        {
            "recipient": {
                "id": senderId
            },
            "messaging_type": "RESPONSE",
            "message": {
                "text": Text
            }
        }
    ).then(success => {
        console.log('success');
    }).catch(err => {
        console.log(err);
    })
}

function carouselMessage(senderId, elements) {
    requestify.post('https://graph.facebook.com/v5.0/me/messages?access_token=' + PAT,
        {
            "recipient": {
                "id": senderId
            },
            "message": {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": elements
                    }
                }
            }
        }

    ).then(success => {
        console.log('success');
    }).catch(err => {
        console.log(err);
    })
}

requestify.post('https://graph.facebook.com/v2.6/me/messenger_profile?access_token=' + PAT,
    {
        "get_started": { "payload": "Hi" },

        "greeting": [
            {
                "locale": "default",
                "text": "Welcome to the Football Page"
            }
        ]

    }).then(function (success) {
        console.log('persistent_menu success');
    }).fail(function (error) {
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
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            var senderID = webhook_event.sender.id;
            if (webhook_event.postback) {
                var userInput = webhook_event.postback.payload;
            }
            if (webhook_event.message) {
                if (webhook_event.message.text) {
                    var userInput = webhook_event.message.text;
                }
                if (webhook_event.message.attachments) {
                    var userPictureInput = webhook_event.message.attachments;
                }
                if (webhook_event.message.quick_reply) {
                    var userInput = webhook_event.message.quick_reply.payload;
                }
            }

            //Welcome Message
            if (userInput == 'Hi') {
                requestify.get('https://graph.facebook.com/' + senderID + '?fields=first_name,last_name,profile_pic&access_token=' + PAT)
                    .then(function (fbprofile) {
                        var fbdetails = []
                        var fbprofilejson = JSON.parse(fbprofile.body);
                        console.log('fbprofile', fbprofilejson.first_name);
                        fbdetails.push(fbprofilejson.first_name);
                        console.log(fbdetails)
                        requestify.post('https://graph.facebook.com/v5.0/me/messages?access_token=' + PAT,
                            {
                                "recipient": {
                                    "id": senderID
                                },
                                "message": {
                                    "attachment": {
                                        "type": "template",
                                        "payload": {
                                            "template_type": "button",
                                            "text": "Hi " + fbdetails[0] + "! Please share your information with us so you can use our service",
                                            "buttons": [
                                                {
                                                    "type": "web_url",
                                                    "url": `https://footballproject.herokuapp.com/register/${senderID}`,
                                                    "title": "Register",
                                                    "webview_height_ratio": "tall"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }).then(function (success) {
                                console.log('success');
                            }).fail(function (error) {
                                console.log('Welcome Fail:', error);
                            });
                    })
            }
            if (userInput == 'Team') {
                db.collection('Players').where('MessengerId', '==', `${senderID}`).get().then(playerList => {
                    playerList.forEach(playerDetails => {
                        if (playerDetails.data().team) {

                        } else {
                            var payload = [{
                                "content_type": "text",
                                "title": "Create 😎",
                                "payload": "CreateTeam"
                            }, {
                                "content_type": "text",
                                "title": "Join 😁",
                                "payload": "JoinTeam"
                            }]
                            quickReply(senderID, 'Do you wish to create or join?', payload)
                        }
                    })
                })
            }
            if (userInput == 'CreateTeam') {

            }
            if (userInput == 'JoinTeam') {
                var dbTeams = []
                db.collection('Team').get().then(teamList => {
                    teamList.forEach(teamDetails => {
                        if (teamDetails.data().status == 'Incomplete') {
                            var a = {
                                    "title": `${teamDetails.data().name}`,
                                    "image_url": `${teamDetails.data().image}`,
                                    "subtitle": `Rating: ${teamDetails.data().rating}`,
                                    "buttons": [{
                                        "type":"postback",
                                        "title":"Apply 📋",
                                        "payload":`Apply ${teamDetails.data().name}`
                                    }]
                            }
                            dbTeams.push(a)
                        }
                    })
                    carouselMessage(senderID,dbTeams)
                })
            }
            if (userInput == 'Match') {
                var payload = [{
                                "content_type": "text",
                                "title": "Team 🛡",
                                "payload": "MatchTeam"
                            }, {
                                "content_type": "text",
                                "title": "Solo 😎",
                                "payload": "MatchSolo"
                            }]
                            quickReply(senderID, 'Do you wish to create or join?', payload)
            }
            if (userInput == 'MatchTeam') {
                var dbTeams = []
                db.collection('Team').get().then(teamList => {
                    teamList.forEach(teamDetails => {
                        if (teamDetails.data().status == 'Complete') {
                            var a = {
                                    "title": `${teamDetails.data().name}`,
                                    "image_url": `${teamDetails.data().image}`,
                                    "subtitle": `Rating: ${teamDetails.data().rating}`,
                                    "buttons": [{
                                        "type":"postback",
                                        "title":"Challenge ⚽️",
                                        "payload":`Challenge ${teamDetails.data().name}`
                                    }//,{
                                        //"type": "web_url",
                                        //"url": //coming soon,
                                      //  "title": "View Stats 🧐",
                                    //}
                                    ]
                            }
                            dbTeams.push(a)
                        }
                    })
                    carouselMessage(senderID,dbTeams)
                })
            }
            if (userInput.includes('Challenge')){
                var userInputArray = userInput.split(' ')
                var TeamName = userInputArray[1]
                db.collection("Team").where('name','==',`${TeamName}`).get().then(teamList => {
                    teamList.forEach(teamDetails => {
                        db.collection("Team").where('adminID', '==', `${senderID}`).get().then(challengerList => {
                            challengerList.forEach(challengerDetails => {
                                var payload = [{
                                    "content_type": "text",
                                    "title": "Yes ⚽️",
                                    "payload": `Accept ${TeamName} ${challengerDetails.data().name} ${senderID}`
                                }, {
                                    "content_type": "text",
                                    "title": "No 😌",
                                    "payload": `Decline ${senderID} ${TeamName}`
                                }]
                                quickReply(teamDetails.data().adminID, `${challengerDetails.data().name} has challenged you to a match. Would you like to Accept?`, payload)
                            })
                        })
                    })
                })
            }
            if (userInput.includes('Decline')){
                var userInputArray = userInput.split(' ')
                var notiId = userInputArray[1]
                var TeamName = userInputArray[2]
                textMessage(notiId, `${TeamName} has declined your challenge 😒`)
            }
            if (userInput.includes('Accept')){
                var userInputArray = userInput.split(' ')
                var TeamName = userInputArray[1]
                var challengerName = userInputArray[2]
                var notiId = userInputArray[3]
                var locations = []
                db.collection("Location").get().then(locationList => {
                    locationList.forEach(locationDetails => {
                        var a = {
                                    "title": `${locationDetails.data().name}`,
                                    "image_url": `${locationDetails.data().image}`,
                                    "subtitle": `Rating: ${locationDetails.data().address}`,
                                    "buttons": [{
                                        "type":"postback",
                                        "title":"Pick Field ✅",
                                        "payload":`ChooseField ${notiId} ${locationDetails.data().name} ${locationDetails.data().address} ${challengerName}`
                                    }]
                                }
                                locations.push(a)
                    })
                    carouselMessage(senderID,locations)
                })
            }
            if (userInput.includes('ChooseField')){
                var userInputArray = userInput.split(' ')
                var notiId = userInputArray[1]
                var fName = userInputArray[2]
                var fAdd = userInputArray[3]
                var payload = [{
                                    "content_type": "text",
                                    "title": "Yes ⚽️",
                                    "payload": `ConfirmLocation ${senderID} ${fName}`
                                }, {
                                    "content_type": "text",
                                    "title": "No 😌",
                                    "payload": `Hi`
                                }]
                quickReply(notiId, `The opponent Team has picked ${fName} in ${fAdd}. Ready?`, payload)
            }
            if (userInput.includes('ConfirmLocation')){
                var userInputArray = userInput.split(' ')
                var notiId = userInputArray[1]
                var fName = userInputArray[2]
                var date = new Date()
                var today = `${(date.getDate())+1} ${(date.getMonth())+1} ${(date.getYear())}`
                db.collection("Team").where('adminID','==',`${notiId}`).get().then(teamList => {
                    teamList.forEach(teamDetails => {
                        db.collection('Match').doc().set({
                            date: today,
                            team1: teamDetails.data().name,
                            team2: userInputArray[4],
                            location: fName
                        })
                    })
                })
                textMessage(notiId, `Match Confirmed!`)
                textMessage(senderID, `Match Confirmed`) 
            }
        });


        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});

