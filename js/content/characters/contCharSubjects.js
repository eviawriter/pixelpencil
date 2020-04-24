function database_subjects(data, result) {

    // data contains:
    // let data = {
    //    function: 'get',
    //    id: '',
    //    table: 'Characters'
    // }

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    if (data.function == 'delete') {

        let sql = "UPDATE " + data.table + " SET subjecttrash = '1' WHERE " + data.column + " = '" + data.id + "'";

        console.log(sql);

        db.run(sql, function (err) {

            if (err) {

                alert(err);
            }

            else {

                console.log(`Row(s) updated: ${this.changes}`);

                return result('deleted');
            }
        });

    }

    else if (data.function == 'edit') {

        let sql = "UPDATE " + data.table + " SET " + data.rows + " WHERE " + data.column + " = '" + data.id + "'";

        console.log(sql);

        db.run(sql, function (err) {

            if (err) {
                alert(err);
            }

            else {

                console.log(`Row(s) updated: ${this.changes}`);

                return result('updatet');
            }

        })

    }

    else if (data.function = 'get') {

        let sql = "SELECT " + data.records + " FROM " + data.table + " WHERE " + data.column + " = '" + data.id + "' " + data.orderby + " " + data.order + "";

        console.log(sql);

        db.each(sql, function (err, records) {

            if (err) {

                alert(err);
            }

            else {

                return result(records);

            }
        });


    }


}

// delete and edit subjects
function delete_char_subject(subj) {

    let data = {
        function: 'delete',
        id: subj.dataset.subjectid,
        table: 'Charactercontent',
        column: 'subjectid'
    }

    console.log(data);

    database_subjects(data, function (result) {

        if (result == 'deleted') {

            let container = document.querySelector('.ct-subject[data-subjectid = "' + data.id + '"]');

            if (container == undefined) {
                alert('Something went wrong. Chapter is deleted from database, but not from the subnavigation.');
            }

            else {
                container.parentNode.removeChild(container);
            }
        }

        else {

            console.log('This should not happen.');

        }
    });
}

function edit_char_subject() {


    let suid = editCharSub.dataset.subjectid;
    // let subj = editCharSub["form-name"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    let orgi = editCharSub["form-name"].value;
    // let answ = editCharSub["form-desc"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    let orga = editCharSub["form-desc"].value;

    let data = {
        function: 'edit',
        id: suid,
        rows: 'subject="' + orgi + '", subjecttext="' + orga + '"',
        table: 'Charactercontent',
        column: 'subjectid'
    }

    console.log(data);

    database_subjects(data, function (result) {

        if (result == 'updatet') {

            let header = document.querySelector('.ct-subject-header[data-subjectid = "' + data.id + '"]');
            let text = document.querySelector('.ct-subject-text[data-subjectid = "' + data.id + '"]');

            if (header == undefined) {

                alert('Something went wrong. subject is successfully written to database, but for some reason we cannot update the current text');

            }

            if (text == undefined) {

                alert('Something went wrong. Subjecttext is successfully written to database, but for some reason we cannot update the current text');

            }

            else {

                header.innerText = orgi;
                text.innerText = orga;

                // close the modal.
                let modal = document.getElementById('modal_action');
                modal.close();

            }


        }

    })

}