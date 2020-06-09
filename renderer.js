// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')

ipcRenderer.on('love time', (event, message) => {

    console.log('hi there');

    get_time(message);

    return true;

})
