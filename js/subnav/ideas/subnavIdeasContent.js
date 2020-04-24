function subnav_ideas(options) {

    console.log(options);

    let id = options.dataset.ideaid;

    // remove all color from subnav-buttons (the locations on the left side) 
    let selected = document.getElementById('subnav-ideas').querySelectorAll(".sn-subitem.ideas");

    for (i = 0; i < selected.length; i++) {
        selected[i].style.backgroundColor = "";
    }

    // set background of clicked item
    options.style.backgroundColor = "#00AE9D";

    // remove all color from cm-buttons (context menu, top)
    let context = document.getElementById('cm-ideas').querySelectorAll('.cm-button');

    for (i = 0; i < context.length; i++) {
        context[i].style.backgroundColor = "";
    }

    // set context-button 'Location details' active.
    document.getElementById('cm-ideas-details').style.backgroundColor = "#00AE9D";

    // make action-button visible
    document.getElementById('ac-other').style.visibility = "visible";
    document.getElementById('action-button').style.visibility = "visible";


    console.log(id);

    let data = {
        function: 'get',
        db: '', // returns array with db.all instead of object with db.each
        table: 'Ideas',
        records: 'title, text',
        column: 'ideaid',
        id: id,
        and: 'AND',
        where: 'trash=0',
        orderby: '',
        order: ''
    }

    console.log(data);

    database(data, function (result) {

        console.log(result);

        let pop = {
            name: result.title,
            desc: result.text
        }

        let markup = `
        <div class="ct-wrapper" data-ideaid="${id}">            
            <div class="ct-header">
                <div class="ct-header-title" data-ideaid="${id}">${pop.name}</div>
                <div class="ct-header-edit" onclick="javascript:open_modal_content(this, key='idea-header')" data-ideaid="${id}"></div>
            </div>
            
            <div class="ct-space"></div>

            <div class="ct-subject" data-ideaid="${id}">

                <div class="ct-subject-edit" onclick="javascript:open_modal_content(this, key='EditIdeaDesc')" data-ideaid="${id}"></div>
                <div class="ct-subject-trash" onclick="javascript:delContent(this, 'ideaShortDesc')" data-ideaid="${id}"></div>

                <h1 class="ct-subject-header" placeholder="Short description">Short description</h1>
                <div class="ct-subject-text bold" placeholder="If you see this, you forgot to add a short description to your location... Please do so to get rid of this message." data-ideaid="${id}">${pop.desc}</div>
    
            </div>

        </div>

        `

        document.getElementById('box-content-ideas').innerHTML = markup;

        subnavIdeasSubjects(id);

    })
}

function subnavIdeasSubjects(id) {

    let data = {

        function: 'get', // which function you wanna get
        db: 'array', // returns array with db.all instead of object with db.each
        table: 'IdeasContent', // which table to get everything from
        records: 'id, title, text', // which records you wanna get
        column: 'ideaid', // based on which column (mostly the id of the record)
        id: id, // the ID you got
        and: 'AND', // if you have another argument to search for, like trash
        where: 'trash=0', // add column including it's value. 
        orderby: '', // order 
        order: '' // argument
    }

    database(data, function (pop) {

//        console.log(result);

//        let pop = {
//            id: result.locoid,
//            title: result.title,
//            text: result.text
//        }

        console.log(pop);

        let markup = `
        ${pop.map(pop => `
            <div class="ct-subject" data-ideaid="${id}" data-locoid="${pop.id}">
                <div class="ct-subject-edit" onclick="javascript:open_modal_content(this, key='EditLocSub')" data-ideaid="${id}" data-id="${pop.id}"></div>
                <div class="ct-subject-trash" onclick="javascript:delContent(this, 'locSubject')" data-ideaid="${id}" data-id="${pop.id}"></div>
                <h1 class="ct-subject-header" contenteditable="false" placeholder="Click here to add a title..." data-ideaid="${id}" data-id="${pop.id}">${pop.title}</h1>
                <div class="ct-subject-text" contenteditable="false" placeholder="Click here to add text..." data-ideaid="${id}" data-id="${pop.id}">${pop.text}</div>
            </div>
            `).join('')}
             `
        // attach it at the end of the ct-wrapper (with the correct charid).
        document.getElementById('box-content-ideas').querySelector('.ct-wrapper[data-ideaid="' + id + '"]').insertAdjacentHTML('beforeend', markup);
    })

    // Make sure the 'add subject' button in box-actions has the right charid. 
    // document.getElementById('ac-locations').querySelector('.create_save_button').dataset.charid = charid;
    let tooltip = document.getElementById('ac-ideas').querySelectorAll('.tooltip');

    let it;

    for (it = 0; it < tooltip.length; it++) {
        tooltip[it].dataset.ideaid = id;
    }
}