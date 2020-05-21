(function initializeresearch() {

    res_popSubnav();

})()

function res_popSubnav() {

    // function to populate subnav of locations

    // first get categories, then locations in those categorys. 
    let data = {
        function: 'get',
        db: 'array',
        table: 'ResCat',
        records: 'id, title',
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
            console.log('No research present');
            let container = document.getElementById('subnav-research').querySelector('.sn-accordion');
            container.innerHTML = "";
        }

        else {

            result.forEach((love) => {

                let container = document.getElementById('subnav-research').querySelector('.sn-accordion');

                console.log(love);

                let markup = `
                <section class="sn-accordion-item open" data-id="${love.id}">
                    <button class="sn-research-header" data-id="${love.id}">${love.title}</button>
                    <div class="sn-subitems" data-id="${love.id}">
                    </div>
                </section>
            
            `

                container.insertAdjacentHTML('beforeend', markup);

                res_popSubnavSubitems(love.id)
            });
        }
    });
}

function res_popSubnavSubitems(id) {

    let data = {
        function: 'get',
        db: 'array',
        table: 'Research',
        records: 'resname, resid',
        column: 'catid',
        id: id,
        and: 'AND',
        where: 'trash=0',
        orderby: '',
        order: ''
    }

    console.log(data)

    database(data, function (result) {

        console.log(result);

        // get the sn-accordion-item for chartype * 
        let option = document.getElementById('subnav-research').querySelector('.sn-subitems[data-id="' + id + '"]');

        console.log(option);

        // create the HTML-markup for each character, based on data-charid.
        const markup = `
                        ${result.map(result => `
                            <button class="sn-subitem research" onclick="subnav_research(this)" data-id="${result.resid}">${result.resname}</button>
                        `).join('')}
                `;

        // insert the HTML before the end of the section sn-accordion-item (the container with the chapter)
        option.insertAdjacentHTML('beforeend', markup);
    })
}