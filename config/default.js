module.exports = {
  "DB": {
    "Type":"postgres",
    "User":"duo",
    "Password":"DuoS123",
    "Port":5432,
    "Host":"localhost",
    "Database":"dvpdb"
  },


  "Redis":
  {
    "ip": "45.55.142.207",
    "port": 6389,
    "user": "duo",
    "password": "DuoS123"

  },


  "Security":
  {
    "ip" : "45.55.142.207",
    "port": 6389,
    "user": "duo",
    "password": "DuoS123"
  },


  "Host":
  {
    "ServerType": "SOCIALMEDIACONNECTOR",
    "CallbackOption": "GET",
    "RequestType": "CALL",
    "ServerID": 2,
    "resource": "cluster",
    "vdomain": "localhost",
    "domain": "localhost",
    "port": "4647",
    "smsQueueName": "SMSOUT",
    'twitterQueueName': "TWEETOUT",
    'facebookQueueName': "FACEBOOKOUT",
    "version": "1.0.0.0"
  },



  "SMSServer":{


    "ip":"159.203.109.43",
    "port":"1401",
    "password":"bar",
    "user":"foo"



  },


  "LBServer" : {

    "ip": "192.168.0.123",
    "port": "4647"

  },


  "Mongo":
  {
    "ip":"45.55.142.207",
    "port":"27017",
    "dbname":"dvpdb",
    "password":"DuoS123",
    "user":"duo"
  },



  "RabbitMQ":
  {
    "ip": "45.55.142.207",
    "port": 5672,
    "user": "admin",
    "password": "admin"
  },


  "Services" : {
    "accessToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",

    "resourceServiceHost": "resourceservice.app.veery.cloud",
    "resourceServicePort": "8831",
    "resourceServiceVersion": "1.0.0.0",


    "interactionurl": "interactions.app.veery.cloud",
    "interactionport": '3637',
    "interactionversion":"1.0",
    //


    "cronurl": "192.168.0.27",
    "cronport": '8080',
    "cronversion":"1.0.0.0",


    "ticketServiceHost": "liteticket.app.veery.cloud",
    "ticketServicePort": "3636",
    "ticketServiceVersion": "1.0.0.0",

    "ardsServiceHost": "ardsliteservice.app.veery.cloud",
    "ardsServicePort": "8831",
    "ardsServiceVersion": "1.0.0.0",

    "facebookUrl" : "https://graph.facebook.com/v2.7/"


  },

  "SocialConnector":
  {
    "fb_client_id":"825442624259571",
    "fb_client_secret":"85eab7232db0c38abd7d04baa358382f"
  }

};
