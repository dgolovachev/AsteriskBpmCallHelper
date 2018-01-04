var bpmManager = require("./../bpmManager");
var usersHelper = require("./../helpers/usersHelper");
var callHelper = require("./../helpers/callHelper");
var activityHelper = require("./../helpers/activityHelper");

function IncomingCallNotWorkTimeStrategy() { }

IncomingCallNotWorkTimeStrategy.prototype.execute = function (eventData, callback) {
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

module.exports = IncomingCallNotWorkTimeStrategy;

/*

входящий не рабоч время

{ event: 'Cdr',
  privilege: 'cdr,all',
  accountcode: '',
  source: '0312466006',
  destination: 'hangup',
  destinationcontext: 'app-blackhole',
  callerid: '"0312466006" <0312466006>',
  channel: 'SIP/sip0312986522-000000c8',
  destinationchannel: '',
  lastapplication: 'Hangup',
  lastdata: '',
  starttime: '2017-07-16 15:53:41',
  answertime: '2017-07-16 15:53:41',
  endtime: '2017-07-16 15:53:54',
  duration: '13',
  billableseconds: '13',
  disposition: 'ANSWERED',
  amaflags: 'DOCUMENTATION',
  uniqueid: '1500198821.220',
  userfield: '',
  recordingpath: '' }


{ event: 'Cdr',
  privilege: 'cdr,all',
  accountcode: '',
  source: '0555971042',
  destination: 'hangup',
  destinationcontext: 'app-blackhole',
  callerid: '"Алиев Руслан" <0555971042>',
  channel: 'SIP/sip559-0000000e',
  destinationchannel: '',
  lastapplication: 'Hangup',
  lastdata: '',
  starttime: '2017-07-08 18:12:04',
  answertime: '2017-07-08 18:12:04',
  endtime: '2017-07-08 18:12:16',
  duration: '12',
  billableseconds: '12',
  disposition: 'ANSWERED',
  amaflags: 'DOCUMENTATION',
  uniqueid: '1499515924.52',
  userfield: '',
  recordingpath: '' }
*/