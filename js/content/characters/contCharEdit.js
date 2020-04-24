function ct_char_edit_details(cont) {

    console.log('saving character details...');

    // get stuff from form and replace the ' with '' to be able to save it to the database. chap_org contains
    // the original name, neccessary to create the correct elements in subnav-writing.
    let name = ct_characterdetails["form-name"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    let orgi = ct_characterdetails["form-name"].value;
    let desc = ct_characterdetails["form-desc"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    let gend = ct_characterdetails["form-gend"].value;
    let ages = ct_characterdetails["form--age"].value;
    let type = ct_characterdetails["form-type"].value;
    let chid = ct_characterdetails.dataset.id;

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    // update tha database
    let run = "UPDATE Characters SET charname = '" + name + "', charbio = '" + desc + "', charage = '" + ages + "', chargender = '" + gend + "', charkind = '" + type + "'  WHERE charid = '" + chid + "'"

    db.run(run, function (err) {
        if (err) {
            alert('Error writing to database (function ct_char_edit_details)');
            alert(err);
            return;
        }

        else {

            // change the name in the characterdetails and in the menu.
            document.querySelector('.ct-details-name[data-charid = "' + chid + '"]').textContent = orgi;
            document.querySelector('.sn-subitem.characters[data-charid = "' + chid + '"]').textContent = orgi;

            // change the type if neccessary
            document.querySelector('.ct-details-kind[data-charid = "' + chid + '"]').textContent = type;
            
            // change the age if neccessary
            document.querySelector('.ct-details-age[data-charid = "' + chid + '"]').textContent = ages;
            
            // change the gender if neccessary
            document.querySelector('.ct-details-gender[data-charid = "' + chid + '"]').textContent = gend;;

            // change the bio if neccessary
            document.querySelector('.ct-desc-text[data-charid = "' + chid + '"]').textContent = desc;

            // change the image based on gender :)
            if (gend == 'female') {
                document.querySelector('.ct-image[data-charid = "' + chid + '"').id = 'ct-girl';
            }

            if (gend == 'male') {
                document.querySelector('.ct-image[data-charid = "' + chid + '"').id = 'ct-boy';
            }

            if (gend == 'unknown') {
                document.querySelector('.ct-image[data-charid = "' + chid + '"').id = '';
            }

            console.log('database updatet and text adjusted.');

        }
    })

    // close the modal.
    let modal = document.getElementById('modal_action');
    modal.close();

}