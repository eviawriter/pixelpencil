function subnav_characters(options, search) {

    var charid = options.dataset.charid;
    console.log(charid);

    // remove all color from subnav-buttons 
    let selected = document.getElementById('subnav-characters').querySelectorAll(".sn-subitem");

    for (i = 0; i < selected.length; i++) {
        selected[i].style.backgroundColor = "";
    }

    // only neccessary if you search stuff
    if (search != '') {
        let select = document.getElementById('subnav-characters').querySelector('.sn-subitem[data-charid="'+charid+'"]');
        console.log(select);
        select.style.backgroundColor = "#00AE9D";

        // open the whole character-menu
        let stuff = document.getElementById('menu-characters');
        menu('characters', stuff)
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

    let stuff = "SELECT charname, charkind, charage, chargender, charbio FROM Characters WHERE charid=" + charid + " AND chartrash=0"

    db.each(stuff, function (err, char) {

        if (err) {
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

            subnav_characters_subjects(charid, search);

        }

    })

}

// Add the subjects
function subnav_characters_subjects(charid, search) {

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    let stuff = "SELECT subjectid, subject, subjecttext, charid FROM Charactercontent WHERE subjecttrash=0 AND charid=" + charid + " ORDER BY subjectorder";

    db.all(stuff, function (err, pop) {

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
            document.getElementById('box-content-characters').querySelector('.ct-wrapper[data-charid="' + charid + '"]').insertAdjacentHTML('beforeend', markup);
        }

    })

    // Make sure the 'add subject' button in box-actions has the right charid. 
    // document.getElementById('ac-characters').querySelector('.create_save_button').dataset.charid = charid;
    let tooltip = document.getElementById('ac-characters').querySelectorAll('.tooltip');

    let it;

    for (it = 0; it < tooltip.length; it++) {
        tooltip[it].dataset.charid = charid;
    }

    if (search != undefined) {
        console.log(search);
        subnavCharHighlight(search);
    }
}

function subnavCharHighlight(search) {

    // make cont a string
    let innerhtml = document.getElementById('box-content-characters').innerHTML;
    console.log(innerhtml);
    let content = innerhtml.toString();
    console.log(content);

    let pattern = new RegExp("(" + search + ")", "gi");
    let new_text = content.replace(pattern, "<span class='highlight'>" + search + "</span>");

    document.getElementById('box-content-characters').innerHTML = new_text;

    console.log(pattern);
    console.log(new_text);

    // add eventlistener to the editor
    document.getElementById('box-content-characters').addEventListener('click', function subnavCharClicked() {

        document.getElementById('box-content-characters').removeEventListener('click', subnavCharClicked, false);

        //  get innerhtml of editor
        let inner = document.getElementById('box-content-characters').innerHTML;

        // make it a string
        let string = inner.toString();

        console.log(string);

        // make a regexp as searchpattern
        let pattern2 = new RegExp("<span class=\"highlight\">" + search + "</span>", "gi");
        console.log(pattern2);

        // replace every instance of pattern2 in string
        let new_text2 = string.replace(pattern2, search);
        console.log(new_text2);

        // replace current content with new_text2.
        document.getElementById('box-content-characters').innerHTML = new_text2;

    }, false);

    let high = document.querySelector('.highlight');

    console.log(high);

    high.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}