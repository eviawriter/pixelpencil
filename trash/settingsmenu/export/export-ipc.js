// receives the exportstuff and sends it to its respective js-functions based on the format.

const ipc = require('electron').ipcRenderer;

ipc.on('options', (event, databaselocation, chap, format, char, rese, loca, idea) => {
    
    if (format == 'pdf') {
        export_pdf(databaselocation, chap, char, rese, loca, idea);
    }

    else if (format == 'doc') {
        export_doc(databaselocation, chap, char, rese, loca, idea);
    }

    else if (format == 'docx') {
        export_docx(databaselocation, chap, char, rese, loca, idea);
    }

    else if (format == 'epub') {
        export_epub(databaselocation, chap, char, rese, loca, idea);
    }

    else {
        alert('Unknown export format');
        return;
    }

})
