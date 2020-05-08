document.body.addEventListener('keydown', print_to_pdf, true);

function print_to_pdf() {

    var toets = event.keyCode;
    var target = event.target;

    console.log('it worked!')

    if (toets == 123) {

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
        win.webContents.openDevTools({ mode: 'detach' })

        // Load the HTML for the window.
        win.loadURL('file://' + __dirname + '/js/menu/hamburger/export.html');

        // Send a message to the window.
        win.webContents.on('did-finish-load', () => {

            let data = {
                function: 'get',
                db: 'array',
                simple: 'yes',
                records: 'subname, subtext',
                table: 'Subchapters',
                expression: 'WHERE subid IN (1,2,3,4) AND subtrash=0'
            }

            database(data, (result) => {

                console.log(result);
                var html = result;

                win.webContents.send('ping', html);

                win.webContents.printToPDF({}).then(data => {

                    console.log(exportdir);
                    
                    fs.writeFile(exportdir + '/print.pdf', data, (error) => {
                    
                        if (error) throw error
                        console.log('Write PDF successfully.')
                    })

                }).catch(error => {
                    console.log(error)
                });
            })
        }
        )
    }
}