var callStatus = require("./../constants/asteriskConstants").Status;
var direction = require("./../constants/asteriskConstants").Direction;

function getIncomingCallTitle(callData, relationData, user) {
    if (!callData || !callData.number || !callData.shortNumber) throw "callData is undefined";
    if (!relationData) throw "relationData is undefined";
    if (!user || !user.name) throw "user is undefined";

    var name = "";
    var account = "";
    if (relationData.contact && relationData.contact.Name) name = relationData.contact.Name;
    if (relationData.account && relationData.account.Name) account = relationData.account.Name;
    else
        if (relationData.lead && relationData.lead.Name) account = relationData.lead.Name;
    if (callData.status == callStatus.Answered && callData.direction == direction.Incoming)
        return `Вх.звонок Звонили с : ${callData.number}, ${name}, ${account} Ответил: ${callData.shortNumber}, ${user.name}`;
    else
        return `Пропущеный звонок Звонили с : ${callData.number}, ${name}, ${account} Кому: ${callData.shortNumber}, ${user.name}`;
}

function getOutgoingCallTitle(callData, relationData, user) {
    if (!callData || !callData.number || !callData.shortNumber) throw "callData is undefined";
    if (!relationData) throw "relationData is undefined";
    if (!user || !user.name) throw "user is undefined";

    var name = "";
    var account = "";
    if (relationData.contact && relationData.contact.Name) name = relationData.contact.Name;
    if (relationData.account && relationData.account.Name) account = relationData.account.Name;
    else
        if (relationData.lead && relationData.lead.Name) account = relationData.lead.Name;
    return `Исх.звонок на: ${callData.number}, ${name}, ${account} Звонил: ${callData.shortNumber}, ${user.name}`;
}

module.exports.getIncomingCallTitle = getIncomingCallTitle;
module.exports.getOutgoingCallTitle = getOutgoingCallTitle;