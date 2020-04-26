function acIdeasAdd() {

    console.log('updating database with subject and answer details');

    // get info. 
    let subj = formactionidea["form-name"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    let orgi = formactionidea["form-name"].value;

    let answ = formactionidea["form-desc"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    let orga = formactionidea["form-desc"].value;

    let id = formactionidea.dataset.id;

    let data = {
        function: 'create',
        table: 'IdeasContent',
        rows: 'ideaid, title, text, trash',
        values: '"' + id + '","' + subj + '", "' + answ + '", "0"',
    }

    database(data, function (results) {

        console.log(results);

        // create the markup and add it to the end of the element (ct-wrapper)
        let markup = `
            <div class="ct-subject" data-locid="${id}" data-id="${results}">
                <div class="ct-subject-edit" onclick="javascript:open_modal_content(this, key='EditIdeaSub')" data-ideaid="${id}" data-id="${results}"></div>
                <div class="ct-subject-trash" onclick="javascript:delContent(this, 'ideaSubject')" data-ideaid="${id}" data-id="${results}"></div>
                <h1 class="ct-subject-header" contenteditable="false" placeholder="Click here to add a title..." data-ideaid="${id}" data-id="${results}">${orgi}</h1>
                <div class="ct-subject-text" contenteditable="false" placeholder="Click here to add text..." data-ideaid="${id}" data-id="${results}">${orga}</div>
            </div>
        `

        document.getElementById('box-content-ideas').querySelector('.ct-wrapper[data-ideaid = "' + id + '"').insertAdjacentHTML('beforeend', markup);

        console.log('Subject is added...');

        // close the modal.
        let modal = document.getElementById('modal_action');
        modal.close();

    })
}