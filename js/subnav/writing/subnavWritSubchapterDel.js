

function delete_subchapter(button) {

    let subid = button.dataset.subid;

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    let delsub = "UPDATE Subchapters SET subtrash = '1' WHERE subid = '" + subid + "'";

    db.run(delsub, function (err){
        if (err) {
            alert(err);
            return;
        }

        else {
            console.log(`Row(s) updated: ${this.changes}`);
        }

    })

    delete_sub_from_subnav(button);
}

function delete_sub_from_subnav(button) {

    let container = button;

    console.log(container);

    if (button == undefined) {
        alert('Something went wrong. Subchapter is deleted from database, but not from the subnavigation.');
    }

    else {    
        container.parentNode.removeChild(container);

        populate_subnav_writing();

        close_delete_modal();
    }
}