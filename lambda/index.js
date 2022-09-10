/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const dbh = require("./DBHistoria.js");
//ascenso ubico invocation name
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola y bienvenido, te contaré la historia de la caída de Jorge Úbico en esta primera parte.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const finanzasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope)=== 'getExplicacionEconomica';
    },
    handle(handlerInput) {
        const finanzas1 = handlerInput.requestEnvelope.request.intent.slots.nivel.value;
        const finanzas2 = handlerInput.requestEnvelope.request.intent.slots.economia.value;
        const finanzas3 = handlerInput.requestEnvelope.request.intent.slots.finanzas.value;
        const usufructo1 = handlerInput.requestEnvelope.request.intent.slots.insatisfaccion.value;
        const usufructo2 = handlerInput.requestEnvelope.request.intent.slots.conflictos.value;
        const usufructo3 = handlerInput.requestEnvelope.request.intent.slots.usufructo.value;
        const enganchamiento1 = handlerInput.requestEnvelope.request.intent.slots.enganchamiento.value;
        const vagancia1 = handlerInput.requestEnvelope.request.intent.slots.vagancia.value;
        const campesinado = handlerInput.requestEnvelope.request.intent.slots.campesinado.value;
        const terrateniente = handlerInput.requestEnvelope.request.intent.slots.terrateniente.value;
        //slot: funcionesPopulistas:[poder, populista]
        var speakOutput;
        if (finanzas1 || finanzas2 || finanzas3) {
             speakOutput = dbh.dbhistorias[2].historiaP1;   
        } else if (usufructo1 || usufructo2 || usufructo3) {
             speakOutput = dbh.dbhistorias[3].historiaP2;
        } else if (enganchamiento1) {
            speakOutput = dbh.dbhistorias[4].historiaP3;
        } else if (vagancia1){
            speakOutput = dbh.dbhistorias[5].historiaP4;
        } else if (campesinado){
            speakOutput = dbh.dbhistorias[6].historiaP5;
        } else if(terrateniente){
            speakOutput = dbh.dbhistorias[7].historiaP6;
        } else {
            var help = "No me has preguntado algo";
        }
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(help)
            .getResponse();
    }
};

const EleccionesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ubicoPreparado'
                
    },
    handle(handlerInput) {
        const eleccionesSlot = handlerInput.requestEnvelope.request.intent.slots.elecciones.value;
        //slot: funcionesPopulistas:[poder, populista]
        if (eleccionesSlot) {
            var speakOutput = dbh.dbhistorias[0].historiaP0;    
        } else {
            var help = "No has dicho nada";
        }
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(help)
            .getResponse();
    }
};
const AsumiendoElPoderIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope)=== 'getFuncionesPopulistas';
    },
    handle(handlerInput) {
        const populistaSlot1 = handlerInput.requestEnvelope.request.intent.slots.poder.value;
        const populistaSlot2 = handlerInput.requestEnvelope.request.intent.slots.funciones.value;
        //slot: funcionesPopulistas:[poder, populista]
        var speakOutput;
        if (populistaSlot1 || populistaSlot2) {
             speakOutput = dbh.dbhistorias[1].funcionesPopulistas;   
        } else {
            var help = "No has dicho nada";
        }
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(help)
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        EleccionesIntentHandler,
        AsumiendoElPoderIntentHandler,
        finanzasIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();