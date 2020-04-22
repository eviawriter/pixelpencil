// let's create a new character nnd put it in the database.
function create_character(form, type) {


    // get stuff from form and replace the ' with '' to be able to save it to the database. char_org contains
    // the original name, neccessary to create the correct elements in subnav-characters.
    let charname = formcreatecharacter["form-name"].value.replace(/\'/g, "''");
    let char_org = formcreatecharacter["form-name"].value;
    let chardesc = formcreatecharacter["form-desc"].value.replace(/\'/g, "''");

    console.log(charname, chardesc);

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    // Check chartype. 
    if (type == 'main') {
        var chartype = 1;
    }

    else if (type == 'second') {
        var chartype = 2;
    }

    else if (type == 'other') {
        var chartype = 3;
    }

    else {
        console.log('error, no chartype specified');
    }

    // insert stuff in database with correct chartype.
    let run = "INSERT INTO Characters (charname, charbio, chartype, chartrash) VALUES ('" + charname + "', '" + chardesc + "', '" + chartype + "', 0)";

    db.run(run, function (err) {
        if (err) {
            alert('Error writing to database (function create_character):' + err);
            return;
        }

        else {

            let charid = this.lastID;

            console.log(this);

            create_character_nav(char_org, chartype, charid);

            chartype = [];

        }
    })
}

// Let's add the new character to the nav-menu. 
function create_character_nav(charname, chartype, charid) {

    let create = {
        charid: charid,
        charname: charname,
        chartype: chartype
    }

    // create element with charactername
    const markup = `
        <button class="sn-subitem characters" onclick="subnav_characters(this)" data-charid="${create.charid}" data-chartype="${create.chartype}">
            ${create.charname}
        </button>

        `

    // get element based on chartype
    let update = document.getElementById('subnav-characters').querySelector('.sn-subitems[data-chartype="' + chartype + '"]');

    // add markup before the end.
    update.insertAdjacentHTML('beforeend', markup);

    // close the modal.
    let modal = document.getElementById('modal_create');
    modal.close();
}