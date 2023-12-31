/*
Title: index.html
Author: Miguel Angel Vinas
Date: 30th December, 2023
Purpose: Distribution's Systems CA for National College Of Ireland
*/

class Crosswalk 
{
    constructor() 
    {
        this.statusElement = document.getElementById('ledStatus');
        this.map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
        {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
        this.markers = L.layerGroup().addTo(this.map); // Layer group to manage markers

        // Initialize the map with the default crosswalk state
        this.initializeMap();
    }

    initializeMap() 
    {
        // Add a marker based on the initial state
        const initialState = this.statusElement.classList.contains('activated') ? 'Activated' : 'Deactivated';
        this.addMarker([53.34397088175478, -6.441806077184068], '0001', initialState);
    }

    activate() 
    {
        this.statusElement.innerText = 'Activated';
        this.statusElement.classList.remove('deactivated');
        this.statusElement.classList.add('activated');

        // Update the map for activation
        this.addMarker([53.34397088175478, -6.441806077184068], '0001', 'Activated');
    }

    deactivate() 
    {
        this.statusElement.innerText = 'Deactivated';
        this.statusElement.classList.remove('activated');
        this.statusElement.classList.add('deactivated');

        // Update the map for deactivation
        this.addMarker([53.34397088175478, -6.441806077184068], '0001', 'Deactivated');
    }

    // Function to add a marker to the map
    addMarker(coordinates, crosswalkId, status) 
    {
        // Remove previous markers
        this.markers.clearLayers();

        // Add a new marker for the given coordinates, crosswalk ID, and status
        const marker = L.marker(coordinates).addTo(this.markers);
        marker.bindPopup(`Crosswalk ID: ${crosswalkId}, Status: ${status}`).openPopup();
        this.map.setView(coordinates, 13);
    }

    // Function to remove all markers from the map
    removeMarkers() 
    {
        this.map.eachLayer(layer => 
        {
            if (layer instanceof L.Marker) 
            {
                this.map.removeLayer(layer);
            }
        });
    }
}

const crosswalk = new Crosswalk();

function manualActivateCrosswalk() 
{
    crosswalk.activate();
}

function manualDeactivateCrosswalk() 
{
    crosswalk.deactivate();
}

function accessLogsAndHistory() 
{
    // This is a placeholder for accessing the logs and history
    document.getElementById('logsResult').innerText = 'Logs and history will be displayed here.';
}

// Function to show a specific crosswalk on the map
function showCrosswalkOnMap(crosswalkId) {
    // Let's check if the CrosswalkId is empty or not.
    if (!crosswalkId) {
        alert("Crosswalk not found. Please enter a valid ID.");
        return;
    }

    // Each crosswalk data will be stored in an array
    var crosswalkData = [
        { id: '0001', latitude: 53.34397088175478, longitude: -6.441806077184068, status: 'Activated' },
        { id: '0002', latitude: 53.34911487357206, longitude: -6.242949873623895, status: 'Activated' }
        // We can add more crosswalks as needed.
    ];

    // Convert entered crosswalkId to a string (if it's not already a string) for comparison with string IDs in crosswalkData.
    var enteredCrosswalkId = String(crosswalkId);

    // We are going to find the crosswalk with the entered ID
    // And we are using the trim function so it doesn't matter if the user types spaces before or after the ID
    var selectedCrosswalk = crosswalkData.find(crosswalk => crosswalk.id.trim() === enteredCrosswalkId.trim());


    // Adding a console log to check errors. 
    console.log('Selected Crosswalk:', selectedCrosswalk);

    if (selectedCrosswalk) {
        // Determine the current status of the crosswalk
        const currentStatus = crosswalk.statusElement.classList.contains('activated') ? 'Activated' : 'Deactivated';

        // Update the map with the selected crosswalk and its current status
        crosswalk.map.setView([selectedCrosswalk.latitude, selectedCrosswalk.longitude], 13);
        crosswalk.addMarker([selectedCrosswalk.latitude, selectedCrosswalk.longitude], selectedCrosswalk.id, currentStatus);
    } else {
        // We are going to say that we have not found a valid ID to the user.
        // Even though we have already checked at the beginning of the function whether there is a valid crosswalkID or not
        // I believe that we should put an else here for best practices.
        alert('Crosswalk not found. Please enter a valid ID.');
    }
}




// Function to get our application's crosswalk data
function getCrosswalkData() 
{
    //We will replace this with our data source or logic where to fetch the data from. 
    return [
        { id: '0001', latitude: 53.34397088175478, longitude: -6.441806077184068, status: 'Activated' },
        { id: '0002', latitude: 53.34911487357206, longitude: -6.242949873623895, status: 'Activated' }
        // Add more crosswalks as needed
    ];
}

// Event listener for the "Show Crosswalk" button
document.getElementById('showCrosswalkButton').addEventListener('click', function () 
{
   var crosswalkId = document.getElementById('crosswalkId').value;
   showCrosswalkOnMap(crosswalkId);
});
