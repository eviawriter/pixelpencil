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

// here be the exporting done. 
function menuExportProject(filename) {

    // get the form stuff.
    let format = formexportproject["format"].value;

    let char = formexportproject["characters"].checked;
    // let rese = formexportproject["research"].checked;
    let loca = formexportproject["locations"].checked;
    let idea = formexportproject["ideas"].checked;

    // get the currently added options from the element
    let chaplist = document.getElementById("menu_export_chapters");

    // let's add some loading screen.
    let markup = `
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    `

    document.getElementById('hamcontent').innerHTML = markup;

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

    // get timestamp, used for naming the folders where the export
    // will be saved. 
    var time = Date.now() / 1000 | 0;

    menuExportProjectContent(array, format, char, loca, idea, time);
}

function menuExportProjectContent(array, format, char, loca, idea, time) {

    // first get stuff from the database.
    const content = new Promise(function (resolve, reject) {

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

            menuExportWindow(html, format, 'content', time);

            resolve('done');
        })
    })

    content
        .then(menuExportCharacters(char, format, time))
        .then(menuExportLocations(loca, format, time))
        .then(menuExportIdeas(idea, format, time))
    // .then(menuExportResearch(rese, format))
        .then(killmodal(time))
    // .catch(handleErrors)
}

function menuExportCharacters(char, format, time) {

    if (char) {

        let data = {
            function: 'get',
            db: 'array',
            simple: 'yes',
            records: 'charname, charbio, charage, chargender, charkind, subject, chartext',
            table: 'exportchar',
            expression: ''
        }

        database(data, (result) => {

            let character = [];
            let html = [];

            for (i = 0; i < result.length; i++) {

                if (character.includes(result[i].charname)) {

                    let markup = `
                            <h2>${result[i].subject}</h2>
                            <p>${result[i].chartext}</p>`

                    html.push(markup);
                }

                else {

                    character.push(result[i].charname);

                    let markup = `
                        <h1 class="chapter">Character: ${result[i].charname}</h1>
                        <p>Age: ${result[i].charage}</p>
                        <p>Gender: ${result[i].chargender}</p>
                        <p>Kind: ${result[i].charkind}</p>

                        <h2>Charbio</h2>
                        <p>${result[i].charbio}</p>
                    
                        <h2>${result[i].subject}</h2>
        
                        <p>${result[i].chartext}</p>
                    `

                    html.push(markup);
                    // win.webContents.on('did-finish-load', () => {
                    //     win.webContents.send('export char', html);
                    // })
                }
            }

            menuExportWindow(html, format, 'characters', time)
        })
    }
}

function menuExportLocations(loca, format, time) {

    // Check if locations is selected
    if (loca) {

        // get stuff from the database (using a sqlite VIEW)
        let data = {
            function: 'get',
            db: 'array',
            simple: 'yes',
            records: 'locname, locdesc, catname, conttitle, conttext',
            table: 'exportloca',
            expression: ''
        }

        database(data, (result) => {

            console.log(result);

            // Need some empty variables.
            let category = [];
            let location = [];
            let html = [];

            for (i = 0; i < result.length; i++) {

                // the result always contains a catname. If it's not present in
                // the variable category, we create a new variable with the html.
                if (!category.includes(result[i].catname)) {

                    var cat = `<h1>Category: ${result[i].catname}</h1>`

                    // push the catname into the variable category. It's not
                    // neccessary for the category to be added every time, 
                    // so the next item in the loop from this category will ignore
                    // this part. 
                    category.push(result[i].catname);
                }

                else {
                    // cat needs to be empty for the next location in this category.
                    var cat = [];
                }

                // see !category.includes(...)
                if (!location.includes(result[i].locname)) {

                    var loc = `
                        <h2>Location: ${result[i].locname}</h2>
                        <p>Description: ${result[i].locdesc}</p>            
                    `

                    location.push(result[i].locname);
                }

                else {
                    var loc = [];
                }

                // create the markup, add the variables cat and loc. they are
                // either empty or filled with content.
                let markup = `
                    ${cat} ${loc}
                    <h3>${result[i].conttitle}</h3>
                    <p>${result[i].conttext}</p>
                `
                html.push(markup);
            }

            // go to the next function
            menuExportWindow(html, format, 'locations', time);

        })
    }
}

function menuExportIdeas(cat, format, time) {

    // Check if locations is selected
    if (cat) {

        // get stuff from the database (using a sqlite VIEW)
        let data = {
            function: 'get',
            db: 'array',
            simple: 'yes',
            records: 'title, text, catname, conttitle, conttext',
            table: 'exportidea',
            expression: ''
        }

        database(data, (result) => {

            console.log(result);

            // Need some empty variables.
            let category = [];
            let idea = [];
            let html = [];

            for (i = 0; i < result.length; i++) {

                // the result always contains a catname. If it's not present in
                // the variable category, we create a new variable with the html.
                if (!category.includes(result[i].catname)) {

                    var cat = `<h1>Category: ${result[i].catname}</h1>`

                    // push the catname into the variable category. It's not
                    // neccessary for the category to be added every time, 
                    // so the next item in the loop from this category will ignore
                    // this part. 
                    category.push(result[i].catname);
                }

                else {
                    // cat needs to be empty for the next location in this category.
                    var cat = [];
                }

                // see !category.includes(...)
                if (!idea.includes(result[i].title)) {

                    var head = `
                        <h2>Idea: ${result[i].title}</h2>
                        <p>Description: ${result[i].text}</p>            
                    `

                    idea.push(result[i].title);
                }

                else {
                    var head = [];
                }

                // create the markup, add the variables cat and loc. they are
                // either empty or filled with content.
                let markup = `
                    ${cat} ${head}
                    <h3>Idea content:</h3>
                    <h4>${result[i].conttitle}</h4>
                    <p>${result[i].conttext}</p>
                `
                html.push(markup);
            }

            // go to the next function
            menuExportWindow(html, format, 'ideas', time);

        })
    }
}

function menuExportWindow(html, format, type, time) {

    // Create a new browser window:
    // create a new HTML-document to push all the chapters and subchapters in.
    // first require remote and attach it BrowserWindow
    const { remote } = require('electron')

    const { BrowserWindow } = remote
    // call the new window with some options. Transparant doesn't work on Nvidia Linux.
    const win = new BrowserWindow({
        width: 500,
        height: 200,
        show: false,

        webPreferences: {
            nodeIntegration: true
        }
    });

    // Open the dev-tools for this particular window.
    win.webContents.openDevTools({ mode: 'detach' })

    // Load the HTML for the window.
    if (type == 'characters') {
        console.log('characters');
        console.log(html);

        win.loadURL('file://' + __dirname + '/js/menu/hamburger/html/characters.html');

        win.webContents.on('did-finish-load', () => {
            win.webContents.send('export char', html);
            if (format == 'pdf') {
                console.log('format is: ', format);
                menuExportPDF(win, 'characters', time);
            }

            if (format == 'doc') {
                console.log('format is: ', format);
                menuExportDOC(win, 'characters', time);
            }
        })


    }

    if (type == 'content') {
        console.log('content');
        win.loadURL('file://' + __dirname + '/js/menu/hamburger/html/chapters.html');

        win.webContents.on('did-finish-load', () => {
            win.webContents.send('export chapters', html);
            if (format == 'pdf') {
                console.log('format is: ', format);
                menuExportPDF(win, 'story', time);
            }

            if (format == 'doc') {
                console.log('format is: ', format);
                menuExportDOC(win, 'story', time);
            }
        })
    }

    if (type == 'locations') {
        console.log('locations');

        win.loadURL('file://' + __dirname + '/js/menu/hamburger/html/locations.html');

        win.webContents.on('did-finish-load', () => {
            win.webContents.send('export locations', html);
            if (format == 'pdf') {
                console.log('format is: ', format);
                menuExportPDF(win, 'locations', time);
            }

            if (format == 'doc') {
                console.log('format is: ', format);
                menuExportDOC(win, 'locations', time);
            }

        })
    }


    if (type == 'ideas') {
        console.log('ideas');

        win.loadURL('file://' + __dirname + '/js/menu/hamburger/html/ideas.html');

        win.webContents.on('did-finish-load', () => {
            win.webContents.send('export ideas', html);
            if (format == 'pdf') {
                console.log('format is: ', format)
                menuExportPDF(win, 'ideas', time);
            }

            if (format == 'doc') {
                console.log('format is: ', format)
                menuExportDOC(win, 'ideas', time);
            }
        })
    }

}

function menuExportPDF(win, map, time) {

    win.webContents.printToPDF({}).then(fun => {

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

            var dir1 = exportdir + '/' + result[0].projectname;
            
            if (!fs.existsSync(dir1)) {
                fs.mkdirSync(dir1);
            }

            var dir2 = dir1 + '/' + time + '/';

            if (!fs.existsSync(dir2)) {
                fs.mkdirSync(dir2);
            }

            var dir = dir2 + '/pdf/';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            console.log(exportdir);

            fs.writeFile(dir + '/' + map + '.pdf', fun, (error) => {

                if (error) throw error

                console.log('Write PDF successfully.')
                win.webContents.destroy();
            })

        })

    }).catch(error => {

        console.log(error);
    })
}

function menuExportDOC(win, map, time) {

    console.log('ik word geroepen!')

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

        console.log(result);

        var dir1 = exportdir + '/' + result[0].projectname;
        
        if (!fs.existsSync(dir1)) {
            fs.mkdirSync(dir1);
        }

        var dir2 = dir1 + '/' + time + '/';

        if (!fs.existsSync(dir2)) {
            fs.mkdirSync(dir2);
        }

        var dir = dir2 + '/doc/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        let html = dir + '/' + map + '.doc';

        console.log(html);

        win.webContents.savePage(html, 'HTMLComplete').then(() => {
            console.log('page successfully saved');
            win.webContents.destroy();
        }).catch(err => {
            console.log(err)
        })
    })
}

function killmodal(time) {

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

    let click = document.getElementById('menu-dashboard');

    setTimeout(() => {

        let markup = `
        <div class="export_ok">
            <h1 class="ct-subject-header">Export created!</h1>
            <p>You can find the exported files in your documents-directory under:</p>
            <p>/PixelPencil/exports/${result[0].projectname}/${time}/</p>
    
            <div class="form-input-button">
                <button class="create_save_button" type="button" onclick="close_mainHamburgerModal()">Close dialog</button>
            </div>
        </div>
        `

        document.getElementById('hamcontent').innerHTML = markup;
        menu('dashboard', click);
    }, 1500);
    })
}