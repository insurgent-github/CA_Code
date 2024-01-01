/*
Title: pedestrian_detection_server.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/

const grpc = require('grpc');
const { PedestrianDetectionService } = require('./pedestrian_detection_pb');
const { DetectPedestrianResponse } = require('./pedestrian_detection_pb');

const server = new grpc.Server();

class PedestrianDetectionServiceImpl 
{
  detectPedestrian(call, callback) 
  {
    // Placeholder logic - replace with actual logic to determine pedestrian presence
    const response = new DetectPedestrianResponse();
    response.setPresence(/* Actual logic to determine the presence of pedestrians */);
    callback(null, response);
  }
}

server.addService(PedestrianDetectionService, new PedestrianDetectionServiceImpl());

server.bind('127.0.0.1:7343', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://127.0.0.1:7343');
server.start();

