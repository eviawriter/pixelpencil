function subnav_characters(options) {

    let charid = options.dataset.charid;

    // remove all color from subnav-buttons 
    let selected = document.getElementById('subnav-characters').querySelectorAll(".sn-subitem");

    for (i = 0; i < selected.length; i++) {
        selected[i].style.backgroundColor = "";
    }

    // set background of clicked item
    options.style.backgroundColor = "#00AE9D";

    // remove all color from cm-buttons (context menu)
    let context = document.getElementById('cm-characters').querySelectorAll('.cm-button');

    for (i = 0; i < context.length; i++) {
        context[i].style.backgroundColor = "";
    }

    // set context-button 'Character details' active.
    document.getElementById('cm-char-details').style.backgroundColor = "#00AE9D";

    // make action-button visible
    document.getElementById('ac-other').style.visibility = "visible";
    document.getElementById('action-button').style.visibility = "visible";

    console.log(charid);

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    let stuff = "SELECT charname, charkind, charage, chargender, charbio FROM Characters WHERE charid="+charid+" AND chartrash=0"

    db.each(stuff, function (err, char){

        if(err) {
            alert(err);
            return;
        }

        else {

            let pop = {
                id: charid,
                name: char.charname,
                kind: char.charkind,
                age: char.charage,
                gender: char.chargender,
                bio: char.charbio
            }

            if (char.chargender == 'male') {
                var gen = {
                    face: 'id="ct-boy"'
                }
            }

            else if (char.chargender == 'female') {
           
                var gen = {
                    face: 'id="ct-girl"'
                }
            }

            else {
                var gen = {
                    face: ""
                }
            }

            // ct is abbriviation of content. These classes can be used in all content-related categories. 
            const markup = `
            
                <div class="ct-wrapper" data-charid=${pop.id}>
                    
                    <div class="ct-details">
                        
                        <div ${gen.face} class="ct-image" data-charid=${pop.id}></div>
                    
                        <div class="ct-details-left">
                            <h1 class="ct-details-name" data-charid=${pop.id}>${pop.name}</h1>
                            <div class="ct-details-kind" placeholder="protagonist / antagonist" data-charid=${pop.id}>${pop.kind}</div>
                            <div class="ct-details-age" placeholder="Age" data-charid=${pop.id}>${pop.age}</div>
                            <div class="ct-details-gender" placeholder="male, female or other" data-charid=${pop.id}>${pop.gender}</div>
                        </div>
                    </div>

                    <div class="ct-details-right" data-charid=${pop.id}>
                        <div class="ct-details-edit" onclick="javascript:open_modal_content(this, key='char-details')" data-charid=${pop.id}></div>
                        <h1 class="ct-desc-title">Short bio</h1>
                        <div class="ct-desc-text" placeholder="Click to edit..." data-charid=${pop.id}>${pop.bio}</div>
                    </div>

                    <div class="ct-space"></div>

                </div>

            `

            document.getElementById('box-content-characters').innerHTML = markup;

            subnav_characters_subjects(charid);

        }

    })

}

// Add the subjects
function subnav_characters_subjects(charid) {

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    let stuff = "SELECT subjectid, subject, subjecttext, charid FROM Charactercontent WHERE subjecttrash=0 AND charid=" +charid+ " ORDER BY subjectorder";

    db.all(stuff, function(err, pop){

        if (err) {
            alert(err);
        }

        else {

            // put it all in a container (ct-subject). 
            const markup = `
                ${pop.map(pop => `
                <div class="ct-subject" data-charid=${pop.charid} data-subjectid=${pop.subjectid}>
                    <div class="ct-subject-edit" onclick="javascript:open_modal_content(this, key='EditCharSub')" data-charid=${pop.charid} data-subjectid=${pop.subjectid}></div>
                    <div class="ct-subject-trash" onclick="javascript:delete_char_subject(this)" data-charid=${pop.charid} data-subjectid=${pop.subjectid}></div>
                    <h1 class="ct-subject-header" contenteditable="false" placeholder="Click here to add a title..." data-charid=${pop.charid} data-subjectid=${pop.subjectid}>${pop.subject}</h1>
                    <div class="ct-subject-text" contenteditable="false" placeholder="Click here to add text..." data-charid=${pop.charid} data-subjectid=${pop.subjectid}>${pop.subjecttext}</div>
                </div>
                `).join('')}
            `

            // attach it at the end of the ct-wrapper (with the correct charid).
            document.getElementById('box-content-characters').querySelector('.ct-wrapper[data-charid="'+ charid + '"]').insertAdjacentHTML('beforeend', markup);
        }

    })

    // Make sure the 'add subject' button in box-actions has the right charid. 
    // document.getElementById('ac-characters').querySelector('.create_save_button').dataset.charid = charid;
    let tooltip = document.getElementById('ac-characters').querySelectorAll('.tooltip');

    let it;

    for (it = 0; it < tooltip.length; it++) {
        tooltip[it].dataset.charid = charid;
    }
}