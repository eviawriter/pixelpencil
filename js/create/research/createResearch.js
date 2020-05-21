function createResCategory(x) {

    var cat = formcreateresearch['form-name'].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    var catorg = formcreateresearch['form-name'].value;
    var desc = formcreateresearch['form-desc'].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    var descor = formcreateresearch['form-desc'].value;

    let data = {
        function: 'create',
        table: 'ResCat',
        rows: 'title, text, trash',
        values: ' "' + cat + '", "' + desc + '", 0 '
    }

    database(data, function (result) {

        // create the category
        let markup = `
            <section class="sn-accordion-item open" data-id="${result}">
                <button class="sn-location-header" data-id="${result}">${catorg}</button>
                <div class="sn-subitems" data-id="${result}"></div>
            </section>
        `

        let subnav = document.getElementById('subnav-research').querySelector('.sn-accordion');

        subnav.insertAdjacentHTML('beforeend', markup);

        console.log(subnav, result);

    });

    // close the modal.
    let modal = document.getElementById('modal_create');
    modal.close();
}

function createResSubject(x) {

    var title = formcreateresearch['form-name'].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    var titorg = formcreateresearch['form-name'].value;
    var desc = formcreateresearch['form-desc'].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    var deso = formcreateresearch['form-desc'].value;
    var catid = formcreateresearch['form-select'].value;

    let data = {
        function: 'create',
        table: 'Research',
        rows: 'resname, resdesc, catid, trash',
        values: ' "' + title + '", "' + desc + '", "' + catid + '", 0 '
    }

    database(data, function (result) {

        console.log(result);

        let markup = `
            <button class="sn-subitem research" onclick="subnav_research(this)" data-id="${result}">${titorg}</button>
        `

        let add = document.getElementById('subnav-research').querySelector('.sn-subitems[data-id="' + catid + '"]');

        console.log(add);

        add.insertAdjacentHTML('beforeend', markup);

    });

    // close the modal.
    let modal = document.getElementById('modal_create');
    modal.close();
}