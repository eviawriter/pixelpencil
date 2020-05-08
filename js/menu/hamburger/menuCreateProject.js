function createProject() {

    // title
    let name_esc = createproject["form-name"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;").replace(/\,/g, "&#44;");
    let name = createproject["form-name"].value;

    let desc_esc = createproject["form-desc"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;").replace(/\,/g, "&#44;");
    let desc = createproject["form-desc"].value;

    let word = createproject["form-words"].value;

    let dead = createproject["form-dead"].value;

    let markup = `
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    `

    document.getElementById('hamcontent').innerHTML = markup;

    // create new file
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database(projectdir + '/' + name + '.evv', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

    console.log(db);

    db.serialize(function (err) {

        if (err) {
            console.log(err);
        }

        // create table Chapters
        db.run(`
        CREATE TABLE "Chapters" (
            "chapid"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
            "chapname"	TEXT NOT NULL,
            "chapdesc"	TEXT,
            "chaporder"	NUMERIC UNIQUE,
            "chapwords"	TEXT,
            "chapdate"	INTEGER,
            "chaptrash"	INTEGER NOT NULL,
            "count"	INTEGER
        )`);

        // create charactercontent
        db.run(`
        CREATE TABLE "Charactercontent" (
            "subjectid"	INTEGER NOT NULL UNIQUE,
            "subject"	TEXT,
            "subjecttext"	TEXT,
            "charid"	TEXT,
            "chapid"	TEXT,
            "subid"	TEXT,
            "subjectorder"	INTEGER,
            "subjecttrash"	INTEGER NOT NULL,
            PRIMARY KEY("subjectid" AUTOINCREMENT)
        )`);

        // create characters
        db.run(`
        CREATE TABLE "Characters" (
            "charid"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
            "charname"	TEXT NOT NULL,
            "charbio" TEXT,
            "charage"	TEXT,
            "chargender"	TEXT,
            "chartype"	TEXT,
            "chartrash"	INTEGER NOT NULL,
            "charkind"	INTEGER
        )`);

        // create Ideas
        db.run(`
        CREATE TABLE "Ideas" (
            "ideaid"	INTEGER PRIMARY KEY AUTOINCREMENT,
            "title"	TEXT,
            "text"	TEXT,
            "catid"	INTEGER,
            "trash"	INTEGER
        )`);

        // create IdeasCategory
        db.run(`
        CREATE TABLE "IdeasCategory" (
            "catid"	INTEGER PRIMARY KEY AUTOINCREMENT,
            "title"	TEXT,
            "text"	TEXT,
            "trash"	INTEGER NOT NULL
        )`);

        // create IdeasContent
        db.run(`
        CREATE TABLE "IdeasContent" (
            "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "ideaid"	INTEGER NOT NULL,
            "chapid"	INTEGER,
            "subid"	INTEGER,
            "title"	TEXT,
            "text"	TEXT,
            "order"	INTEGER,
            "trash"	INTEGER NOT NULL
        )`);

        // create LocCategory
        db.run(`
        CREATE TABLE "LocCategory" (
            "catid"	INTEGER PRIMARY KEY AUTOINCREMENT,
            "catdesc"	TEXT,
            "catname"	TEXT,
            "trash"	INTEGER NOT NULL
        )`);

        // create LocContent
        db.run(`
        CREATE TABLE "LocContent" (
            "locoid"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "locid"	INTEGER NOT NULL,
            "chapid"	INTEGER,
            "subid"	INTEGER,
            "title"	TEXT,
            "text"	TEXT,
            "order"	INTEGER,
            "trash"	INTEGER NOT NULL
        )`);

        // create Locations
        db.run(`
        CREATE TABLE "Locations" (
            "locid"	INTEGER,
            "locname"	TEXT,
            "locdesc"	TEXT,
            "catid"	INTEGER,
            "trash"	INTEGER NOT NULL,
            PRIMARY KEY("locid")
        )`);

        // create Project
        db.run(`
        CREATE TABLE "Project" (
            "projectid"	INTEGER PRIMARY KEY AUTOINCREMENT,
            "projectname"	TEXT,
            "projectdesc"	TEXT,
            "projectdate"	INTEGER,
            "deadconcept"	INTEGER,
            "deadrevision"	INTEGER,
            "deadwords"	TEXT
        )`);

        // create Research
        db.run(`
        CREATE TABLE "Research" (
            "resid"	INTEGER,
            "resname"	TEXT,
            "resdesc"	TEXT,
            "trash"	INTEGER NOT NULL,
            PRIMARY KEY("resid")
        )`);

        // create Statistics
        db.run(`
        CREATE TABLE "Statistics" (
            "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
            "startdate"	INTEGER,
            "enddate"	INTEGER,
            "startcount"	NUMERIC,
            "endcount"	NUMERIC
        )`);

        // create subchapters
        db.run(`
        CREATE TABLE "Subchapters" (
            "subid"	INTEGER,
            "suborder"	INTEGER NOT NULL,
            "chapid"	INTEGER,
            "subname"	TEXT NOT NULL,
            "subtext"	TEXT,
            "subdate"	NUMERIC,
            "subwords"	NUMERIC,
            "charid"	INTEGER,
            "locid"	INTEGER,
            "ideaid"	INTEGER,
            "resid"	INTEGER,
            "subtrash"	INTEGER NOT NULL,
            "subdesc"	TEXT,
            "count"	INTEGER,
            FOREIGN KEY("ideaid") REFERENCES "Ideas"("ideaid"),
            FOREIGN KEY("locid") REFERENCES "Locations"("locid"),
            FOREIGN KEY("charid") REFERENCES "Characters"("charid"),
            FOREIGN KEY("chapid") REFERENCES "Chapters"("chapid"),
            PRIMARY KEY("subid")
        )`);

        // create VIEW words
        db.run(`
        CREATE VIEW words AS SELECT Chapters.chapname, Chapters.chapid, Chapters.chaporder, Chapters.chaptrash, Subchapters.subname AS subname, Subchapters.subid AS subid, Subchapters.count AS words from Chapters Left JOIN Subchapters ON Subchapters.chapid = Chapters.chapid WHERE Chapters.chaptrash = 0 AND Subchapters.count IS NOT NULL Order by chaporder, suborder  
        `);

        db.run(`
        INSERT INTO Project (projectname, projectdesc, projectdate, deadwords) VALUES ('${name_esc}', '${desc_esc}', '${dead}', '${word}')
        `, (err) => {
            if (err) {
                console.log(err);
            }

            console.log('humor');

            ipcRenderer.emit('database created', name);
        })
    });
};
