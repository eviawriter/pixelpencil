function createIdeaCategory(x) {

    var cat = formcreateidea['form-name'].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    var catorg = formcreateidea['form-name'].value;
    var desc = formcreateidea['form-desc'].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    var descor = formcreateidea['form-desc'].value;

    let data = {
        function: 'create',
        table: 'IdeasCategory',
        rows: 'title, text, trash',
        values: ' "' + cat + '", "' + desc + '", 0 '
    }

    database(data, function (result) {

        // create the category
        let markup = `
            <section class="sn-accordion-item open" data-catid="${result}">
                <button class="sn-location-header" data-catid="${result}">${catorg}</button>
                <div class="sn-subitems" data-catid="${result}"></div>
            </section>
        `

        let subnav = document.getElementById('subnav-ideas').querySelector('.sn-accordion');

        subnav.insertAdjacentHTML('beforeend', markup);

        console.log(subnav, result);

    });

    // close the modal.
    let modal = document.getElementById('modal_create');
    modal.close();
}

function createIdea(x) {

    var title = formcreateidea['form-name'].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    var titorg = formcreateidea['form-name'].value;
    var desc = formcreateidea['form-desc'].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    var deso = formcreateidea['form-desc'].value;
    var catid = formcreateidea['form-select'].value;

    let data = {
        function: 'create',
        table: 'Ideas',
        rows: 'title, text, catid, trash',
        values: ' "' + title + '", "' + desc + '", "' + catid + '", 0 '
    }

    database(data, function (result) {

        console.log(result);

        let markup = `
            <button class="sn-subitem ideas" onclick="subnav_ideas(this)" data-ideaid="${result}">${titorg}</button>
        `

        let add = document.getElementById('subnav-ideas').querySelector('.sn-subitems[data-catid="' + catid + '"]');

        console.log(add);

        add.insertAdjacentHTML('beforeend', markup);

    });

    // close the modal.
    let modal = document.getElementById('modal_create');
    modal.close();

}