var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var RECEIVER = 'patelpvr11@gmail.com';
var SENDER = 'patelpvr11@gmail.com';

exports.handler = function (event, context,callback) {
    console.log('Received event:', event);
    addToDynamoDb(event,context, function(err,data){
       sendEmail(event, context);
    });
    
   
};

function addToDynamoDb (event, context, done){
    console.log(event);
    var tableName = "requests";    
    
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            'name' : {S: event.name},
            'email' : {S: event.email},
            'message' : {S: event.message},
            'id' : {S :  new Date().toISOString()}
        }
    }, function(err, data) {
        if (err) {
            console.log('Error putting item into dynamodb failed: '+err);
            context.fail(data);
        }
        else {
            console.log('great success: '+JSON.stringify(data, null, '  '));
            done();
        }
    });
}

function sendEmail (event, context, done) {
    var ses = new AWS.SES();
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'name: ' + event.name + '\nemail: ' + event.email + '\nmessage: ' + event.message ,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Message received confirmation: ' + event.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
   
   ses.sendEmail(params, function(err, data) {
       console.log(err);
       var response = {
           "error" : 1,
           "message" : "",
           "statusCode" : 200
       };
       
      if (err){
          response.error = 1;
          response.message = "failed to send email " + err; 
          context.fail(response);
      }
      else {
          response.error = 0;
          response.message = "email send successfully";
          console.log(response);
          context.succeed(response);
      }
   });
}
