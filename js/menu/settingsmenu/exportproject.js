// Needed to populate the list of chapters you can select to be exported. 
function populate_export_chapters() {

    // make sure there are no options left in both boxes.
    let chaplist = document.getElementById('menu_export_chapterlist');
    let chapselect = document.getElementById('menu_export_chapters');
    chaplist.innerHTML = "";
    chapselect.innerHTML = "";

    // activeer sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // koppel de database of maak een nieuwe database aan
    let db = new sqlite3.Database(databaselocation);

    // get the chapname, chapid and chaporder from the database.
    let dbget = "SELECT DISTINCT chapname, chapid, chaporder FROM Chapters ORDER BY chaporder";

    db.each(dbget, function (err, row) {
        // create a new option and append it to menu_export_chapterlist (left side)
        let chapterlist = document.getElementById('menu_export_chapterlist');

        let option = document.createElement('option');
        option.setAttribute("value", row.chapname);
        option.setAttribute("onclick", "javascript:export_select_selected(this, key='forward');");
        option.dataset.chapid = JSON.stringify(row.chapid);
        option.dataset.chaporder = JSON.stringify(row.chaporder);
        option.dataset.chaplist = "chaplist";
        option.textContent = row.chapname;

        chapterlist.appendChild(option);
    });

    // sort the stuff out. 
    export_sort_chapterlist();
}

// sort the chapterlist of both menu_export_chapterlist and menu_export_chapters in one function
function export_sort_chapterlist() {

    // first sort the menu_export_chapterlist (left side);
    var chaplistselect = document.getElementById('menu_export_chapterlist');

    // second sort the menu_export_chapters (right side)
    var chaplist = document.getElementById('menu_export_chapters');

    // create two empty variables and put the classes into an array. 
    let divs = [];
    let divs2 = [];

    // sort the menu_export_chapterlist (left side);
    for (var i = 0; i < chaplistselect.length; ++i) {
        divs.push(chaplistselect[i]);
    }

    // Sort the divs based on data-chaporder. 
    divs.sort(function (a, b) {
        return +a.getAttribute("data-chaporder") - +b.getAttribute("data-chaporder");
    });

    // Put them where they belong.
    divs.forEach(function (el) {
        document.getElementById('menu_export_chapterlist').appendChild(el);
    });

    // now sort the menu_export_chapters (right side)
    for (var i = 0; i < chaplist.length; ++i) {
        divs2.push(chaplist[i]);
    }

    // Sort the divs based on chaporder. 
    divs2.sort(function (a, b) {
        return +a.getAttribute("data-chaporder") - +b.getAttribute("data-chaporder");
    });

    // Put them where they belong.
    divs2.forEach(function (ele) {
        document.getElementById('menu_export_chapters').appendChild(ele);
    });

};

// when cliking on the  forward arrow, move the option fromm the left to the right box.
// the key 'back' in the function export_select_selected is added to the onclick-attribute.
// This way, the function knows which button to select.
function export_selected(chapter) {
    let oldoption = document.querySelector('option[data-chapid="' + chapter.dataset.chapid + '"]');
    oldoption.setAttribute("onclick", "javascript:export_select_selected(this, key='back')");
    let newoption = document.getElementById('menu_export_chapters');

    newoption.appendChild(oldoption);

    export_sort_chapterlist();
}

// same as export_selected, but for the back arrow.
function export_selected_back(options) {

    let oldoption = document.querySelector('option[data-chapid="' + options.dataset.chapid + '"]');
    oldoption.setAttribute("onclick", "javascript:export_select_selected(this, key='forward')");
    let newoption = document.getElementById('menu_export_chapterlist');

    newoption.appendChild(oldoption);

    export_sort_chapterlist();
}

// when an option is selected, the information in this option is passed to the button. When clicked on the
// button, the function export_selected or export_selected_back is activated. 
function export_select_selected(options, key) {

    if (key == 'forward') {

        let arrow = document.getElementById('btn_export_chapters');
        arrow.dataset.chapid = options.dataset.chapid;
        arrow.dataset.value = options.value;
    }

    else if (key == 'back') {
        let arrow = document.getElementById('btn_export_chapters_back');
        arrow.dataset.chapid = options.dataset.chapid;
        arrow.dataset.value = options.value;
    }

    else {
        alert('something went wrong, because you should not have to read this');
    }
}

// this function does the actual exporting of the files. 
function exportproject() {
    console.log('export begins here');

    // get the currently added options from the element
    let chaplist = document.getElementById("menu_export_chapters");

    // push these options in an object. 
    let chap = [];

    for (i = 0; i < chaplist.length; i++) {
        chap.push({ "chapid": chaplist[i].dataset.chapid, "chapname": chaplist[i].textContent });

    }

    // get the rest of the form stuff.
    let format = formexportproject["format"].value;

    let char = formexportproject["characters"].checked;
    let rese = formexportproject["research"].checked;
    let loca = formexportproject["locations"].checked;
    let idea = formexportproject["ideas"].checked;

    // create a new HTML-document to push all the chapters and subchapters in.
    // first require remote and attach it BrowserWindow
    const { remote } = require('electron')
    
    const { BrowserWindow } = remote

    // call the new window with some options. Transparant doesn't work on Nvidia Linux.
    const win = new BrowserWindow({ 
        width: 500, 
        height: 200, 
        transparant: true, 
        frame: true, 
    
        webPreferences: {
        nodeIntegration: true
    }
    });

    // Open the dev-tools for this particular window.
    win.webContents.openDevTools({ mode: 'detach'})

    // Load the HTML for the window.
    win.loadURL('file://' + __dirname + '/appdata/html/export.html');
    
    // Send a message to the window.
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('options', databaselocation, chap, format, char, rese, loca, idea);
    });

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('chap', chap);
    });

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('format', format);
    });

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('char', char);
    });

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('rese', rese);
    });

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('loca', loca);
    });

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('idea', idea);
    });


    // based on the selected file format, start creating the document. 
    if (format == "pdf") {

        chap.forEach(function (chap, docu) {
            start_create_pdf(docu, chap, char, rese, loca, idea);

        });
    }

    else if (format == "doc") {
        chap.forEach(function (chap, docu) {

            start_create_doc(docu, chap, char, rese, loca, idea);

        });
    }

    else if (format == "docx") {
        chap.forEach(function (chap, docu) {

            start_create_docx(docu, chap, char, rese, loca, idea);

        });
    }

    else if (format == "epub") {
        chap.forEach(function (chap, docu) {

            start_create_epub(docu, chap, char, rese, loca, idea);
        
        });
    }

    else {
        // should be impossible
        alert('Format not selected');
        return;
    }

}

function start_create_pdf(docu, chap, char, rese, loca, idea) {
    console.log(chap);
    console.log(char);
    console.log(rese);
    console.log(loca);
    console.log(idea);
    let docucheck = docu.documentElement;
    console.log(docucheck);

    // activeer sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // koppel de database of maak een nieuwe database aan
    let db = new sqlite3.Database(databaselocation);

    // get the chapname, chapid and chaporder from the database.
    let dbget = "SELECT DISTINCT chapname, chapid, chaporder FROM Chapters ORDER BY chaporder";

    db.each(dbget, function (err, row) {

    })
};

function start_create_doc(chap, char, rese, loca, idea) {

}

function start_create_docx(chap, char, rese, loca, idea) {

}

function start_create_epub(chap, char, rese, loca, idea) {

}
