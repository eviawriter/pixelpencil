// function called when clicking on subchapter

function subnav_writing(content, search) {

    // set background to empty
    let selected = document.getElementById('subnav-writing').querySelectorAll(".sn-subitem");

    for (a = 0; a < selected.length; a++) {
        selected[a].style.backgroundColor = "";
    }

    // set background of clicked item
    content.style.backgroundColor = "#00AE9D";

    // set color of contextmenu (story)
    let context = document.getElementById('cm-writing').querySelectorAll('.cm-button');

    for (b = 0; b < context.length; b++) {
        context[b].style.backgroundColor = "";
    }

    document.getElementById('cm-write-story').style.backgroundColor = "rgb(0, 174, 157)";

    // set context stuff
    set_context_nav(content, search);

}

// function to set the context-navigation. Sets only the subid, which is used to get information
// from the database
function set_context_nav(content, search) {

    let subid = content.dataset.subid;
    console.log(subid);

    let stor = document.getElementById('cm-write-story');
    let char = document.getElementById('cm-write-characters');
    let loca = document.getElementById('cm-write-locations');
    let idea = document.getElementById('cm-write-ideas');
    let rese = document.getElementById('cm-write-research');

    stor.dataset.subid = subid;
    //    char.dataset.subid = subid;
    //    loca.dataset.subid = subid;
    //    idea.dataset.subid = subid;
    //    rese.dataset.subid = subid;

    console.log(stor, char, loca, idea, rese);

    // initialize the editor with the current subid
    set_editor(subid, search);
}

// inserts data into the editor
function set_editor(subid, search) {

    console.log(search);
    // make toolbar and editor visible
    document.getElementById('box-content-writing').style.visibility = "visible";

    var editor = document.getElementById('editor');

    // first save the current content:
    // get content from the editor and make the ' saveable. 
    let currentsubid = document.getElementById('editor').dataset.subid;
    let rawcontent = document.getElementById("editor").innerHTML;

    // get the raw content and put it into a string
    let string = rawcontent.toString();
    console.log(string);

    // check if the text is highlighted by span class highlight
    let searching = document.querySelector('.highlight');

    console.log(searching);
    
    // if so:
    if (searching != null) {

        let search_key = searching.innerText;

        console.log('yes, there is a search key');

        // make a regexp as searchpattern
        let pattern = new RegExp("<span class=\"highlight\">" + search_key + "</span>", "gi");
        console.log(pattern);

        // replace every instance of pattern2 in string
        let new_text = string.replace(pattern, search_key);
        console.log(new_text);

        // replace current content with new_text2.
        rawcontent = new_text;
        console.log(rawcontent);
    }

    let content = rawcontent.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");

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

            // had some problems with saving double quotes. Electron
            // created new quotes when inserting the subtext in the document.
            // saving those into the database would end up in double quotes. 
            // solution: change the single and double quotes back 
            // to it's original ;)
            let single = new RegExp("&apos;", "gi");
            let double = new RegExp("&quot;", "gi");

            let raw_subtext = row.subtext;
            let subtext_first = raw_subtext.replace(single, '\'');
            let subtext_last = subtext_first.replace(double, '\"');
            
            editor.innerHTML = subtext_last;
            console.log(subtext_last);
            console.log(search);

            if (search != undefined) {

                console.log(search);

                subnavFindScrollpoint(search);

            }

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
    let content = rawcontent.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    let rawcount = document.getElementById('ac-countword').innerText;
    let count = rawcount.replace(' words', ' ');

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // koppel de database of maak een nieuwe database aan
    let db = new sqlite3.Database(databaselocation);

    // We've already set a few global variables in setglobalvariables.js and we use 
    // these to update the database with the content of 'let content' above. The global variables
    // are chapid and subid.
    db.run("UPDATE Subchapters SET subtext = '" + content + "', count = '" + count + "' WHERE subid = '" + subid + "' ", function (err) {
        // db.run(sql, content, function (err) {

        if (err) {
            return console.error(err.message);
        }
        console.log(content, subid, count)
    });

    db.close();
    return;

}

function subnavFindScrollpoint(search) {

    // make cont a string
    let cont_innerhtml = document.getElementById('editor').innerHTML;
    console.log(cont_innerhtml);
    let content = cont_innerhtml.toString();
    console.log(content);

    let pattern = new RegExp("(" + search + ")", "gi");
    let new_text = content.replace(pattern, "<span class='highlight'>" + search + "</span>");

    document.getElementById('editor').innerHTML = new_text;

    console.log(pattern);
    console.log(new_text);

    // add eventlistener to the editor
    document.getElementById('editor').addEventListener('click', function clicked() {

        document.getElementById('editor').removeEventListener('click', clicked, false);

        //  get innerhtml of editor
        let editor = document.getElementById('editor').innerHTML;

        // make it a string
        let string = editor.toString();

        console.log(string);

        // make a regexp as searchpattern
        let pattern2 = new RegExp("<span class=\"highlight\">" + search + "</span>", "gi");
        console.log(pattern2);

        // replace every instance of pattern2 in string
        let new_text2 = string.replace(pattern2, search);
        console.log(new_text2);

        // replace current content with new_text2.
        document.getElementById('editor').innerHTML = new_text2;

    }, false);

    let high = document.querySelector('.highlight');

    console.log(high);

    high.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

// font button
function fontEditor(fontName) {
    document.execCommand("fontName", false, fontName);
};

// Changing the fontsize
function fontSize(fontSize) {
    document.execCommand("fontSize", false, fontSize);
}