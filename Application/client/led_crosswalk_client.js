/*
Title: led_crosswalk_client.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/

// We are importing the gRPC module
const grpc = require('grpc');

// We are loading the gRPC protocol buffer definition
const ledCrosswalkProto = grpc.load('protos/led_crosswalk.proto');

// We are retrieveing the ledCrosswalkProto definition from the protocol buffer
const ledCrosswalkService = ledCrosswalkProto.led_crosswalk.LEDCrosswalkService;

// Then we are creating a new gRPC client instance with the address in my computer and the specified credentials. 
const client = new ledCrosswalkService('localhost:7344', grpc.credentials.createInsecure());

// Function to make a request to activate LED lights
function activateLEDLights(crosswalkId, pedestrianPresence) 
{
  const request = 
  {
    crosswalkId: crosswalkId,
    pedestrianPresence: pedestrianPresence,
  };

  // We are making a gRPC request to activate the LED lights.
  client.ActivateLEDLights(request, (error, response) => 
  {
  	// If there are no errors in the response
    if (!error) 
    {
    	// We will log the successful activation of the LED lights.
      console.log(`LED lights activated for Crosswalk ${crosswalkId}`);
    }
    // But if there is in issue with the request, we will log an error.  
    else 
    {
      console.error(`There has been an error activating the LED panel in the Crosswalk: ${error}`);
    }
  });
}


function deactivateLEDLights (crosswalkId, pedestrianPresence)
{
	const request =
	{
		crosswalkId: crosswalkId,
		pedestrianPresence: pedestrianPresence,

	};

 // We are making a gRPC request to deactivate the LED lights.
	client.deactivateLEDLights (request, (error, response) =>
	{
	  // If there are no errors in the response
		if (!error)
		{
			// We will log the successful activation of the LED lights.
			console.log ('LED lights deactivated for Crosswalk ${crosswalkId}')
		}
		// But if there is in issue with the request, we will log an error. 
		else
		{
			console.error ('There has been an error activating the LED panel in the Crosswalk: ${error}')
		}
	});
}

// Call the function to activate LED panel.
activateLEDLights('0001', true);

// Call the function to deactivate the LED panel.
deactivateLEDLights('0001', false);
