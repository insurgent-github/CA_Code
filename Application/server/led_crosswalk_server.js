/*
Title: led_crosswalk_server.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/

// We are importing the gRPC module
const grpc = require('grpc');

// We are importing the generated gRPC services and also the message definitions 
const { LEDCrosswalkService } = require('./led_crosswalk_pb');
const { ActivateLEDLightsResponse } = require('./led_crosswalk_pb');

// We are creating a new gRPC server instance
const server = new grpc.Server();

// And we are defining the implementation for the LEDCrosswalkService
class LEDCrosswalkServiceImpl 
{
  // This is the implementation of te RPC method
  activateLEDLights(call, callback) 
  {
    const { crosswalkId, pedestrianPresence } = call.request;

    // Placeholder logic - replace with actual logic to activate LED panel
    // We will assume that the activation is successful for demonstration purposes
    const response = new ActivateLEDLightsResponse();
    response.setActivationStatus(true);

    console.log(`LED panel activated for Crosswalk ${crosswalkId}`);

    // And this is the callback to send the response back to the client
    callback(null, response);
  }

    // This is the implementation of te RPC method
   deactivateLEDLights(call, callback) 
   {
    const { crosswalkId, pedestrianPresence } = call.request;

    // Placeholder logic - replace with actual logic to deactivate LED panel
    // We will assume that the deactivation is successful for demonstration purposes
    const response = new ActivateLEDLightsResponse();
    response.setActivationStatus(false);

    console.log(`LED panel deactivated for Crosswalk ${crosswalkId}`);
    
    // And this is the callback to send the response back to the client
    callback(null, response);
	}
}

// We are adding the LEDCrosswalkService implementation to the server
server.addService(LEDCrosswalkService, new LEDCrosswalkServiceImpl());

// And we are binding the server to my specific IP address and port with insecure credentials
server.bind('127.0.0.1:7344', grpc.ServerCredentials.createInsecure());

// We are checking and loging that the server is running
console.log('LED Crosswalk Server running at http://127.0.0.1:7344');

// And we are starting our gRPC server
server.start();
