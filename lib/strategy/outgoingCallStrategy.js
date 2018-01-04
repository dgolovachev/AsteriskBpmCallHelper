var bpmManager = require("./../bpmManager");
var usersHelper = require("./../helpers/usersHelper");
var callHelper = require("./../helpers/callHelper");
var activityHelper = require("./../helpers/activityHelper");

function OutgoingCallStrategy() { }

OutgoingCallStrategy.prototype.execute = function (eventData, callback) {
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

module.exports = OutgoingCallStrategy;

/*
 исходящий трубка поднята
{ event: 'Cdr',
  privilege: 'cdr,all',
  accountcode: '',
  source: '507',
  destination: '0707331818',
  destinationcontext: 'from-internal',
  callerid: '507',
  channel: 'SIP/507-00000000',
  destinationchannel: 'SIP/YSGSM1-00000001',
  lastapplication: 'Dial',
  lastdata: 'SIP/YSGSM1/0707331818,300,Tt',
  starttime: '2017-07-08 17:56:13',
  answertime: '2017-07-08 17:56:27',
  endtime: '2017-07-08 17:56:31',
  duration: '18',
  billableseconds: '4',
  disposition: 'ANSWERED',
  amaflags: 'DOCUMENTATION',
  uniqueid: '1499514973.2',
  userfield: '',
  recordingpath: '/var/spool/asterisk/monitor/2017/07/08/out-0707331818-507-20170708-175613-1499514973.2.wav' }

исходящий занято
{ event: 'Cdr',
  privilege: 'cdr,all',
  accountcode: '',
  source: '507',
  destination: '0707331818',
  destinationcontext: 'from-internal',
  callerid: '507',
  channel: 'SIP/507-00000002',
  destinationchannel: 'SIP/YSGSM1-00000003',
  lastapplication: 'Busy',
  lastdata: '20',
  starttime: '2017-07-08 17:58:51',
  answertime: '',
  endtime: '2017-07-08 17:59:04',
  duration: '13',
  billableseconds: '0',
  disposition: 'BUSY',
  amaflags: 'DOCUMENTATION',
  uniqueid: '1499515131.8',
  userfield: '',
  recordingpath: '/var/spool/asterisk/monitor/2017/07/08/out-0707331818-507-20170708-175851-1499515131.8.wav' }

исходящий не дозвонился
{ event: 'Cdr',
  privilege: 'cdr,all',
  accountcode: '',
  source: '507',
  destination: '0707331818',
  destinationcontext: 'from-internal',
  callerid: '507',
  channel: 'SIP/507-00000004',
  destinationchannel: 'SIP/YSGSM1-00000005',
  lastapplication: 'Dial',
  lastdata: 'SIP/YSGSM1/0707331818,300,Tt',
  starttime: '2017-07-08 17:59:19',
  answertime: '',
  endtime: '2017-07-08 17:59:30',
  duration: '11',
  billableseconds: '0',
  disposition: 'NO ANSWER',
  amaflags: 'DOCUMENTATION',
  uniqueid: '1499515159.12',
  userfield: '',
  recordingpath: '/var/spool/asterisk/monitor/2017/07/08/out-0707331818-507-20170708-175919-1499515159.12.wav' }

*/