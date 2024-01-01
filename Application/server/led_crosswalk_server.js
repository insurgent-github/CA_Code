/*
Title: led_crosswalk_server.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/

const grpc = require('grpc');
const { LEDCrosswalkService } = require('./led_crosswalk_pb');
const { ActivateLEDLightsResponse } = require('./led_crosswalk_pb');

const server = new grpc.Server();

class LEDCrosswalkServiceImpl 
{
  activateLEDLights(call, callback) 
  {
    const { crosswalkId, pedestrianPresence } = call.request;

    // Placeholder logic - replace with actual logic to activate LED panel
    // We will assume that the activation is successful for demonstration purposes
    const response = new ActivateLEDLightsResponse();
    response.setActivationStatus(true);

    console.log(`LED panel activated for Crosswalk ${crosswalkId}`);
    callback(null, response);
  }

   deactivateLEDLights(call, callback) 
   {
    const { crosswalkId, pedestrianPresence } = call.request;

    // Placeholder logic - replace with actual logic to deactivate LED panel
    // We will assume that the deactivation is successful for demonstration purposes
    const response = new ActivateLEDLightsResponse();
    response.setActivationStatus(false);

    console.log(`LED panel deactivated for Crosswalk ${crosswalkId}`);
    callback(null, response);
	}
}


server.addService(LEDCrosswalkService, new LEDCrosswalkServiceImpl());

server.bind('127.0.0.1:7344', grpc.ServerCredentials.createInsecure());
console.log('LED Crosswalk Server running at http://127.0.0.1:7344');
server.start();
