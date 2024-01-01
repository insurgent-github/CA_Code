/*
Title: crosswalk_monitoring_client.js
Author: Miguel Angel Vinas
Date: 1st January, 2024
Purpose: Distribution's Systems CA for National College Of Ireland
*/


const grpc = require('grpc');
const crosswalkMonitoringProto = grpc.load('protos/crosswalk_monitoring.proto');
const crosswalkMonitoringService = crosswalkMonitoringProto.CrosswalkMonitoringService;

const client = new crosswalkMonitoringService('localhost:7345', grpc.credentials.createInsecure());

function getCrosswalkStatus(crosswalkId) 
{
  const request = new crosswalkMonitoringProto.CrosswalkStatusRequest();
  request.setCrosswalkId(crosswalkId);

  client.getCrosswalkStatus(request, (error, response) => 
  {
    if (!error) 
    {
      console.log(`Crosswalk Status: ${response.getStatus()}`);
      console.log(`Error Logs: ${response.getErrorLogsList()}`);
      console.log(`Activation Logs: ${response.getActivationLogsList()}`);
    } 
    else 
    {
      console.error(`Error getting crosswalk status: ${error}`);
    }
  });
}

// Call the function to get crosswalk status
getCrosswalkStatus(/* We have to provide the crosswalkId here*/);
