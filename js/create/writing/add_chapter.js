function add_chapter() {

    // get stuff from form and replace the ' with '' to be able to save it to the database. chap_org contains
    // the original name, neccessary to create the correct elements in subnav-writing.
    let chapname = formcreatechapter["form-name"].value.replace(/\'/g, "''");
    let chap_org = formcreatechapter["form-name"].value;
    let chapdesc = formcreatechapter["form-desc"].value.replace(/\'/g, "''");

    console.log(chapname, chapdesc);

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    // first get the chaporder of the last chapter
    let dborder = "SELECT Chaporder FROM Chapters ORDER BY chaporder DESC LIMIT 1"

    db.get(dborder, function (err, row) {
        if (err) {
            alert('Cannot retrieve order');
            return;
        }

        if (row === undefined) {
            let chaporder = 1;

            update_database_chapter(chapname, chapdesc, chaporder, chap_org);
        }

        if (row !== undefined) {
            let lastorder = row.chaporder;
            let chaporder = (lastorder + 1);

            update_database_chapter(chapname, chapdesc, chaporder, chap_org);
        }
    })
};


function update_database_chapter(chapname, chapdesc, chaporder, chap_org) {

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    let run = "INSERT INTO Chapters (chapname, chapdesc, chaporder, chaptrash) VALUES ('" + chapname + "', '" + chapdesc + "', '" + chaporder + "', 0)"

    db.run(run, function (err) {
        if (err) {
            alert('Error writing to database (function add_chapter)');
            alert(err);
            return;
        }

        else {

            var chapid = this.lastID;

            let stuff = "SELECT COUNT(*) AS counter FROM Chapters WHERE chaptrash=0";

            db.get(stuff, function (err, chapnumber) {
                if (err) {
                    alert(err);
                    return;
                }

                else {

                    let chapnr = chapnumber.counter;

                    console.log(chapnr);

                    let create = {
                        chapid: chapid,
                        chapname: chap_org,
                        chaporder: chaporder,
                        chapnr: chapnr
                    }

                    const markup = `
                             <section class="sn-accordion-item" data-chapid=${create.chapid} data-chaporder=${create.chaporder} onmouseover="subnav_remove_active('writing', this)">
                                <button class="button_chapters" data-chapid=${create.chapid}>    
                                    <h1>Chapter ${create.chapnr}</h1>
                                    <h2>${create.chapname}</h2>
                                </button>

                             <div class="sn-subitems" data-chapid=${create.chapid}></div>
                             </section>

                        `

                    let update = document.getElementById('subnav-writing').querySelector('.sn-accordion');

                    update.insertAdjacentHTML('beforeend', markup);


                }
            })

        }

    })

    let modal = document.getElementById('modal_create');
    modal.close();
}