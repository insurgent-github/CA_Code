# CA_Code
 Github Repository for Distribution's Systems CA


Project Proposal
Miguel Angel Vinas
x22116133

OVERVIEW
This document is submitted as an interim submission of CA project of the Distributed Systems module on the Higher Diploma in Computing specializing in Software Development delivered by Yasantha Samarawickrama.
 
Domain description 

The project I want to work on is a smart zebra crosswalk system powered by LED lights. 

There has been an upward trajectory on pedestrian deaths and injuries in Ireland since 2020. Almost 30% of road deaths in Ireland are pedestrians, almost double of the EU average, which is 18%.
(https://www.irishexaminer.com/news/arid-41169541.html)

This system aims to enhance pedestrian and traffic safety by implementing an intelligent crosswalk that uses LED lights as the marks on the street to signal the presence of pedestrians when they are around the zebra cross walk and while they are crossing. 

The system dynamically activates the LED lights when a pedestrian is within a predefined radius or is actively crossing the road. 

For the purpose of this project we are going to define the radius as 4 meters from the zebra walk on each end. These 4 meters can be used in any shape.

Service definition and RPC

Even though we could implement several services that would help us enhance the system, at the beginning we are going to have three of them, enough to make it work as expected and enough to build a prototype that works and can be shown to investors.

1)	Pedestrian detection service
The Pedestrian Detection Service will be implemented using a sensor plate that spans the width of the detection radius, 4 meters. 
This sensor plate will be embedded in the construction of the area before / near the zebra cross. At the moment I am thinking about designing it with a polymer and make it a part of the actual pathway but I am open to other solutions. 
Its purpose would be to detect the presence of pedestrians entering the system within the specific radius.

It is composed of the Sensor plate, the Pedestrian Detection Dervice (it communicates with the sensor plate to check if there is any pedestrians) and the RPC: DetectPedestrian. 

RPC: DetectPedestrian:
- Request: None
- Response: Boolean (indicating the presence of a pedestrian within the detection radius)

2)	LED crosswalk service
The crosswalk service will be implemented through a series of LED beneath the surface of the road forming the shape of the crosswalk. The construction of the surface could be a polymer. Energetically speaking we could fill the full surface of the shape with LED lights or just the outside of the surface. 

RPCS
- ActivateLEDLights
Request: CrosswalkID, PedestrianPresence (Boolean: true).
Response: LED activation.

- DeactivateLEDLights
Request: CrosswalkID, PedestrianPresence (Boolean: false).
Response: LED deactivation.

3)	Monitoring Service for the Crosswalk
The monitoring service will be developed to request information about the status of a crosswalk, times it has been activated, errors and other logs. 

RPC
- GetCrosswalkStatus
Request: CrosswalkID.
Response: Crosswalk Status (active, inactive), errorLogs, activationLogs (within the activation logs we can probably see the whole history of each crosswalk). 

We will treat each crosswalk as one entity.

We will create a Graphical User Interface (GUI) as a way to interact with the system. 
It will include the following: 
-	Crosswalk ID.
-	Geolocation of each crosswalk.
-	Controls to manually activate and deactivate the crosswalk.
-	Real time status on LED activation.
-	Access to logs and history. 
