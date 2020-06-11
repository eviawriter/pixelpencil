// this file contains stuff that gets used globally
const electron = require('electron');
const path = require('path');
const { ipcRenderer } = require('electron');
const sqlite3 = require('sqlite3').verbose();

// create the userDir where all the user data of PixelPencil is stored
const userDir = (electron.app || electron.remote.app).getPath('documents');

var fs = require('fs');

// create export-dir
var exportdir = path.join(userDir, '/PixelPencil/exports');

// check if the export-dir exists
if (!fs.existsSync(`${exportdir}`)) {
  // if not, create the directory
  fs.mkdirSync(`${exportdir}`, { recursive: true });
}

// attach the project-directory and create a new one if it doesn't exist
var projectdir = path.join(userDir, '/PixelPencil/projects');

// check if the projectdir exists
if (!fs.existsSync(`${projectdir}`)) {
  // if not, create the directory
  fs.mkdirSync(`${projectdir}`, { recursive: true });
}

var read = fs.readFileSync(__dirname + '/js/userData.json');
var locatedatabase = JSON.parse(read);
var databaselocation = [];
var resolve = locatedatabase.userData[0].Location;

try {
  if (fs.existsSync(`${resolve}`)) {
    console.log(resolve);
    success = true;
  }

  else {
    success = false;
    throw err;
  }
}
catch (err) {
  // todo: create nice alertbox.
  console.log('ERROR: ' + resolve + ' has been moved or deleted. Click OK to load the standard database.');
}

if (success) {
  console.log('database successfully loaded from:', resolve);
  databaselocation = resolve;
}

if (!success) {

  console.log('database failed to load from', resolve);
  console.log('attempting to load tutorial database');
  // This is the sourcedatabase called tutorial.evv. Opened when 
  // the json-file userData.json is empty.
  var sourcedatabase = path.resolve(__dirname, 'saved/tutorial.evv');

  console.log(sourcedatabase);

  // This is the new destination file in UserDir/saved
  var destinationdatabase = path.join(projectdir, 'tutorial.evv');

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
  databaselocation = destinationdatabase;

  // only used when PixelPencil is loaded for the first time.
  // change the location in the json to the new databaselocation
  locatedatabase.userData[0].Location = databaselocation;

  // write the information to the json-file.
  fs.writeFile(__dirname + '/js/userData.json', JSON.stringify(locatedatabase), (err) => {
    if (err) console.log('error writing file');
  })
}

console.log(databaselocation);

// databaseversion. Neccessary to check if database is correct version
var databaseversion = '1.0';

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

// when changing project, ie: created or newly opened, this function is executed
ipcRenderer.on('database', (name, from) => {

  // check if call comes from menuCreateProject.js
  if (from == 'created') {

    // create new location for the database using projectdir and name
    var newlocation = projectdir + '/' + name + '.evv';

    // set databaselocation to the new location
    databaselocation = newlocation;

    // set db to the new databaselocation
    db = new sqlite3.Database(databaselocation);
  }

  // check if call comes from menuOpenProject.js
  if (from == 'opened') {

    // name is already filled with the new databaselocation
    databaselocation = name;

    // set db to the new databaselocation
    db = new sqlite3.Database(databaselocation);
  }

  // add file path to userData.json. On startup, this new location will 
  // be standard.
  const fs = require('fs');

  // read the file
  fs.readFile(__dirname + '/js/userData.json', (err, userdata) => {
    if (err) {
      console.log('error reading userData.json', err);
    }

    // parse userdata to json
    var json = JSON.parse(userdata);

    // change the location in the json to the new databaselocation
    json.userData[0].Location = databaselocation;

    // write the information to the json-file.
    fs.writeFile(__dirname + '/js/userData.json', JSON.stringify(json), (err) => {
      if (err) console.log('error writing file');
    })
  });

  // reload all the content afterwards.
  reloadContent();

})