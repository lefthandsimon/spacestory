'use strict';
var Alexa = require("alexa-sdk");

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var enginesOn;
var marcIntro;
var speech;
var listen;

var handlers = {
    'LaunchRequest': function () {
        init();
        speech = "beep boop beep boop. Hello Human. I am your multi-purpose automated robotic companion. But you can call me Marc. Can you say my name?";
        listen = "I'm Marc, can you say my name?";
        this.response.speak(speech).listen(listen);
        this.emit(':responseReady');

    },
    'MarcIntent': function () {
        console.log("MarcIntent");
        if(marcIntro)
        {
          this.emit('NameIntent');
        }
        console.log("marc value = " + this.event.request.intent.slots.marc.value);
        if(this.event.request.intent.slots.marc.value.toLowerCase() === "mark" || this.event.request.intent.slots.marc.value.toLowerCase() === "marc"){
          console.log("");
          speech = "That's right! Great work. what is your name human?";
          listen = "Don't be shy, what is your name?";
          marcIntro = true;
        }
        else{
          speech = "Hmmm, that's not quite right. My name is Marc. Can you say my name?";
          listen = "My name is Marc.Can you say my name?";

        }

        this.response.speak(speech).listen(listen);
        this.emit(':responseReady');
    },
    'NameIntent' : function (){
      console.log("NameIntent");
      speech = "It's a pleasure to meet you" + this.event.request.intent.slots.name.value +". Today, I want to take you on an exciting adventure in my really rapid rocket. So, get your space boots on and get ready as we take a ‘trip to the stars’. Theme Music goes here. Space is a long way up and we can't climb a ladder or get a lift to take us there. So we're going to get in my really rapid rocket. The door should open automatically, so I'll just walk at it and... SFX BONG! Ow! The door didn't open and I walked right into it! Hmm… I think we need to tell the rocket to open the door. Can you help me? On the count of three shout ‘Let me in’ as loud as you can. 1,2,3.";
      listen = "Can you help me? On the count of three shout ‘Let me in’ as loud as you can. 1,2,3";
      this.response.speak(speech).listen(listen);
      this.emit(':responseReady');
    },
    'LetMeInIntent' : function (){
      speech = "That's it! Great shouting. Now we can go inside the rocket. BACKGROUND BEEPS/COMPUTER SOUNDS. You sit down in the pilot's chair. I need your help to fly the rocket. That's good. Now, there are two buttons in front of me, a red button, and a green button. One of these buttons will start the rocket's engines. Which button should I press 'red' or 'green'?";
      listen = "One of these buttons will start the rocket's engines. Which button should I press 'red' or 'green'?";
      this.response.speak(speech).listen(listen);
      this.emit(':responseReady');
    },
    'RedOrGreenIntent' : function(){
      if(this.event.request.intent.slots.redOrGreen.value.indexOf('green') !== -1 && !enginesOn){
        enginesOn = true;
        speech = "That's the one. I can hear the engines starting. F/X:                      ENGINE RUMBLING + COMPUTER BEEPS. We need a countdown to lift-off. Can you count from 5 to 1 with me? Here we go. 5, 4, 3, 2, 1. We have lift off! Hold on tight! F/X: ROCKET LAUNCH + FLYING RUMBLE -  (LOUD) To get off the Earth and into space the rocket has to go really fast. We're currently flying 300 times faster than a car! It's very noisy in here because of the rockets burning and all the air rushing past us. F/X:                      ROCKET LAUNCH + FLYING RUMBLE. SILENCE. Wow. Now, we're out in space amongst the stars. It's very quiet because there is no air in space to make the noise. But there are great views! Look out of the window. There are tiny twinkling lights all around us. Too many to even count. How many stars do you think there are in space?";
        listen = "How many stars do you think there are in space?"

      }else if(this.event.request.intent.slots.redOrGreen.value.indexOf('green') !== -1 && enginesOn){
        speech = "That button doesn't seem to work. The engines are still on. Let's try again. Which button should I press 'red' or 'green'?";
        listen = "Let's try again. Which button should I press 'red' or 'green'?";
      }else if (this.event.request.intent.slots.redOrGreen.value.indexOf('red') !== -1 && enginesOn){
        speech = "That's the right one. The engines have turned off. F/X:  WHISTLING FALLING SOUND. MARC:(LOUD) It's very noisy again cos we're close to the Earth now and there's lots of air rushing past us. Even though the engines are turned off we're still going very fast. But don't worry we can use a giant parachute to help slow us down and land safely. It's voice activated, so I need you to shout 'parachute' loudly to help us land. On the count of three shout 'parachute'. 1, 2, 3.";
        listen = "On the count of three shout 'parachute'. 1, 2, 3.";
      }else if(this.event.request.intent.slots.redOrGreen.value.indexOf('red') !== -1 && !enginesOn){
        speech = "That button doesn't seem to work. Let's try again. Which button should I press 'red' or 'green'?";
        listen = "Let's try again. Which button should I press 'red' or 'green'?";
      }

      this.response.speak(speech).listen(listen);
      this.emit(':responseReady');

    },
    'HowManyStarsIntent': function(){
      speech = "Good answer! There are over 100 billion stars in our galaxy. If you tried to count them all it would take you over 300 years! But there aren't just stars in space, there's lots of things to look at. Like that comet over there. F/X: TWINKLING ICY COMET SOUND – RISING. Comets are big blocks of ice and dust that travel through space. They can be as small as an ice cube or as big as an iceberg. But hang on this one seems to be getting bigger. Oh no! That means it's heading straight for us. If the comet hits us will be smashed to pieces!  Quick we need to move out of its way. Which way should we go, up, down, left or right?";
      listen = "we need to move out of the comet's way. Which way should we go, up, down, left or right?";
      this.response.speak(speech).listen(listen);
      this.emit(':responseReady');
    },
    'UpDownLeftRightIntent': function(){
      speech = "F/X:  WHOOSH OF COMET PASSING + SCRAPE OF METAL (COMET BRUSHING SIDE OF ROCKET) Phew! That was quick thinking. We we're almost in big trouble then. F/X: WARNING SIREN + SOUND OF AIR ESCAPING. Oh no! The comet must have damaged the rocket. If you listen carefully you can hear the air escaping. F/X: SOUND OF AIR ESCAPING. We need to fix the hole fast or else we'll run out of air. All I've got is a banana or some super sticky glue. Which should I use to fix the hole 'the banana' or 'the glue'?";
      listen = "Which should I use to fix the hole 'the banana' or 'the glue'?";
      this.response.speak(speech).listen(listen);
      this.emit(':responseReady');

    },
    'BananaOrGlueIntent' : function(){
      if(this.event.request.intent.slots.bananaOrGlue.value === 'banana'){
        speech = "Arrgh! The banana got sucked out into space. What should I use now? I've got another banana or some super sticky glue. Which should I use to fix the hole 'the banana' or 'the glue'?";
        listen = "Which should I use to fix the hole 'the banana' or 'the glue'?";
      }else{
        speech = "SUCCESS BEEP. Phew I’m glad that’s sorted. Now, I think that’s enough adventuring for one day. Let’s turn the ship around and head home. F/X: ROCKET WHOOSH. Now, to get back safely to Earth we need to turn off the engines so we don't go too fast and crash into the ground.There are two buttons in front of me, a red button, and a green button.One of these buttons will stop the rocket's engines. Which button should I press red or green?";
        listen = "Let's try that again. Which button should I press red, or green?";
      }

        this.response.speak(speech).listen(listen);
        this.emit(':responseReady');
    },
    'ParachuteIntent' : function(){
      speech = "Brilliant! The parachute is opening. F/X:  PARACHUTE OPENING + WHISTLING STOPS. Now, we will gently land with a small bump. F/X:  BUMP + SOUND OF MARC FALLING OVER . Arrgh! I fell out of my chair. You were very clever to wear your seat belt. (PAUSE) . Phew. What a great adventure?! I hope you had fun taking a trip into space. Why not come visit me again for another adventure? I could really use a brilliant explorer like you to help out. Now, I better go because it's time for my tea. Thanks for all your help. I hope to see you again soon. Goodbye! GRAMS: THEME MUSIC";
      this.response.speak(speech);
      this.emit(":responseReady");
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        init();
        this.response.speak('See you soon!');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" +
            " name is awesome Aaron'");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('See you next time!');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that");
    }
};

const init = () =>{
  enginesOn = false;
  marcIntro = false;
}
