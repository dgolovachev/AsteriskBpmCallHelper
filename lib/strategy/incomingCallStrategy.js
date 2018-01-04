var bpmManager = require("./../bpmManager");
var usersHelper = require("./../helpers/usersHelper");
var callHelper = require("./../helpers/callHelper");
var activityHelper = require("./../helpers/activityHelper");

function IncomingCallStrategy() { }

IncomingCallStrategy.prototype.execute = function (eventData, callback) {
  var callData = callHelper.pasreEventData(eventData);
  var userData = usersHelper.getUserDataByShortNumber(callData.shortNumber);

  bpmManager.getRelationByPhone(callData.number, (err, relationData) => {
    if (err) return callback(err, null);
    var activityData = activityHelper.createActivityData(callData, userData, relationData);
    if (!activityData) throw "activityData is undefined";

    bpmManager.insertActivity(activityData,
      (err, result) => {
        if (err) callback(err, null);
        else callback(null, result);
      })
  })
}

module.exports = IncomingCallStrategy;

/*
входящий  поднято
{ event: 'Cdr',
  privilege: 'cdr,all',
  accountcode: '',
  source: '0707331818',
  destination: '507',
  destinationcontext: 'from-did-direct',
  callerid: '"Golovachev Dmitriy" <0707331818>',
  channel: 'SIP/sip559-0000000a',
  destinationchannel: 'SIP/507-0000000b',
  lastapplication: 'Dial',
  lastdata: 'SIP/507,10,TtrIM(auto-blkvm)',
  starttime: '2017-07-08 18:06:57',
  answertime: '2017-07-08 18:07:00',
  endtime: '2017-07-08 18:07:17',
  duration: '20',
  billableseconds: '17',
  disposition: 'ANSWERED',
  amaflags: 'DOCUMENTATION',
  uniqueid: '1499515617.34',
  userfield: '',
  recordingpath: '/var/spool/asterisk/monitor/2017/07/08/exten-507-0707331818-20170708-180657-1499515617.34.wav' }

входящий недозвон
{ event: 'Cdr',
  privilege: 'cdr,all',
  accountcode: '',
  source: '0707331818',
  destination: '507',
  destinationcontext: 'from-did-direct',
  callerid: '"Golovachev Dmitriy" <0707331818>',
  channel: 'SIP/sip559-0000000c',
  destinationchannel: 'SIP/507-0000000d',
  lastapplication: 'Dial',
  lastdata: 'SIP/507,10,TtrIM(auto-blkvm)',
  starttime: '2017-07-08 18:09:40',
  answertime: '',
  endtime: '2017-07-08 18:09:48',
  duration: '8',
  billableseconds: '0',
  disposition: 'NO ANSWER',
  amaflags: 'DOCUMENTATION',
  uniqueid: '1499515780.44',
  userfield: '',
  recordingpath: '/var/spool/asterisk/monitor/2017/07/08/exten-507-0707331818-20170708-180940-1499515780.44.wav' }

*/