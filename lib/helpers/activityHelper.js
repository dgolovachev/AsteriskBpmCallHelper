var titleHelper = require("./titleHelper");
var direction = require("./../constants/asteriskConstants").Direction;
var bpmConstants = require("./../constants/bpmConstants");

function createActivityData(callData, userData, relationData) {
    if (!callData) throw "callData is undefined"
    if (!userData) throw "userData is undefined"
    if (!relationData) throw "relationData is undefined"

    var activityData = {};
    switch (callData.direction) {
        case direction.Incoming:
            {
                activityData.title = titleHelper.getIncomingCallTitle(callData, relationData, userData);
                activityData.resultId = bpmConstants.activityResult.complete;
                activityData.statusId = bpmConstants.activityStatus.end;
            }; break;
        case direction.IncomingNotWorkTime:
            {
                activityData.title = titleHelper.getIncomingCallTitle(callData, relationData, userData);
                activityData.resultId = bpmConstants.activityResult.noAnswer;
                activityData.statusId = bpmConstants.activityStatus.cancel;
            }; break;
        case direction.Outgoing:
            {
                activityData.title = titleHelper.getOutgoingCallTitle(callData, relationData, userData)
                activityData.resultId = bpmConstants.activityResult.complete;
                activityData.statusId = bpmConstants.activityStatus.end;
            }; break;
        default: return ;
    }

    activityData.contact = relationData.contact;
    activityData.account = relationData.account;
    activityData.lead = relationData.lead;
    activityData.ownerId = userData.bpmId;
    activityData.startDate = callData.startDate;
    activityData.endDate = callData.endDate;
    activityData.src = callData.src;
    return activityData;
}

module.exports.createActivityData = createActivityData;