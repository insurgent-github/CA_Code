/*
Title: pedestrian_detection_client.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/

// We are importing the gRPC module
const grpc = require('grpc');

// We are loading the gRPC protocol buffer definition
const pedestrianDetectionProto = grpc.load('protos/pedestrian_detection.proto');

// We are retrieveing the pedestrianDetectionProto definition from the protocol buffer
const pedestrianDetectionService = pedestrianDetectionProto.pedestrian_detection.PedestrianDetectionService;

// Then we are creating a new gRPC client instance with the address in my computer and the specified credentials. 
const client = new pedestrianDetectionService('localhost:7343', grpc.credentials.createInsecure());

// Function to make a request to detect pedestrians
function detectPedestrian() 
{
  client.DetectPedestrian({}, (error, response) => 
  {
    // If there are no errors in the response
    if (!error) 
    {
      // We will log the successfull presence of a pedestrian.
      const isPedestrianPresent = response.presence;
      console.log(`Pedestrian is present: ${isPedestrianPresent}`);
    }
    // But if there is in issue with the request, we will log an error.   
    else 
    {
      console.error(`Error detecting pedestrian: ${error}`);
    }
  });
}

// Call the function to detect pedestrians
detectPedestrian();

