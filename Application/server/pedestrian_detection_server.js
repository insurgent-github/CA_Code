/*
Title: pedestrian_detection_server.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/

// We are importing the gRPC module
const grpc = require('grpc');

// We are importing the generated gRPC services and also the message definitions 
const { PedestrianDetectionService } = require('./pedestrian_detection_pb');
const { DetectPedestrianResponse } = require('./pedestrian_detection_pb');

// We are creating a new gRPC server instance
const server = new grpc.Server();

// And we are defining the implementation for the LEDCrosswalkService
class PedestrianDetectionServiceImpl 
{
  // This is the implementation of te RPC method
  detectPedestrian(call, callback) 
  {
    // Placeholder logic - we will replace it with the actual logic to determine pedestrian presence
    const response = new DetectPedestrianResponse();
    response.setPresence(/* Actual logic to determine the presence of pedestrians */);
    
    // And this is the callback to send the response back to the client
    callback(null, response);
  }
}

// We are adding the PedestrianDetectionService implementation to the server
server.addService(PedestrianDetectionService, new PedestrianDetectionServiceImpl());

// And we are binding the server to my specific IP address and port with insecure credentials
server.bind('127.0.0.1:7343', grpc.ServerCredentials.createInsecure());

// We are checking and loging that the server is running
console.log('Server running at http://127.0.0.1:7343');

// And we are starting our gRPC server
server.start();

