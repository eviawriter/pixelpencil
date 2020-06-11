function subnav_locations(options, search) {

    let locid = options.dataset.locid;

    // remove all color from subnav-buttons (the locations on the left side) 
    let selected = document.getElementById('subnav-locations').querySelectorAll(".sn-subitem.locations");

    for (i = 0; i < selected.length; i++) {
        selected[i].style.backgroundColor = "";
    }

    // <!-- bit of code neccessary if function call comes from a search query (ie, searchOutput.js) --!>

    // Select menu-category and button that corresponds to search query 
    if (search != '') {
        let select = document.getElementById('subnav-locations').querySelector('.sn-subitem[data-locid="' + locid + '"]');
        console.log(select);
        select.style.backgroundColor = "#00AE9D";

        // open the whole character-menu
        let stuff = document.getElementById('menu-locations');
        menu('locations', stuff)

        var locoid = options.dataset.locoid;
    }

    // get locoid, used for 

    // set background of clicked item
    options.style.backgroundColor = "#00AE9D";

    // remove all color from cm-buttons (context menu, top)
    let context = document.getElementById('cm-locations').querySelectorAll('.cm-button');

    for (i = 0; i < context.length; i++) {
        context[i].style.backgroundColor = "";
    }

    // set context-button 'Location details' active.
    document.getElementById('cm-loca-details').style.backgroundColor = "#00AE9D";

    // make action-button visible
    document.getElementById('ac-other').style.visibility = "visible";
    document.getElementById('action-button').style.visibility = "visible";


    console.log(locid);

    let data = {
        function: 'get',
        db: '', // returns array with db.all instead of object with db.each
        table: 'Locations',
        records: 'locname, locdesc',
        column: 'locid',
        id: locid,
        and: 'AND',
        where: 'trash=0',
        orderby: '',
        order: ''
    }

    console.log(data);

    database(data, function (result) {

        console.log(result);

        let pop = {
            name: result.locname,
            desc: result.locdesc
        }

        let markup = `
        <div class="ct-wrapper" data-locid="${locid}">            
            <div class="ct-header locations" data-locid="${locid}">
                <div class="ct-header-title" data-locid="${locid}">${pop.name}</div>
                <div class="ct-header-edit" onclick="javascript:open_modal_content(this, key='loc-header')" data-locid="${locid}"></div>
            </div>
            
            <div class="ct-space"></div>

            <div class="ct-subject" data-locid="${locid}">

                <div class="ct-subject-edit" onclick="javascript:open_modal_content(this, key='EditLocDesc')" data-locid="${locid}"></div>
                <div class="ct-subject-trash" onclick="javascript:delContent(this, 'locShortDesc')" data-locid="${locid}"></div>

                <h1 class="ct-subject-header" placeholder="Short description">Short description</h1>
                <div class="ct-subject-text bold" placeholder="If you see this, you forgot to add a short description to your location... Please do so to get rid of this message." data-locid="${locid}">${pop.desc}</div>
    
            </div>

        </div>

        `

        document.getElementById('box-content-locations').innerHTML = markup;

        subnavLocSubjects(locid, search, locoid);

    })
}

function subnavLocSubjects(id, search, locoid) {

    let data = {

        function: 'get', // which function you wanna get
        db: 'array', // returns array with db.all instead of object with db.each
        table: 'LocContent', // which table to get everything from
        records: 'locoid, title, text', // which records you wanna get
        column: 'locid', // based on which column (mostly the id of the record)
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
            <div class="ct-subject" data-locid="${id}" data-locoid="${pop.locoid}">
                <div class="ct-subject-edit" onclick="javascript:open_modal_content(this, key='EditLocSub')" data-locid="${id}" data-locoid="${pop.locoid}"></div>
                <div class="ct-subject-trash" onclick="javascript:delContent(this, 'locSubject')" data-locid="${id}" data-locoid="${pop.locoid}"></div>
                <h1 class="ct-subject-header" contenteditable="false" placeholder="Click here to add a title..." data-locid="${id}" data-locoid="${pop.locoid}">${pop.title}</h1>
                <div class="ct-subject-text" contenteditable="false" placeholder="Click here to add text..." data-locid="${id}" data-locoid="${pop.locoid}">${pop.text}</div>
            </div>
            `).join('')}
             `
        // attach it at the end of the ct-wrapper (with the correct charid).
        document.getElementById('box-content-locations').querySelector('.ct-wrapper[data-locid="' + id + '"]').insertAdjacentHTML('beforeend', markup);

        // if there is a search keyword, execute highlight
        if (search != undefined) {
            console.log(search);
            // subnavCharHighlight(search, subjectid);

            let content = {
                main: 'document.getElementById(\'box-content-locations\').innerHTML;',
                subject: 'document.querySelector(\'.ct-subject[data-locoid="' + locoid + '"]\').innerHTML',
                scroll: 'document.querySelector(\'.ct-subject[data-locoid="' + locoid + '"]\')',
                id: locoid,
                subreplace: 'document.querySelector(\'.ct-subject[data-locoid="' + locoid + '"]\').innerHTML = new_text;',
                mainreplace: 'document.getElementById(\'box-content-locations\').innerHTML = new_text;',
                box: 'box-content-locations'
            }

            console.log(content);

            subnavHighlight(search, content)
        }
    })

    // Make sure the 'add subject' button in box-actions has the right charid. 
    // document.getElementById('ac-locations').querySelector('.create_save_button').dataset.charid = charid;
    let tooltip = document.getElementById('ac-locations').querySelectorAll('.tooltip');

    let it;

    for (it = 0; it < tooltip.length; it++) {
        tooltip[it].dataset.locid = id;
    }
}