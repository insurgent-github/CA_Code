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

    // Function to get our application's crosswalk data
    getCrosswalkData() 
    {
        //We will replace this with our data source or logic where to fetch the data from. 
        return [
            { id: '0001', latitude: 53.34397088175478, longitude: -6.441806077184068, status: 'Activated' },
            { id: '0002', latitude: 53.34911487357206, longitude: -6.242949873623895, status: 'Activated' }
            // Add more crosswalks as needed
        ];
    }

    initializeMap() 
    {
        // Add markers for all crosswalks in the initial state
        this.getCrosswalkData().forEach(crosswalk => 
        {
            this.addMarker([crosswalk.latitude, crosswalk.longitude], crosswalk.id, crosswalk.status);
        });
    }

    activate(crosswalkId) 
    {
        this.statusElement.innerText = 'Activated';
        this.statusElement.classList.remove('deactivated');
        this.statusElement.classList.add('activated');

        // Update the map for activation
        this.updateMap(crosswalkId, 'Activated');
    }

    deactivate(crosswalkId) 
    {
        this.statusElement.innerText = 'Deactivated';
        this.statusElement.classList.remove('activated');
        this.statusElement.classList.add('deactivated');

        // Update the map for deactivation
        this.updateMap(crosswalkId, 'Deactivated');
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

    // Function to update the map based on activation or deactivation
    updateMap(crosswalkId, status) 
    {
        const selectedCrosswalk = this.getCrosswalkData().find(crosswalk => crosswalk.id.trim() === crosswalkId.trim());

        if (selectedCrosswalk) 
        {
            // Update the map with the selected crosswalk and its new status
            this.map.setView([selectedCrosswalk.latitude, selectedCrosswalk.longitude], 13);
            this.addMarker([selectedCrosswalk.latitude, selectedCrosswalk.longitude], selectedCrosswalk.id, status);
        } 
        else 
        {
            alert('Crosswalk not found. Please enter a valid ID.');
        }
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
    var crosswalkId = document.getElementById('crosswalkId').value;
    if (crosswalkId) 
    {
        crosswalk.activate(crosswalkId);
    } 
    else 
    {
        alert('Please enter a Crosswalk ID.');
    }
}

function manualDeactivateCrosswalk() 
{
    var crosswalkId = document.getElementById('crosswalkId').value;
    if (crosswalkId) 
    {
        crosswalk.deactivate(crosswalkId);
    } 
    else {
        alert('Please enter a Crosswalk ID.');
    }
}

function accessLogsAndHistory() 
{
    // This is a placeholder for accessing the logs and history
    document.getElementById('logsResult').innerText = 'Logs and history will be displayed here.';
}

// Function to show a specific crosswalk on the map
function showCrosswalkOnMap(crosswalkId) 
{
    // Let's check if the CrosswalkId is empty or not.
    if (!crosswalkId) 
    {
        alert("Crosswalk not found. Please enter a valid ID.");
        return;
    }

    const selectedCrosswalk = crosswalk.getCrosswalkData().find(crosswalk => crosswalk.id.trim() === crosswalkId.trim());

    if (selectedCrosswalk) 
    {
        // Determine the current status of the crosswalk
        const currentStatus = crosswalk.statusElement.classList.contains('activated') ? 'Activated' : 'Deactivated';

        // Update the map with the selected crosswalk and its current status
        crosswalk.map.setView([selectedCrosswalk.latitude, selectedCrosswalk.longitude], 13);
        crosswalk.addMarker([selectedCrosswalk.latitude, selectedCrosswalk.longitude], selectedCrosswalk.id, currentStatus);
    } 
    else 
    {
        alert('Crosswalk not found. Please enter a valid ID.');
    }
}

// Event listener for the "Show Crosswalk" button
document.getElementById('showCrosswalkButton').addEventListener('click', function () 
{
    var crosswalkId = document.getElementById('crosswalkId').value;
    showCrosswalkOnMap(crosswalkId);
});


