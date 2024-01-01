/*
Title: led_crosswalk_client.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/

const grpc = require('grpc');
const ledCrosswalkProto = grpc.load('protos/led_crosswalk.proto');
const ledCrosswalkService = ledCrosswalkProto.led_crosswalk.LEDCrosswalkService;

// Create a gRPC client
const client = new ledCrosswalkService('localhost:50052', grpc.credentials.createInsecure());

// Function to make a request to activate LED lights
function activateLEDLights(crosswalkId, pedestrianPresence) 
{
  const request = 
  {
    crosswalkId: crosswalkId,
    pedestrianPresence: pedestrianPresence,
  };

  client.ActivateLEDLights(request, (error, response) => 
  {
    if (!error) 
    {
      console.log(`LED lights activated for Crosswalk ${crosswalkId}`);
    } 
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

	client.deactivateLEDLights (request, (error, response) =>
	{
		if (!error)
		{
			console.log ('LED lights deactivated for Crosswalk ${crosswalkId}')
		}
		else
		{
			console.error ('There has been an error activating the LED panel in the Crosswalk: ${error}')
		}
	});
}

// Call the function to activate LED panel.
activateLEDLights('0001', true);

// Call the function to deactivate the LED panel.
deactivateLEDLights('0001', false)
