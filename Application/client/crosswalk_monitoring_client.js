/*
Title: crosswalk_monitoring_client.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/

// We are importing the gRPC module
const grpc = require('grpc');

// We are loading the gRPC protocl buffer definition
const crosswalkMonitoringProto = grpc.load('protos/crosswalk_monitoring.proto');

// We are retrieveing the crosswalkMonitoringService definition from the protocol buffer
const crosswalkMonitoringService = crosswalkMonitoringProto.CrosswalkMonitoringService;

// Then we are creating a new gRPC client instance with the address in my computer and the specified credentials. 
const client = new crosswalkMonitoringService('localhost:7345', grpc.credentials.createInsecure());

// We are creating the function to GET the status of a crosswalk with a specific ID. 
function getCrosswalkStatus(crosswalkId) 
{
  const request = new crosswalkMonitoringProto.CrosswalkStatusRequest();
  request.setCrosswalkId(crosswalkId);

  // We are making a gRPC request to get the status of the Crosswalk
  client.getCrosswalkStatus(request, (error, response) => 
  {
    // If there are no errors in the response
    if (!error) 
    {
      // We are loging the status, error logs and the activation logs
      console.log(`Crosswalk Status: ${response.getStatus()}`);
      console.log(`Error Logs: ${response.getErrorLogsList()}`);
      console.log(`Activation Logs: ${response.getActivationLogsList()}`);
    }
    // But if there is an issue in the response, we are logging an error.
    else 
    {
      console.error(`Error getting crosswalk status: ${error}`);
    }
  });
}

// Call the function to get crosswalk status
getCrosswalkStatus(/* We have to provide the crosswalkId here*/);
