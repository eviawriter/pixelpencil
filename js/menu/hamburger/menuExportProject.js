// Changes the chapid of the forward and back button.  
function menuExportChangeButton(chapter, fun) {

    if (fun == 'forward') {
        let id = chapter.dataset.chapid;
        document.getElementById('btn_export_chapters').dataset.chapid = id;
    }

    if (fun == 'back') {
        let id = chapter.dataset.chapid;
        document.getElementById('btn_export_chapters_back').dataset.chapid = id;
    }
}

// Clicking on the green arrow gets the selected option based on it's chapid
// the arrow gets this id when an option is selected.
// After this, we append it to the 'ready for export' box.
function menuExportSelectReady(chapter) {

    let old = document.querySelector('option[data-chapid="' + chapter.dataset.chapid + '"]');

    old.setAttribute("onclick", "javascript:menuExportChangeButton(this, key='back')");

    document.getElementById('menu_export_chapters').appendChild(old);
}

// Clicking on the green arrow gets the selected option based on it's chapid
// the arrow gets this id when an option is selected.
// After this, we append it to the 'chapterlist' box.
function menuExportSelectNotReady(chapter) {

    let old = document.querySelector('option[data-chapid="' + chapter.dataset.chapid + '"]');

    old.setAttribute("onclick", "javascript:menuExportChangeButton(this, key='forward')");

    document.getElementById('menu_export_chapterlist').appendChild(old);
}

// Create new dialogue, that accepts user input. 
function menuExportGetName() {

    const { remote } = require('electron')

    const { BrowserWindow } = remote
    // call the new window with some options. Transparant doesn't work on Nvidia Linux.
    const win = new BrowserWindow({
        width: 500,
        height: 200,
        transparant: false,
        frame: false,
        show: true,

        webPreferences: {
            nodeIntegration: true
        }
    });

    // Open the dev-tools for this particular window.
    win.webContents.openDevTools({ mode: 'detach' })

    // Load the HTML for the window.
    win.loadURL('file://' + __dirname + '/js/menu/hamburger/export-name.html');

}


// here be the exporting done. 
function menuExportProject(filename) {

    // get the currently added options from the element
    let chaplist = document.getElementById("menu_export_chapters");

    console.log(chaplist);
    // push these options in an object. 
    let chap = [];

    for (i = 0; i < chaplist.length; i++) {
        chap.push({ "chapid": chaplist[i].dataset.chapid, "chapname": chaplist[i].textContent });
    }

    console.log(chap);

    let array = [];
    for (i = 0; i < chap.length; i++) {

        array.push(chap[i].chapid);

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
        transparant: false,
        frame: false,
        show: false,

        webPreferences: {
            nodeIntegration: true
        }
    });

    // Open the dev-tools for this particular window.
    win.webContents.openDevTools({ mode: 'detach' })

    // Load the HTML for the window.
    win.loadURL('file://' + __dirname + '/js/menu/hamburger/export.html');

    // Send a message to the window.
    win.webContents.on('did-finish-load', () => {

        // get stuff from the database.
        let data = {
            function: 'get',
            db: 'array',
            simple: 'yes',
            records: 'chapname, subname, subtext',
            table: 'export',
            expression: 'WHERE chapid IN (' + array + ') ORDER BY chaporder, suborder'
        }

        console.log(data);


        database(data, (result) => {

            console.log(result);

            let chapnum = 0;
            let chapter = [];
            let html = [];

            for (i = 0; i < result.length; i++) {

                if (chapter.includes(result[i].chapname)) {

                    let markup = `
                    <h2>${result[i].subname}</h2>
                    <p>${result[i].subtext}</p>`

                    html.push(markup);
                }

                else {
                    let chapnumber = chapnum + 1;
                    chapnum = chapnumber;
                    chapter.push(result[i].chapname);

                    let markup = `
                <h1 class="chapter">Chapter ${chapnumber}: ${result[i].chapname}</h1>

                <h2>${result[i].subname}</h2>

                <p>${result[i].subtext}</p>
            `

                    html.push(markup);
                }
            }

            // get projectname from the database
            let data = {
                function: 'get',
                db: 'array',
                simple: 'yes',
                records: 'projectname',
                table: 'Project',
                expression: ''
            }

            database(data, (result) => {

                console.log(result[0].projectname);

                win.webContents.send('ping', html);

                win.webContents.printToPDF({}).then(data => {

                    console.log(exportdir);

                    fs.writeFile(exportdir + '/' + result[0].projectname + '.pdf', data, (error) => {

                        if (error) throw error
                        console.log('Write PDF successfully.')

                        win.webContents.destroy();
                    })

                }).catch(error => {
                    console.log(error)
                });

            })

        })

    })
}