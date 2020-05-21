function export_pdf(databaselocation, chap, char, rese, loca, idea) {
    console.log('pdf', chap);

    // get the container
    var pdf_container = document.getElementById('chapcontainer');
    console.log(pdf_container);

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    chap.forEach(function (chap) {

        // koppel de database of maak een nieuwe database aan
        let db = new sqlite3.Database(databaselocation);

        let dbget = "SELECT DISTINCT chaporder FROM Chapters WHERE chapid=" + chap.chapid + "";

        db.get(dbget, function (err, row) {
            if (err) {
                console.log(err);
            }

            else {
                var chapo = row.chaporder;

                // could be changed to add pagebreak. Need to verify this later;
                let chapter = document.createElement("div");
                chapter.setAttribute("class", "chapter");
                chapter.dataset.chaporder = JSON.stringify(chapo);
                chapter.textContent = chap.chapname;

                pdf_container.appendChild(chapter);

                export_subchapters(databaselocation, chapter, chap);

            }

        })


    })

    // change the loading screen.
    let loadone = document.getElementById('loadone');
    loadone.style.backgroundColor = "#00ae9d";
    console.log(loadone);

    // what to do when you need to export characters, research, locations or ideas.
    // They'll be exported to a new pdf-document. 
    exportallthestuff(databaselocation, char, rese, loca, idea);
}

// creating per chapter a list of subchapters and subtexts. 
function export_subchapters(databaselocation, chapter, chap) {

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    let db = new sqlite3.Database(databaselocation);

    let dbget = "SELECT DISTINCT subname, subtext, suborder FROM Subchapters WHERE subtrash=0 AND chapid=" + chap.chapid + " ORDER BY suborder";

    db.each(dbget, function (err, row) {
        if (err) {
            console.log(err);
        }

        else {
            let subchapter = document.createElement("div");
            subchapter.setAttribute("class", "subchapter");
            subchapter.dataset.chaporder = JSON.stringify(row.suborder);

            chapter.appendChild(subchapter);


            let subchaptername = document.createElement("h3");
            subchaptername.textContent = row.subname;
            subchapter.appendChild(subchaptername);

            let subchaptertext = document.createElement("div");
            subchaptertext.setAttribute("class", "subchaptext");
            subchaptertext.innerHTML = row.subtext;

            subchapter.appendChild(subchaptertext);



        }
    })

    let loadtwo = document.getElementById('loadtwo');
    loadtwo.style.backgroundColor = "#00ae9d";
    console.log(loadtwo);
};


async function export_characters(databaselocation, char) {

    return new Promise((resolve, reject) => {

        if (char == true) {

            let container = document.getElementById('char_container');

            // start sqlite3
            const sqlite3 = require('sqlite3').verbose();

            let db = new sqlite3.Database(databaselocation);

            let dbget = "SELECT DISTINCT charid, charname, charbio, charage, chargender, charkind FROM Characters WHERE chartrash=0";

            db.each(dbget, function (err, row) {
                if (err) {
                    alert(err);
                }

                else {
                    // for each character, create...
                    let character = document.createElement("div");
                    character.dataset.charid = row.charid;
                    character.setAttribute("class", "character");

                    container.appendChild(character);

                    // charname
                    let charname = document.createElement("div");
                    charname.textContent = row.charname;

                    character.appendChild(charname);

                    // chartype
                    let chartype = document.createElement("div");
                    chartype.setAttribute("class", "export_type");
                    chartype.textContent = "Type: " + row.charkind;

                    character.appendChild(chartype);

                    // charage
                    let charage = document.createElement("div");
                    charage.setAttribute("class", "export_age");
                    charage.textContent = "Age: " + row.charage;

                    character.appendChild(charage);

                    // chargender
                    let chargender = document.createElement("div");
                    chargender.setAttribute("class", "export_gender");
                    chargender.textContent = "Gender: " + row.chargender;

                    character.appendChild(chargender);

                    // charbio
                    let charbio = document.createElement("div");
                    charbio.setAttribute("class", "export_bio");
                    charbio.innerHTML = "Short bio: " + row.charbio;

                    // add details
                    export_chardetails(databaselocation, character, row.charid);
                }
            })
            resolve('characters are loaded');


        }

        else {

            resolve('characters are not loaded');

        }
    });
};

function export_chardetails(databaselocation, character, charid) {

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    let db = new sqlite3.Database(databaselocation);

    let dbget = "SELECT DISTINCT charsubject, charsubjecttext FROM Charactercontent WHERE subjecttrash=0 AND charid=" + charid + "";

    db.each(dbget, function (err, row) {
        if (err) {
            alert(err);
        }

        else {
            let subject = document.createElement("div");
            subject.setAttribute("class", "subjecttitle");
            subject.textContent = row.charsubject;

            character.appendChild(subject);

            let subjt = row.charsubjecttext;
            let subj = subjt.replace(/<br>/g, '<div><br></div')

            let subjecttext = document.createElement("div");
            subjecttext.setAttribute("class", "subjecttext");
            subjecttext.innerHTML = subj;

            console.log(subjecttext);

            character.appendChild(subjecttext);
        }

    })

};

async function export_locations(databaselocation, loca) {

    return new Promise((resolve, reject) => {

        if (loca == true) {

            setTimeout(() => {
                resolve('locations are loaded');
            }, 3000);

        }

        else {

            resolve('locations are NOT loaded')

        }

    })

}

async function export_research(databaselocation, rese) {

    return new Promise((resolve, reject) => {

        if (rese == true) {

            setTimeout(() => {
                resolve('research is loaded');
            }, 3000);

        }

        else {

            resolve('research is NOT loaded')

        }

    })
}

async function export_ideas(databaselocation, idea) {
    return new Promise((resolve, reject) => {

        if (idea == true) {

            setTimeout(() => {
                resolve('ideas are loaded');
            }, 2000);

        }

        else {

            resolve('ideas are NOT loaded')

        }

    })
}

async function exportallthestuff(databaselocation, char, rese, loca, idea) {

    let character = await export_characters(databaselocation, char);
    let locations = await export_locations(databaselocation, loca);
    let research = await export_research(databaselocation, rese);
    let ideas = await export_ideas(databaselocation, idea);

    loading(locations, character, research, ideas);
}


function loading(locations, character, research, ideas) {

    let loadthree = document.getElementById('loadthree');
    loadthree.style.backgroundColor = "#00ae9d";
    console.log(loadthree);

    alert('Waiting is over :)');
    console.log(locations, character, research, ideas);

    var pdfMake = require('pdfmake/build/pdfmake.js');
    var pdfFonts = require('pdfmake/build/vfs_fonts.js');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    var docDefinition = {
        content: [
            'First paragraph',
            'Another paragraph.'

        ]
    }

    pdfMake.createPdf(docDefinition).download();

    // simple printing through the browser. Not very nice. 
    // let content = document.getElementById('contentcontainer').innerHTML;
    // console.log(content);
 // 
    // let originalContents = document.body.innerHTML;
    //     
    // document.body.innerHTML = content;
// 
    //     window.print();
   // 
    // document.body.innerHTML = originalContents;
   

    // now we can export everything to pdf!

   // jsPDF = require('jspdf');
    // html2canvas = require('html2canvas');


    // var doc = new jsPDF('p', 'mm', 'a4')

    // var elementHandler = {
    //    '#ignorePDF': function (element, renderer) {
    //        return true;
    //    }
    //// };
//
    //doc.setFontSize(20);
    //doc.setFont("times");
    //doc.setFontType("bold");
    //doc.setTextColor(255, 0, 0);
//
    //var test = document.getElementById('contentcontainer');
//
    //console.log(test);
//
    //var source = document.getElementById('contentcontainer');
//
    //doc.html(
    //    source,
    //    15,
    //    15,
//
    //    {
    //        'width': 180, 'elementHandlers': elementHandler
    //    });
//
    //doc.save('save.pdf')
}