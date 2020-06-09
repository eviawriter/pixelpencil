// this file contains stuff that gets used globally
const electron = require('electron');
const path = require('path');
const { ipcRenderer } = require('electron');
const sqlite3 = require('sqlite3').verbose();

// create the userDir where all the user data of PixelPencil is stored
const userDir = (electron.app || electron.remote.app).getPath('documents');

// attach the project-directory and create a new one if it doesn't exist
var fs = require('fs');
var projectdir = path.join(userDir, '/PixelPencil/projects');

// check if the projectdir exists
if (!fs.existsSync(`${projectdir}`)) {
  // if not, create the directory
  fs.mkdirSync(`${projectdir}`, { recursive: true });
}

// create export-dir
var exportdir = path.join(userDir, '/PixelPencil/exports');

// check if the export-dir exists
if (!fs.existsSync(`${exportdir}`)) {
  // if not, create the directory
  fs.mkdirSync(`${exportdir}`, { recursive: true });
}

// This is the sourcedatabase, always loaded when the app starts.
var sourcedatabase = path.resolve(__dirname, 'saved/protodatabase.evv');

// This is the new destination file in UserDir/saved
var destinationdatabase = path.join(projectdir, 'protodatabase.evv');

// if the destinationdatabase doesn't exists, copy the sourcedatabase to the userData.
if (!fs.existsSync(destinationdatabase)) {
  // copy the sourcedatabase to the destinationdatabase. 
  fs.copyFile(sourcedatabase, destinationdatabase, (err) => {
    if (err) throw err;
    console.log('sourcedatabase copied to destinationdatabase');
  });
}

// create the databaselocation
// var databaselocation = path.join(projectdir, 'protodatabase.evv');
var databaselocation = destinationdatabase;

console.log(databaselocation);


var db = new sqlite3.Database(databaselocation);

// variable for deleting characters (see function chardelmodal in the file deletecharacters.js)
var globaldeletecharacter = ["1"];

// Variabele subjectid (from characters)
chardelsubjectid = ["1"];

// Add chart.js to the pipeline
var Chart = require('chart.js');

// global variable id startdate (used in function get_date to rembember
// the startdate id. 
var time_id = [];


ipcRenderer.on('love time', (event, message) => {

  get_time(message);

})

ipcRenderer.on('database created', (name) => {

  console.log(name);

  console.log('dit werkt!')

  var newlocation = projectdir + '/' + name + '.evv';
  databaselocation = "";
  databaselocation = newlocation;
  db = new sqlite3.Database(databaselocation);

  reloadContent();

})