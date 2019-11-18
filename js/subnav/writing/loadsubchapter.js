// function called when clicking on subchapter

function subnav_writing(content) {

    // set background to empty
    let selected = document.getElementById('subnav-writing').querySelectorAll(".sn-subitem");

    let i;

    for (i = 0; i < selected.length; i++) {
        selected[i].style.backgroundColor = "";
    }

    // set background of clicked item
    content.style.backgroundColor = "#00AE9D";

    // set context stuff
    set_context_nav(content);

}

// function to set the context-navigation. Sets only the subid, which is used to get information
// from the database
function set_context_nav(content) {

    let subid = content.dataset.subid;
    console.log(subid);

    let stor = document.getElementById('cm-write-story');
    let char = document.getElementById('cm-write-characters');
    let loca = document.getElementById('cm-write-locations');
    let idea = document.getElementById('cm-write-ideas');
    let rese = document.getElementById('cm-write-research');

    stor.dataset.subid = subid;
    char.dataset.subid = subid;
    loca.dataset.subid = subid;
    idea.dataset.subid = subid;
    rese.dataset.subid = subid;

    console.log(stor, char, loca, idea, rese);

    // initialize the editor with the current subid
    set_editor(subid);

}

// inserts data into the editor
function set_editor(subid) {

    var editor = document.getElementById('editor');

    // first save the current content:
    // get content from the editor and make the ' saveable. 
    let currentsubid = document.getElementById('editor').dataset.subid;
    let rawcontent = document.getElementById("editor").innerHTML;
    let content = rawcontent.replace(/\'/g, "''");

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // koppel de database of maak een nieuwe database aan
    let db = new sqlite3.Database(databaselocation);

    db.run("UPDATE Subchapters SET subtext = '" + content + "' WHERE subid = '" + currentsubid + "' ", function (err) {

        if (err) {
            return console.error(err.message);
        }

        console.log(content, subid)

    });

    // then remove eventlisteners
    editor.removeEventListener('keydown', save_editor, false);

    // then clear the current content
    editor.innerHTML = "";

    // load new content based on subid
    let stuff = "SELECT DISTINCT subtext FROM Subchapters WHERE subid = '" + subid + "'";
    db.get(stuff, function (err, row) {
        if (err) {
            console.log(err);
        }

        else {
            let subtext = row.subtext;
            editor.innerHTML = subtext;
            console.log(subtext);

            count_current_words();

        }
    })

    // change data-subid with the new one. 
    editor.dataset.subid = subid;

    // add eventlisteners to autosave stuff. 
    editor.addEventListener('keydown', update_editor, true);

    db.close();

}

// just count the words in the new subchapter. 
function count_current_words() {

    let words = document.getElementById('editor').textContent;

    count = words.trim().replace(/\s+/g, ' ').split(' ').length;
        
    document.getElementById('ac-countword').textContent = count + ' words';

}

// update editor when typing stuff
function update_editor(e) {

    var toets = e.keyCode;
    var ctrls = e.ctrlKey;

    if (toets == 32 || toets == 13 || ctrls == true && toets == 83 || toets == 190 || toets == 191 || toets == 188 || toets == 186 || toets == 49) {
        
        // if the right key is hit, execute function save_editor
        save_editor();
    }
}


function save_editor() {

    // get content from the editor and make the ' saveable.
    let subid = document.getElementById('editor').dataset.subid;
    let rawcontent = document.getElementById("editor").innerHTML;
    let content = rawcontent.replace(/\'/g, "''");

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // koppel de database of maak een nieuwe database aan
    let db = new sqlite3.Database(databaselocation);

    // We've already set a few global variables in setglobalvariables.js and we use 
    // these to update the database with the content of 'let content' above. The global variables
    // are chapid and subid.
    db.run("UPDATE Subchapters SET subtext = '" + content + "' WHERE subid = '" + subid + "' ", function (err) {
        // db.run(sql, content, function (err) {

        if (err) {
            return console.error(err.message);
        }
        console.log(content, subid)
    });

    db.close();
    return;

}