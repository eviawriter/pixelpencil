// Creates modal neccessary to delete stuff from the application.

// Add eventlistners to the containers. 
function delete_general() {

    document.querySelector('#subnav-writing').addEventListener('keydown', delete_stuff, true);

    // needs containers of other categories too.
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

    if (option == 'subchapter') {

        var del = {
            header: 'Are you sure?',
            text: 'subchapter',
            text2: '',
            name: name,
            id: 'data-subid=' + id,
            script: 'javascript:delete_subchapter(this)'
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

