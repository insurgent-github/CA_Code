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
    }

    activate() 
    {
        this.statusElement.innerText = 'Activated';
        this.statusElement.classList.remove('deactivated');
        this.statusElement.classList.add('activated');
    }

    deactivate() 
    {
        this.statusElement.innerText = 'Deactivated';
        this.statusElement.classList.remove('activated');
        this.statusElement.classList.add('deactivated');
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
