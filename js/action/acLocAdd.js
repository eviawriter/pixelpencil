function acLocAdd() {

    console.log('updating database with subject and answer details');

    let escharacters = {
        '\'': '\'',
        '"': '\"'
 };

    let subj = formactionlocation["form-name"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    let orgi = formactionlocation["form-name"].value;

    let answ = formactionlocation["form-desc"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    let orga = formactionlocation["form-desc"].value;

    let loid = formactionlocation.dataset.id;

    let data = {
        function: 'create',
        table: 'LocContent',
        rows: 'locid, title, text, trash',
        values: '"' + loid + '","' + subj + '", "' + answ + '", "0"',
    }

    database(data, function (results) {

        console.log(results);

        // create the markup and add it to the end of the element (ct-wrapper)
        let markup = `
            <div class="ct-subject" data-locid="${loid}" data-locoid="${results}">
                <div class="ct-subject-edit" onclick="javascript:open_modal_content(this, key='EditLocSub')" data-locid="${loid}" data-locoid="${results}"></div>
                <div class="ct-subject-trash" onclick="javascript:delContent(this, 'locSubject')" data-locid="${loid}" data-locoid="${results}"></div>
                <h1 class="ct-subject-header" contenteditable="false" placeholder="Click here to add a title..." data-locid="${loid}" data-locoid="${results}">${orgi}</h1>
                <div class="ct-subject-text" contenteditable="false" placeholder="Click here to add text..." data-locid="${loid}" data-locoid="${results}">${orga}</div>
            </div>
        `

        document.querySelector('.ct-wrapper[data-locid = "' + loid + '"').insertAdjacentHTML('beforeend', markup);

        console.log('Subject is added...');

        // close the modal.
        let modal = document.getElementById('modal_action');
        modal.close();

    })
}