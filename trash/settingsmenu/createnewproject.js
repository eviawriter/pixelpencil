// open the modal for creating a new project
function newproject() {

    let projectname = formnewproject["projectname"].value;
    let projectdesc = formnewproject["projectdesc"].value;
    let projectword = formnewproject["projectword"].value;
    let projectdate = formnewproject["projectdate"].value;

    console.log(projectname, projectdesc, projectword, projectdate);

    // const path = require('path');

    // let opendir = path.join(projectdir, ''+ locname + '');

    const sqlite3 = require('sqlite3').verbose();

    let dblocal = new sqlite3.Database(projectdir + '/' + projectname + '.evv', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

    console.log(dblocal);

    dblocal.serialize(function (err) {
        if (err) {
            console.log(err);
        }
        // chapterstable
        dblocal.run('CREATE TABLE Chapters(chapid INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, chapname TEXT NOT NULL, chapdesc TEXT, chaporder NUMERIC UNIQUE, chapwords TEXT, chapdate INTEGER, chaptrash INTEGER NOT NULL)');

        // Charactercontent table
        dblocal.run('CREATE TABLE Charactercontent(charsubjectid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, charsubject TEXT, charsubjecttext TEXT, charid TEXT, chapid TEXT, subid TEXT, charcontorder INTEGER, subjecttrash INTEGER NOT NULL)');

        // Character table
        dblocal.run('CREATE TABLE Characters(charid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, charname TEXT NOT NULL, charbio TEXT, charage TEXT, chargender TEXT, chartype TEXT, chartrash INTEGER NOT NULL, charkind INTEGER)');

        // Ideas table
        // db.run('CREATE TABLE Ideas(ideaid INTEGER, ideaname TEXT, ideadesc TEXT, PRIMARY KEY(ideaid))');

        // Project content (name) table
        dblocal.run('CREATE TABLE Project (projectname TEXT, projectdesc TEXT, projectdate TEXT, projectgoal TEXT)');

        // Add form-content to the database table
        let dbrun = "INSERT INTO Project (projectname, projectdesc, projectdate, projectgoal) VALUES ('" + projectname + "', '" + projectdesc + "', '" + projectdate + "', '" + projectword + "')";

        dblocal.run(dbrun, function (err){
            if (err) {
                console.log(err);
            }
        });

        // Subchapters table
        dblocal.run('CREATE TABLE Subchapters(subid INTEGER, suborder INTEGER NOT NULL, chapid INTEGER, subname TEXT NOT NULL, subtext TEXT, subdate NUMERIC, subwords NUMERIC, charid INTEGER, locid INTEGER, ideaid INTEGER, resid INTEGER, subtrash INTEGER NOT NULL, subdesc TEXT, FOREIGN KEY(chapid) REFERENCES Chapters(chapid), PRIMARY KEY(subid), FOREIGN KEY(charid) REFERENCES Characters(charid), FOREIGN KEY(locid) REFERENCES Locations(locid), FOREIGN KEY(ideaid) REFERENCES Ideas(ideaid))');
    })

    // Create the view Chapview.
    dblocal.run('CREATE VIEW chaptree AS SELECT Chapters.chapname, Chapters.chapid, Chapters.chaporder, Chapters.chapdate, Chapters.chapwords, Subchapters.subname AS subname, Subchapters.suborder AS suborder, Subchapters.subid AS subid from Chapters Left JOIN Subchapters ON Subchapters.chapid = Chapters.chapid WHERE Subchapters.subtrash = 0 Order by chaporder, suborder');

    var newdatabaselocation = projectdir + '/' + projectname + '.evv';

    databaselocation = "";
    databaselocation = newdatabaselocation;
    db = new sqlite3.Database(databaselocation);

    console.log(databaselocation);
    // require('electron').remote.getCurrentWindow().reload();

    // And we reset the form
    document.getElementById('formnewproject').reset();

    newprojectreload();
}

function newprojectreload(open) {
    // clear the whole dashboard
    document.getElementById('dashboard').innerHTML = "";

    // clear the whole writing-area
    // first empty the tree
    document.getElementById('accordion').innerHTML = "";

    // empty the editor, hide it and make placeholder-text visible
    document.getElementById('editor').innerHTML = "";
    let hideeditor = document.getElementById("appwrite");
    hideeditor.style.zIndex = "-1";
    let hidetext = document.getElementById("hidden");
    hidetext.style.zIndex = "100";

    // clear the whole characters-area
    // start with emptying the tree
    document.getElementById('characters').innerHTML = "";
    // fill the tree up with the sections    
    document.getElementById('characters').innerHTML = '<section class="tree-container" id="tree-main"><a class="tree-heading">Main characters</a></section><section class="tree-container" id="tree-secondary"><a class="tree-heading">Secondary characters</a></section><section class="tree-container" id="tree-other"><a class="tree-heading">Other characters</a></section>';

    // then empty the character-cards
    document.getElementById('characterdetails').innerHTML = "";

    // clear locations-tree
    document.getElementById('locations').innerHTML = "";

    // clear ideas-tree
    document.getElementById('ideas').innerHTML = "";

    // clear the research-tree
    document.getElementById('research').innerHTML = "";

    setTimeout(() => {
        // chaptree();

        if (open == "openproject") {
            // function to open all categories associated with the new databaselocation.
            // function is located in the file /js/menu/openproject.js

            repopulate();
            console.log('openproject');

        }
    
        else {
            return;
        }

    }, 1000)

    // reset the directorytree in menu_open_dir;
    let opendir = document.getElementById("menu_open_dir");
    opendir.innerHTML = "";

    // repopulate the directory.
    menu_get_directory();    
}