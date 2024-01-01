/*
Title: crosswalk_monitoring_server.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/

const grpc = require('grpc');
const { CrosswalkMonitoringService } = require('./crosswalk_monitoring_pb');
const { CrosswalkStatusRequest, CrosswalkStatusResponse } = require('./crosswalk_monitoring_pb');

const server = new grpc.Server();

class CrosswalkMonitoringServiceImpl 
{
  getCrosswalkStatus(call, callback) 
  {
    // Implement logic to retrieve crosswalk status, error logs, and activation logs
    const response = new CrosswalkStatusResponse();
    response.setStatus(/* Write the logic to determine the status */);
    response.setErrorLogsList(/* This is an array of error logs */);
    response.setActivationLogsList(/* And this is an array of activation logs */);
    callback(null, response);
  }
}

server.addService(CrosswalkMonitoringService, new CrosswalkMonitoringServiceImpl());

server.bind('127.0.0.1:7345', grpc.ServerCredentials.createInsecure());
console.log('Monitoring server running at http://127.0.0.1:7345');
server.start();
