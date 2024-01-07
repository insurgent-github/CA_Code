/*
Title: crosswalk_monitoring_server.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/

// We are importing the gRPC module
const grpc = require('grpc');

// We are importing the generated gRPC services and also the message definitions 
const { CrosswalkMonitoringService } = require('./crosswalk_monitoring_pb');
const { CrosswalkStatusRequest, CrosswalkStatusResponse } = require('./crosswalk_monitoring_pb');

// We are creating a new gRPC server instance
const server = new grpc.Server();

// And we are defining the implementation for the CrosswalkMonitoringService
class CrosswalkMonitoringServiceImpl 
{
  // This is the implementation of te RPC method
  getCrosswalkStatus(call, callback) 
  {
    // Implement logic to retrieve crosswalk status, error logs, and activation logs
    const response = new CrosswalkStatusResponse();
    response.setStatus(/* Write the logic to determine the status */);
    response.setErrorLogsList(/* This is an array of error logs */);
    response.setActivationLogsList(/* And this is an array of activation logs */);
    
    // And this is the callback to send the response back to the client
    callback(null, response);
  }
}

// We are adding the CrosswalkMonitoringService implementation to the server
server.addService(CrosswalkMonitoringService, new CrosswalkMonitoringServiceImpl());

// And we are binding the server to my specific IP address and port with insecure credentials
server.bind('127.0.0.1:7345', grpc.ServerCredentials.createInsecure());

// We are checking and loging that the server is running
console.log('Monitoring server running at http://127.0.0.1:7345');

// And we are starting our gRPC server
server.start();
