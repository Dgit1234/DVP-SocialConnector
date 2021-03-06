var amqp = require('amqp');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var request = require('request');
var format = require("stringformat");
var CreateEngagement = require('../Workers/common').CreateEngagement;
var CreateComment = require('../Workers/common').CreateComment;
var CreateTicket = require('../Workers/common').CreateTicket;
var UpdateComment = require('../Workers/common').UpdateComment;
var config = require('config');
var validator = require('validator');
var dust = require('dustjs-linkedin');
var juice = require('juice');
var Template = require('../Model/Template').Template;
var uuid = require('node-uuid');
var SocialConnector = require('dvp-mongomodels/model/SocialConnector').SocialConnector;

var queueHost = format('amqp://{0}:{1}@{2}:{3}',config.RabbitMQ.user,config.RabbitMQ.password,config.RabbitMQ.ip,config.RabbitMQ.port);
var queueName = config.Host.facebookQueueName;



var queueConnection = amqp.createConnection({
    url: queueHost
});

queueConnection.on('ready', function () {
    queueConnection.queue(queueName, {durable: true, autoDelete: false},function (q) {
        q.bind('#');
        q.subscribe({
            ack: true,
            prefetchCount: 10
        }, function (message, headers, deliveryInfo, ack) {

            //message = JSON.parse(message.data.toString());
            console.log(message);
            if (!message || !message.to || !message.from || !message.reply_session ||  !message.body || !message.company || !message.tenant) {
                console.log('FB Client AMQP-Invalid message, skipping');
                return ack.acknowledge();
            }
            ///////////////////////////create body/////////////////////////////////////////////////

            MakeCommentsToWallPost(message.tenant,message.company,message.from,message.reply_session,message.body,message,ack)
        });
    });
});

function MakeCommentsToWallPost(tenant,company,connectorId,objectid,msg,data,ack) {

    console.log("MakeCommentsToWallPost. RMQ Data >  " + JSON.stringify(data));
    SocialConnector.findOne({'_id': connectorId, company: company, tenant: tenant}, function (err, user) {

        if (err) {
            logger.error("Fail To Find Social Connector.",err);
            ack.reject(true);
        }
        if (user) {
            var propertiesObject = {
                access_token: user.fb.access_token,
                message: msg
            };
            var options = {
                method: 'post',
                uri: config.Services.facebookUrl + objectid + '/comments',
                qs: propertiesObject,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            request(options, function (error, response, body) {
                if (error) {
                    logger.error("Fail To Make Comment.",err);
                    ack.acknowledge();
                }
                else {
                    if (response.statusCode == 200) {

                        /*CreateEngagement("facebook-post", company, tenant, fbData.sender_name, to.name, "inbound", fbData.comment_id, fbData.message, user, fbData.sender_id, to, function (isSuccess, engagement) {*/
                        CreateEngagement("facebook-post", company, tenant, data.author, data.to, "outbound", JSON.parse(body).id, data.body, undefined, data.from, data.to, function (isSuccess, engagement) {
                            if (isSuccess) {
                                /*CreateComment('facebook-post', 'Comment', company, tenant, fbData.parent_id, undefined, engagement, function (done) {
                                 if (!done) {
                                 logger.error("Fail To Add Comments" + fbData.post_id);
                                 } else {

                                 logger.info("Facebook Comment Added successfully " + fbData.post_id);
                                 }
                                 })*/

                                UpdateComment(tenant, company, data.comment,engagement._id, function (done) {
                                    if (done) {
                                        logger.info("Update Comment Completed ");

                                    } else {

                                        logger.error("Update Comment Failed ");

                                    }
                                });


                            } else {

                                logger.error("Create engagement failed " + JSON.parse(body).id);

                            }
                        });

                        ack.acknowledge();
                    }
                    else {
                        logger.error("Fail To Make Comment.",new Error("Fail To Make Comment"));
                        ack.acknowledge();
                    }

                    console.log("MakeCommentsToWallPost..... > "+ JSON.stringify(body));
                }
            });
        }
        else {
            logger.error("Fail To Find Connector. >  " + JSON.stringify(data),new Error("Fail To Find Connector"));
            ack.acknowledge();
        }
    });
}

module.exports.MakeCommentsToWallPost = MakeCommentsToWallPost;


