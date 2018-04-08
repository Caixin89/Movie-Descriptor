/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a sample skill built with Amazon Alexa Skills nodejs
 * skill development kit.
 * This sample supports multiple languages (en-US, en-GB, de-GB).
 * The Intent Schema, Custom Slot and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-howto
 **/

'use strict';

const Alexa = require('alexa-sdk');
const http = require('http');


const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).
var languageStrings = {
}

const handlers = {
    //Use LaunchRequest, instead of NewSession if you want to use the one-shot model
    // Alexa, ask [my-skill-invocation-name] to (do something)...
    'LaunchRequest': function () {
        this.attributes.speechOutput = 'Welcome to movie descriptor';
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes.repromptSpeech = 'Please say that again';
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'describe_movie': function () {
        const movieSlot = this.event.request.intent.slots.movie_name;
        let movieName;
        if (movieSlot && movieSlot.value) {
            movieName = movieSlot.value.toLowerCase();
        }
        var movie_title = movieName.split(' ').join('+');
        var url='http://www.omdbapi.com/?t=' + movie_title + '&apikey=bc809026'
        this.attributes.repromptSpeech = 'Please say that again';
        var request = http.get(url, res => {
          res.setEncoding("utf8");
          let body = "";
          res.on("data", data => {
            body += data;
          });
          res.on("end", () => {
            body = JSON.parse(body);
            if (body && body['Plot']) {
                this.attributes.speechOutput = body['Plot'];
            }
            else {
                this.attributes.speechOutput = 'Please try with a different movie title'
            }
            this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
            this.emit(':responseReady');
        });
      });
    request.setTimeout(30000, function() {
        console.log("HTTP Get time-out!")
    });        
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = 'I give short summaries of movies';
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.attributes.speechOutput = ''
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.attributes.speechOutput = 'Request cancelled'
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.speechOutput);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.attributes.speechOutput = "I don't get what you said"
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.speechOutput);
        this.emit(':responseReady');
    },
    "SessionEndedRequest": function () {
        console.log(`Session ended in help state: ${this.event.request.reason}`);
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
