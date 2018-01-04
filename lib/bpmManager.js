var dbConfig = require("./settings/connectionSettings").DB;
var mssqlHelper = require("./helpers/mssqlHelper");

function findContact(phone, callback) {
  if (!phone) throw "phone is undefined";

  var query = `SELECT Id, Name FROM Contact WHERE Phone LIKE  '%${phone}%' OR MobilePhone LIKE '%${phone}%' OR HomePhone LIKE '%${phone}%'`;

  mssqlHelper.selectQuery(dbConfig, query, (err, result) => {
    if (err) return callback(err, null);
    if (result.rowsAffected > 0)
      callback(null, result.recordset[0])
    else callback(null, null)
  })
}

function findAccount(phone, callback) {
  if (!phone) throw "phone is undefined";

  var query = `SELECT Id, Name FROM Account WHERE Phone LIKE '%${phone}%' OR AdditionalPhone LIKE '%${phone}%' OR Fax LIKE '%${phone}%'`;

  mssqlHelper.selectQuery(dbConfig, query, (err, result) => {
    if (err) return callback(err, null);
    if (result.rowsAffected > 0)
      callback(null, result.recordset[0])
    else callback(null, null)
  })
}

function findLead(phone, callback) {
  if (!phone) throw "phone is undefined";

  var query = `SELECT Id, LeadName AS Name FROM Lead WHERE BusinesPhone LIKE '%${phone}%' OR MobilePhone LIKE '%${phone}%'`;

  mssqlHelper.selectQuery(dbConfig, query, (err, result) => {
    if (err) return callback(err, null);
    if (result.rowsAffected > 0)
      callback(null, result.recordset[0])
    else callback(null, null)
  })
}

function insertActivity(activityData, callback) {
  if (!activityData) throw "activityData is undefined";

  var contact, account, lead;

  if (!activityData.contact) contact = "NULL";
  else contact = `'${activityData.contact.Id}'`;
  if (!activityData.account) account = "NULL";
  else account = `'${activityData.account.Id}'`;
  if (!activityData.lead) lead = "NULL";
  else lead = `'${activityData.lead.Id}'`;

  var query = `INSERT INTO Activity ([Id],[CreatedOn],[CreatedById]
                 ,[ModifiedOn],[ModifiedById],[Title]
                 ,[StartDate] ,[DueDate],[PriorityId]
                 ,[AuthorId] ,[RemindToAuthor],[OwnerId]
                 ,[RemindToOwner],[TypeId] ,[ShowInScheduler]
				 ,[DetailedResult],[ResultId],[StatusId]
                 ,[AccountId],[ContactId]
                 ,[ActivityCategoryId], [LeadId],[UsrSrc] )

                  VALUES (  NEWID(), GETDATE(), '972C45AE-3B22-42E3-8999-B32E13A951F4'
				  ,GETDATE(), '972C45AE-3B22-42E3-8999-B32E13A951F4', '${activityData.title}'
				  ,'${activityData.startDate}',  '${activityData.endDate}', 'AB96FA02-7FE6-DF11-971B-001D60E938C6'
				  ,'972C45AE-3B22-42E3-8999-B32E13A951F4',  0, '${activityData.ownerId}'
				  ,1, 'E1831DEC-CFC0-DF11-B00F-001D60E938C6',  1
				  ,'','${activityData.resultId}','${activityData.statusId}'
                  , ${account}, ${contact}
				  ,'E52BD583-7825-E011-8165-00155D043204',  ${lead},'${activityData.src}')`;

  mssqlHelper.insertQuery(dbConfig, query, (err, result) => {
    if (err) callback(err, null);
    else callback(null, result);
  })
}

function getRelationByPhone(phone, callback) {
  if (!phone) throw "phone is undefined";

  var query = `SELECT Id, Name FROM Contact WHERE Phone LIKE  '%${phone}' OR MobilePhone LIKE '%${phone}' OR HomePhone LIKE '%${phone}';
                 SELECT Id, Name FROM Account WHERE Phone LIKE '%${phone}' OR AdditionalPhone LIKE '%${phone}' OR Fax LIKE '%${phone}';
                 SELECT Id, LeadName AS Name FROM Lead WHERE BusinesPhone LIKE '%${phone}' OR MobilePhone LIKE '%${phone}'`;

  mssqlHelper.selectQuery(dbConfig, query, (err, result) => {
    if (err) return callback(err, null);
    var relationData = {
      contact: result.recordsets[0][0] || null,
      account: result.recordsets[1][0] || null,
      lead: result.recordsets[2][0] || null
    }
    callback(null, relationData)
  })

}

module.exports.findContact = findContact;
module.exports.findAccount = findAccount;
module.exports.findLead = findLead;
module.exports.insertActivity = insertActivity;
module.exports.getRelationByPhone = getRelationByPhone;