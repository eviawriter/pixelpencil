// edit the location header in content
function editLocation(content, form) {

    console.log(content);

    // Location-id and LocContent-id
    let id = editLoc.dataset.locid;
    let locoid = editLoc.dataset.locoid;

    if (form == 'title') {

        // title
        let title_esc = editLoc["form-name"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
        let title = editLoc["form-name"].value;

        let data = {
            function: 'edit', // specify the function
            table: 'Locations', // specify the table to update
            rows: 'locname="' + title_esc + '"', // all the rows you want to update
            column: 'locid', // based on which column do you want to update the rows?
            id: id // id of that particular column. 
        }

        database(data, function (results) {

            console.log(results);

            document.querySelector('.ct-header-title[data-locid = "' + id + '"]').textContent = title;
            document.querySelector('.sn-subitem.locations[data-locid = "' + id + '"]').textContent = title;

        })
    }

    else if (form == 'description') {

        // description
        let desc_esc = editLoc["form-desc"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
        let desc = editLoc["form-desc"].value;

        let data = {
            function: 'edit', // specify the function
            table: 'Locations', // specify the table to update
            rows: 'locdesc="' + desc_esc + '"', // all the rows you want to update
            column: 'locid', // based on which column do you want to update the rows?
            id: id // id of that particular column. 
        }

        database(data, function (results) {

            console.log(results);

            document.querySelector('.ct-subject-text.bold[data-locid = "' + id + '"]').textContent = desc;

        })
    }

    else if (form == 'subject') {

        // title
        let title_esc = editLoc["form-name"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
        let title = editLoc["form-name"].value;

        // description
        let desc_esc = editLoc["form-desc"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
        let desc = editLoc["form-desc"].value;

        let data = {
            function: 'edit', // specify the function
            table: 'LocContent', // specify the table to update
            rows: 'title="' + title_esc + '", text="' + desc_esc + '"', // all the rows you want to update
            column: 'locoid', // based on which column do you want to update the rows?
            id: locoid // id of that particular column. 
        }

        database(data, function (results) {

            console.log(results);

            document.querySelector('.ct-subject-header[data-locoid = "' + locoid + '"]').textContent = title;
            document.querySelector('.ct-subject-text[data-locoid = "' + locoid + '"]').textContent = desc;

        })


    }

    else {
        console.log('You\'ve hit an unknown button');
    }

    // close the modal.
    let modal = document.getElementById('modal_action');
    modal.close();

}