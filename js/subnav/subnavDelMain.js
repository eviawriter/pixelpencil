// Creates modal neccessary to delete stuff from the application.

// Add eventlistners to the containers. 
function delete_general() {

    // container writing
    document.querySelector('#subnav-writing').addEventListener('keydown', delete_stuff, true);

    // container characters
    document.querySelector('#subnav-characters').addEventListener('keydown', delete_stuff, true);

    // container locations
    document.querySelector('#subnav-locations').addEventListener('keydown', delete_stuff, true);

    // container locations
    document.querySelector('#subnav-ideas').addEventListener('keydown', delete_stuff, true);
}


// function executed after key-event 'delete' is executed. First the modal is created in
// <dialog id="modal_delete">

function delete_stuff(event) {

    // get some stuff from the event
    var toets = event.keyCode;
    var target = event.target;

    if (toets == 46) {

        // if the chapter-button is keyed:
        if (event.target.className === 'button_chapters') {

            console.log('yes, it worked on CHAPTER!!');

            // get chapid, chapname and chapternr. 
            let id = target.dataset.chapid;
            let name = document.querySelector('.button_chapters[data-chapid = "' + id + '"]').textContent;

            delete_modal(name, id, 'chapter');
        }

        else if (event.target.className === 'sn-subitem writing') {

            console.log('SUBCHAPTER');

            // get subid and subname
            let id = target.dataset.subid;
            let name = document.querySelector('.sn-subitem.writing[data-subid = "' + id + '"]').textContent;

            delete_modal(name, id, 'subchapter');
        }

        else if (event.target.className === 'sn-subitem characters') {

            console.log('Character');

            // get charid and charname
            let id = target.dataset.charid;
            let name = document.querySelector('.sn-subitem.characters[data-charid = "' + id + '"]').textContent;

            delete_modal(name, id, 'character');
        }

        else if (event.target.className === 'sn-location-header') {

            console.log('it worked on location category!');
            let id = target.dataset.catid;
            let name = document.querySelector('.sn-location-header[data-catid="' + id + '"]').textContent;

            delete_modal(name, id, 'location category')

        }

        else if (event.target.className === 'sn-subitem locations') {

            console.log('Location');

            // get charid and charname
            let id = target.dataset.locid;
            let name = document.querySelector('.sn-subitem.locations[data-locid = "' + id + '"').textContent;

            delete_modal(name, id, 'location');

        }

        else if (event.target.className === 'sn-ideas-header') {

            console.log('it worked on ideas category!');
            let id = target.dataset.catid;
            let name = document.querySelector('.sn-ideas-header[data-catid="' + id + '"]').textContent;

            delete_modal(name, id, 'idea category')

        }

        else if (event.target.className === 'sn-subitem ideas') {

            console.log('Ideas');

            // get charid and charname
            let id = target.dataset.ideaid;
            let name = document.querySelector('.sn-subitem.ideas[data-ideaid = "' + id + '"').textContent;

            delete_modal(name, id, 'ideas');

        }


    }
}

// create the modal based on name, id and option
function delete_modal(name, id, option) {

    if (option == 'chapter') {

        // open delete-modal
        var del = {
            header: 'Are you sure?',
            text: '',
            text2: '<p class="text-italic">Note: all subchapters will also be deleted!</p>',
            name: name,
            id: 'data-chapid=' + id,
            script: 'javascript:delete_chapter(this)'
        }

    }

    else if (option == 'subchapter') {

        var del = {
            header: 'Are you sure?',
            text: 'subchapter',
            text2: '',
            name: name,
            id: 'data-subid=' + id,
            script: 'javascript:delete_subchapter(this)'
        }

    }

    else if (option == 'character') {

        var del = {
            header: 'Are you sure?',
            text: 'character',
            text2: '',
            name: name,
            id: 'data-charid=' + id,
            script: 'javascript:delete_character(this)'
        }

    }

    else if (option == 'location category') {

        var del = {
            header: 'Are you sure?',
            text: '',
            text2: '<p class="text-italic">Note: all locations in this category will also be deleted!</p>',
            name: name,
            id: 'data-catid=' + id,
            script: 'javascript:delete_loc_category(this)'
        }

    }

    else if (option == 'location') {

        var del = {
            header: 'Are you sure?',
            text: 'location',
            text2: '',
            name: name,
            id: 'data-locid=' + id,
            script: 'javascript:delete_location(this)'
        }
    }

    //    // needs to be written correctly
    //    else if (option == 'location') {
    //
    //        var del = {
    //            header: 'Are you sure?',
    //            text: 'location description',
    //            text2: '',
    //            name: name,
    //            // need to fix this
    //            id: 'data-locid=' + id,
    //            script: 'javascript:delete_location(this)'
    //        }
    //
    //    }
    else if (option == 'Idea category') {

        var del = {
            header: 'Are you sure?',
            text: '',
            text2: '<p class="text-italic">Note: all ideas in this category will also be deleted!</p>',
            name: name,
            id: 'data-catid=' + id,
            script: 'javascript:delete_idea_category(this)'
        }

    }

    else if (option == 'idea') {

        var del = {
            header: 'Are you sure?',
            text: 'idea',
            text2: '',
            name: name,
            id: 'data-ideaid=' + id,
            script: 'javascript:delete_idea(this)'
        }
    }


    const markup = `
    <div class="box-delete">
        <h3 class="create_form_header">${del.header}</h3>
        <div class="modal_text">
        <p>You are about to delete ${del.text} <strong>"${del.name}"</strong>. Click <strong>YES</strong> if this is what you want.</p>

        ${del.text2}
        </div>
        <div class="form-input-button">
            <button class="create_close_button" type="button" onclick="close_delete_modal()">Close</button>
            <button class="create_save_button" ${del.id} type="button" onclick=${del.script}>YES</button>
        </div>
    `

    let modal = document.getElementById('modal_delete');
    modal.innerHTML = markup;
    modal.showModal();

}

function close_delete_modal() {
    let modal = document.getElementById('modal_delete');
    modal.close();
}

