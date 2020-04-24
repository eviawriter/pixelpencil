function delete_chapter(button) {

    let chapid = button.dataset.chapid;

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    let delchap = "UPDATE Chapters SET chaptrash = '1' WHERE chapid = '" + chapid + "'";
    let delsub = "UPDATE Subchapters SET subtrash = '1' WHERE chapid = '" + chapid + "'";

    db.run(delchap, function(err){

        if (err) {
            alert(err);
            return;
        }

        else {
            console.log(`Row(s) updated: ${this.changes}`);
        }

    })

    db.run(delsub, function (err){
        if (err) {
            alert(err);
            return;
        }

        else {
            console.log(`Row(s) updated: ${this.changes}`);
        }

    })

    delete_from_subnav(chapid);
}

function delete_from_subnav(chapid) {

    let container = document.getElementById('subnav-writing').querySelector('.sn-accordion-item[data-chapid="'+ chapid +'"]');


    if (container == undefined) {
        alert('Something went wrong. Chapter is deleted from database, but not from the subnavigation.');
    }

    else {    
        container.parentNode.removeChild(container);

        populate_subnav_writing();

        close_delete_modal();
    }
}