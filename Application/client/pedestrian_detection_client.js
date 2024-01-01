/*
Title: pedestrian_detection_client.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/

const grpc = require('grpc');
const pedestrianDetectionProto = grpc.load('protos/pedestrian_detection.proto');
const pedestrianDetectionService = pedestrianDetectionProto.pedestrian_detection.PedestrianDetectionService;

// Create a gRPC client
const client = new pedestrianDetectionService('localhost:50051', grpc.credentials.createInsecure());

// Function to make a request to detect pedestrians
function detectPedestrian() 
{
  client.DetectPedestrian({}, (error, response) => 
  {
    if (!error) 
    {
      const isPedestrianPresent = response.presence;
      console.log(`Pedestrian is present: ${isPedestrianPresent}`);
    } 
    else 
    {
      console.error(`Error detecting pedestrian: ${error}`);
    }
  });
}

// Call the function to detect pedestrians
detectPedestrian();

