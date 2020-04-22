function add_subject() {

    console.log('updating database with subject and answer details');

    let subj = formactioncharacter["form-name"].value.replace(/\'/g, "''");
    let orgi = formactioncharacter["form-name"].value;

    let answ = formactioncharacter["form-desc"].value.replace(/\'/g, "''");
    let orga = formactioncharacter["form-desc"].value;

    let chid = formactioncharacter.dataset.id;

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    // insert stuff in database with correct chartype.
    let run = "INSERT INTO Charactercontent (subject, subjecttext, charid, subjecttrash) VALUES ('" + subj + "', '" + answ + "', '" + chid + "', 0)";

    db.run(run, function (err) {
        if (err) {
            alert('Error writing to database (function add_subject):' + err);
            return;
        }

        else {

            let subjid = this.lastID;

            create_subject(orgi, orga, chid, subjid);

        }
    })
}

function create_subject(subj, answ, chid, subjid) {

    // create the markup and add it to the end of the element (ct-wrapper)
    let markup = `
        <div class="ct-subject" data-charid="${chid}" data-subjectid="${subjid}">
            <div class="ct-subject-edit" onclick="javascript:open_modal_content(this, key='EditCharSub')" data-charid="${chid}" data-subjectid="${subjid}"></div>
            <div class="ct-subject-trash" onclick="javascript:delete_char_subject(this)" data-charid="${chid}" data-subjectid="${subjid}"></div>
            <h1 class="ct-subject-header" placeholder="Click here to add a title..." data-charid="${chid}" data-subjectid="${subjid}">${subj}</h1>
            <div class="ct-subject-text" placeholder="Click here to add text..." data-charid="${chid}" data-subjectid="${subjid}">${answ}</div>
        </div>
    `

    document.querySelector('.ct-wrapper[data-charid = "' + chid + '"').insertAdjacentHTML('beforeend', markup);

    console.log('Subject is added...');

    // close the modal.
    let modal = document.getElementById('modal_action');
    modal.close();
}