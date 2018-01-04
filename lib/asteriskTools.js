var logger = require("./logger");
var asteriskConstants = require("./constants/asteriskConstants");
var CallStrategy = require("./strategy/callStrategy");
var IncomingCallStrategy = require("./strategy/incomingCallStrategy");
var IncominCallNotWorkTimeStrategy = require("./strategy/incominCallNotWorkTimeStrategy");
var OutgoingCallStrategy = require("./strategy/outgoingCallStrategy");

function AsteriskEventHandler(eventData) {
    if (!eventData) throw "eventData is undefined";
    if (eventData.event != asteriskConstants.Events.AfterEndCall) return;

    var callStrategy = new CallStrategy(eventData);

    switch (eventData.destinationcontext) {
        case asteriskConstants.Direction.Incoming: callStrategy.setStrategy(new IncomingCallStrategy()); break;
        case asteriskConstants.Direction.IncomingNotWorkTime: callStrategy.setStrategy(new IncominCallNotWorkTimeStrategy()); break;
        case asteriskConstants.Direction.Outgoing: callStrategy.setStrategy(new OutgoingCallStrategy()); break;
        default: return;
    }

    callStrategy.execute((err, result) => {
        if (err) logger.error(err);
        else logger.info(result);
    });
}

module.exports = AsteriskEventHandler;