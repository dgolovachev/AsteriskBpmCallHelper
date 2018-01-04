var moment = require('moment');
var direction = require("./../constants/asteriskConstants").Direction;

function pasreEventData(eventData, timeOffset) {
    if (!eventData) throw "eventData is undefined";
    timeOffset = timeOffset || -6;

    var recordingpath = "";
    if (eventData.recordingpath)
        recordingpath = eventData.recordingpath.split("monitor/")[1] || "";

    var startDate = moment(eventData.starttime).add(timeOffset, "hours").format("YYYY-MM-DD HH:mm:ss");
    var endDate = moment(eventData.endtime).add(timeOffset, "hours").format("YYYY-MM-DD HH:mm:ss");

    var callData = {};
    callData.status = eventData.disposition;
    callData.direction = eventData.destinationcontext;
    callData.startDate = startDate;
    callData.endDate = endDate;
    callData.src = recordingpath;

    switch (eventData.destinationcontext) {
        case direction.Outgoing:
            {
                callData.shortNumber = eventData.source;
                callData.number = eventData.destination;
            }; break;
        default: {
            callData.number = eventData.source;
            callData.shortNumber = eventData.destination;
        }; break;
    }

    return callData;
}

module.exports.pasreEventData = pasreEventData;