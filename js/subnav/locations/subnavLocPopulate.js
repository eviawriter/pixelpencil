(function initializelocsubnav() {

    loc_popSubnav();

})()

function loc_popSubnav() {

    // function to populate subnav of locations

    // first get categories, then locations in those categorys. 
    let data = {
        function: 'get',
        db: 'array',
        table: 'LocCategory',
        records: 'catid, catname',
        column: 'trash',
        id: 0,
        and: '',
        where: '',
        orderby: '',
        order: ''
    }

    database(data, function (result) {

        console.log('RESULT!!!!', result)

        if (result == "") {
            console.log('No locations present');
            let container = document.getElementById('subnav-locations').querySelector('.sn-accordion');
            container.innerHTML = "";
        }

        else {

            result.forEach((love) => {

                let container = document.getElementById('subnav-locations').querySelector('.sn-accordion');

                console.log(love);

                let markup = `
                <section class="sn-accordion-item open" data-catid="${love.catid}">
                    <button class="sn-location-header" data-catid="${love.catid}">${love.catname}</button>
                    <div class="sn-subitems" data-catid="${love.catid}">
                    </div>
                </section>
            
            `

                container.insertAdjacentHTML('beforeend', markup);

                loc_popSubnavSubitems(love.catid)
            });
        }
    });
}

function loc_popSubnavSubitems(id) {

    let data = {
        function: 'get',
        db: 'array',
        table: 'Locations',
        records: 'locname, locid',
        column: 'catid',
        id: id,
        and: 'AND',
        where: 'trash=0',
        orderby: '',
        order: ''
    }

    database(data, function (loc) {

        console.log(loc);

        // get the sn-accordion-item for chartype * 
        let locs = document.getElementById('subnav-locations').querySelector('.sn-subitems[data-catid="' + id + '"]');

        // create the HTML-markup for each character, based on data-charid.
        const markup = `
                        ${loc.map(loc => `
                            <button class="sn-subitem locations" onclick="subnav_locations(this)" data-locid="${loc.locid}">${loc.locname}</button>
                        `).join('')}
                `;

        // insert the HTML before the end of the section sn-accordion-item (the container with the chapter)
        locs.insertAdjacentHTML('beforeend', markup);
    })
}