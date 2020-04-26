// edit the location header in content
function editIdeas(content, form) {

    console.log(content);

    // Location-id and LocContent-id
    let id = editIdea.dataset.ideaid;
    let cid = editIdea.dataset.id;

    if (form == 'title') {

        // title
        let title_esc = editIdea["form-name"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
        let title = editIdea["form-name"].value;

        let data = {
            function: 'edit', // specify the function
            table: 'Ideas', // specify the table to update
            rows: 'title="' + title_esc + '"', // all the rows you want to update
            column: 'ideaid', // based on which column do you want to update the rows?
            id: id // id of that particular column. 
        }

        database(data, function (results) {

            console.log(results);

            document.getElementById('box-content-ideas').querySelector('.ct-header-title[data-ideaid = "' + id + '"]').textContent = title;
            document.querySelector('.sn-subitem.ideas[data-ideaid = "' + id + '"]').textContent = title;

        })
    }

    else if (form == 'description') {

        // description
        let desc_esc = editIdea["form-desc"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
        let desc = editIdea["form-desc"].value;

        let data = {
            function: 'edit', // specify the function
            table: 'Ideas', // specify the table to update
            rows: 'text="' + desc_esc + '"', // all the rows you want to update
            column: 'ideaid', // based on which column do you want to update the rows?
            id: id // id of that particular column. 
        }

        database(data, function (results) {

            console.log(results);

            document.getElementById('box-content-ideas').querySelector('.ct-subject-text.bold[data-ideaid = "' + id + '"]').textContent = desc;

        })
    }

    else if (form == 'subject') {

        // title
        let title_esc = editIdea["form-name"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
        let title = editIdea["form-name"].value;

        // description
        let desc_esc = editIdea["form-desc"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
        let desc = editIdea["form-desc"].value;

        let data = {
            function: 'edit', // specify the function
            table: 'IdeasContent', // specify the table to update
            rows: 'title="' + title_esc + '", text="' + desc_esc + '"', // all the rows you want to update
            column: 'id', // based on which column do you want to update the rows?
            id: cid // id of that particular column. 
        }

        database(data, function (results) {

            console.log(results);

            document.getElementById('box-content-ideas').querySelector('.ct-subject-header[data-id = "' + cid + '"]').textContent = title;
            document.getElementById('box-content-ideas').querySelector('.ct-subject-text[data-id = "' + cid + '"]').textContent = desc;

        })


    }

    else {
        console.log('You\'ve hit an unknown button');
    }

    // close the modal.
    let modal = document.getElementById('modal_action');
    modal.close();

}