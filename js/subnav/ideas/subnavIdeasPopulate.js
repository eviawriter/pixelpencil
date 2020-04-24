function subnavIdeasPopulate() {

    // function to populate subnav of ideas
    console.log('lets start');

    // first get categories, then the ideas in those categories. 
    let data = {
        function: 'get',
        db: 'array',
        table: 'IdeasCategory',
        records: 'catid, title',
        column: 'trash',
        id: 0,
        and: '',
        where: '',
        orderby: '',
        order: ''
    }

    console.log(data, 'ideas');

    database(data, function (result) {

        console.log(result);

        result.forEach((love) => {

            let container = document.getElementById('subnav-ideas').querySelector('.sn-accordion');

            console.log(love);

            let markup = `
                <section class="sn-accordion-item open" data-catid="${love.catid}">
                    <button class="sn-ideas-header" data-catid="${love.catid}">${love.title}</button>
                    <div class="sn-subitems" data-catid="${love.catid}">
                    </div>
                </section>
            
            `

            container.insertAdjacentHTML('beforeend', markup);

            ideas_popSubnavSubitems(love.catid)
        });
    });
}

function ideas_popSubnavSubitems(id) {

    let data = {
        function: 'get',
        db: 'array',
        table: 'Ideas',
        records: 'ideaid, title',
        column: 'catid',
        id: id,
        and: 'AND',
        where: 'trash=0',
        orderby: '',
        order: ''
    }

    database(data, function (idea) {

        console.log(idea);

        // get the sn-accordion-item for chartype * 
        let ideas = document.getElementById('subnav-ideas').querySelector('.sn-subitems[data-catid="' + id + '"]');

        // create the HTML-markup for each character, based on data-charid.
        const markup = `
                        ${idea.map(idea => `
                            <button class="sn-subitem ideas" onclick="subnav_ideas(this)" data-ideaid="${idea.ideaid}">${idea.title}</button>
                        `).join('')}
                `;

        // insert the HTML before the end of the section sn-accordion-item (the container with the chapter)
        ideas.insertAdjacentHTML('beforeend', markup);
    })
}