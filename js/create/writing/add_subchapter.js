function add_subchapter() {

    let name = formcreatesubchapter["form-name"].value.replace(/\'/g, "''");
    let desc = formcreatesubchapter["form-desc"].value.replace(/\'/g, "''");
    let orgname = formcreatesubchapter["form-name"].value;
    let chapid = formcreatesubchapter["form-select"].value;

    if (chapid == 'Select chapter') {
        alert('No chapter selected. Please select chapter before you continue.');
        return;
    }

    console.log(name, desc, chapid);

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    // first get the subchaporder of the last subchapter
    let dborder = "SELECT suborder FROM Subchapters ORDER BY suborder DESC LIMIT 1";

    db.get(dborder, function (err, row) {
        if (err) {
            alert('Cannot retrieve order');
            return;
        }

        if (row === undefined) {
            let order = 1;
            update_database_subchapter(name, desc, order, chapid, orgname);
            console.log(order);
        }

        if (row !== undefined) {
            let lastorder = row.suborder;
            let order = (lastorder + 1);

            update_database_subchapter(name, desc, order, chapid, orgname);
            console.log(order);
        }
    })
};


function update_database_subchapter(name, desc, order, chapid, orgname) {

    console.log(order);

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    let run = "INSERT INTO Subchapters (subname, subdesc, suborder, chapid, subtrash) VALUES ('" + name + "', '" + desc + "', '" + order + "', '" + chapid + "', 0)"

    db.run(run, function (err) {
        if (err) {
            alert('Error writing to database (function add_subchapter)');
            alert(err);
            return;
        }

        else {

            var subid = this.lastID;


            let stuff = "SELECT COUNT(*) AS counter FROM Subchapters WHERE subtrash=0 AND chapid= '" + chapid + "'";

            db.get(stuff, function (err, total) {
                if (err) {
                    alert(err);
                    return;
                }

                else {

                    let last = total.counter;

                    console.log(last);

                    let create = {
                        chapid: chapid,
                        subid: subid,
                        name: orgname,
                        order: order,
                        number: last
                    }

                    // create the HTML-markup for each subchapter in this specific chapter, based on data-chapid.
                    const markup = `
                           <button class="sn-subitem writing" tabindex="0" draggable="true" ondragstart="subdragstart(event)" ondrop="subdragdrop(event)" ondragover="subdragover(event)" ondragenter="subdragenter(event)" ondragleave="subdragleave(event)" onclick="subnav_writing(this)" data-chapid="${create.chapid}" data-subid="${create.subid}" data-suborder="${create.order}">${create.number}. ${create.name}</button>
                    `;

                    // get the chapter 
                    let update = document.getElementById('subnav-writing').querySelector('.sn-subitems[data-chapid="' + chapid + '"]');

                    // let update = document.querySelector('.sn-subitem.writing[data-chapid="'+ chapid +'"]')
                    console.log(update);

                    // insert the HTML before the end of the section sn-accordion-item (the container with the chapter)
                    update.insertAdjacentHTML('beforeend', markup);


                }
            })

        }

    })

    let modal = document.getElementById('modal_create');
    modal.close();
}