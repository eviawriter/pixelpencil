// can be used by all categories. First place to attack the delete-function
function delContent(cont, option) {

    console.log(cont, option);

    if (option == 'locSubject') {

        let id = cont.dataset.locoid;
        let name = document.querySelector('.ct-subject-header[data-locoid="'+ id +'"]').innerText;

        var string = "javascript:delLocContent(this)"
        // open delete-modal
        var del = {
            header: 'Are you sure?',
            text: 'subject',
            text2: '',
            name: name,
            id: 'data-locoid=' + id,
            script: 'javascript:delLocContent(this',
            script2: '\'subject\')'
        }
    }

    else if (option == 'locShortDesc') {

        let id = cont.dataset.locid;
        // open delete-modal
        var del = {
            header: 'Are you sure?',
            text: 'the contents of',
            text2: 'WARNING, The bold text won\'t return after this!',
            name: 'Short description',
            id: 'data-locid=' + id,
            script: 'javascript:delLocContent(this',
            script2: '\'description\')'
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
            <button class="create_save_button" ${del.id} type="button" onclick=${del.script},${del.script2}>YES</button>
        </div>
    `

    let modal = document.getElementById('modal_delete');
    modal.innerHTML = markup;
    modal.showModal();

}