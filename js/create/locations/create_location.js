function loc_createCategory(x) {

    var cat = formcreatelocation['form-name'].value.replace(/\'/g, "''");
    var catorg = formcreatelocation['form-name'].value;
    var desc = formcreatelocation['form-desc'].value.replace(/\'/g, "''");
    var descor = formcreatelocation['form-desc'].value;

    let data = {
        function: 'create',
        table: 'LocCategory',
        rows: 'catname, catdesc, trash',
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

        let subnav = document.getElementById('subnav-locations').querySelector('.sn-accordion');

        subnav.insertAdjacentHTML('beforeend', markup);

        console.log(subnav, result);

    });

    // close the modal.
    let modal = document.getElementById('modal_create');
    modal.close();
}

function loc_createLocation(x) {

    var loc = formcreatelocation['form-name'].value.replace(/\'/g, "''");
    var lorg = formcreatelocation['form-name'].value;
    var desc = formcreatelocation['form-desc'].value.replace(/\'/g, "''");
    var deso = formcreatelocation['form-desc'].value;
    var catid = formcreatelocation['form-select'].value;

    let data = {
        function: 'create',
        table: 'Locations',
        rows: 'locname, locdesc, catid, trash',
        values: ' "' + loc + '", "' + desc + '", "' + catid + '", 0 '
    }

    database(data, function (result) {

        console.log(result);

        let markup = `
            <button class="sn-subitem locations" onclick="subnav_locations(this)" data-locid="${result}">${lorg}</button>
        `

        let add = document.querySelector('.sn-subitems[data-catid="' + catid + '"]');

        add.insertAdjacentHTML('beforeend', markup);

    });

    // close the modal.
    let modal = document.getElementById('modal_create');
    modal.close();

}