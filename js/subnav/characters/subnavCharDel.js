function delete_character(button) {

    let id = button.dataset.charid;

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    let del = "UPDATE Characters SET chartrash = '1' WHERE charid = '" + id + "'";

    db.run(del, function (err) {

        if (err) {
            alert(err);
            return;
        }

        else {
            console.log(`Row(s) updated: ${this.changes}`);

            sn_delete_character(id);
        }
    })
}

function sn_delete_character(id) {

    let container = document.getElementById('subnav-characters').querySelector('.sn-subitem.characters[data-charid = "' + id + '"]');

    if (container == undefined) {
        alert('Something went wrong. Chapter is deleted from database, but not from the subnavigation.');
    }

    else {
        container.parentNode.removeChild(container);

        populate_subnav_characters();

        close_delete_modal();
    }
}