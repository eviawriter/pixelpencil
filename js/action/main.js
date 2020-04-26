// create all modals for every action option.
function acSubjectModal(button, option) {

    //    var box = document.querySelectorAll('.box-create-form');
    //
    //    var i;
    //    for (i = 0; i < box.length; i++) {
    //        box[i].style.zIndex = "-1";
    //    }


    // category dashboard (not used yet)
    if (option == 'dashboard') {

        // open modal for dashboard-deadline
        let create = {
            title: 'Add deadline',
            javascript: 'add_deadline(this)',
            form: 'deadline',
            input1: 'Subchapter name',
            input2: 'Short description',
            save: 'Save subchapter',
            rows: '4'
        }

        action_modal_markup(create);
    }

    // category characters
    else if (option == 'char-subject') {

        let charid = button.dataset.charid;
        console.log(charid);

        let create = {
            title: 'Create subject',
            javascript: 'add_subject(this,' + charid + ')',
            id: charid,
            form: 'character',
            input1: 'Subject or question',
            input2: 'Answer',
            save: 'Save subject',
            extrafield: '',
            rows: '12'
        }

        action_modal_markup(create);
    }

    // category locations
    else if (option == 'locations') {

        let locid = button.dataset.locid;

        let create = {
            title: 'Create new subject',
            javascript: 'acLocAdd(this, ' + locid + ')',
            id: locid,
            form: 'location',
            input1: 'Subject',
            input2: 'Details',
            save: 'Save subject',
            extrafield: '',
            rows: '12'
        }

        console.log('ik werk!')

        action_modal_markup(create);
    }

    // category ideas
    else if (option == 'idea-subject') {

        let id = button.dataset.ideaid;

        console.log(id);

        let create = {
            title: 'Add subject',
            javascript: 'acIdeasAdd(this, ' + id + ')',
            id: id,
            form: 'idea',
            input1: 'Subject',
            input2: 'Details',
            save: 'Save subject',
            extrafield: '',
            rows: '12'
        }

        action_modal_markup(create);
    }

    // category research
    else if (option == 'research') {

        let id = button.dataset.resid;

        let create = {
            title: 'Add website',
            javascript: 'AcResAdd(this, ' + id + ')',
            form: 'research',
            input1: 'Website title',
            input2: 'Short description',
            save: 'Save website',
            extrafield: '',
            rows: '4'
        }

        action_modal_markup(create);
    }
}

function action_modal_markup(create) {

    const markup = `
    <div class="box-create-form">
    <h3 class="create_form_header">${create.title}</h3>
    <form id="formaction${create.form}" data-id=${create.id} action="javascript:${create.javascript};">
        <div class="form-box-input">
            <h3 class="form-input-header">${create.input1} *</h3>
            <input name="form-name" type="text" class="form-input" required="">

            <h3 class="form-input-header">${create.input2}</h3>
            <textarea name="form-desc" class="form-input" rows="${create.rows}"></textarea>

            ${create.extrafield}

        </div>
        <div class="form-input-button">
            <button class="create_close_button" type="button" onclick="close_action_modal()">Close</button>
            <button class="create_save_button" type="submit">${create.save}</button>
        </div>
    </form>

</div>
`
    let modal = document.getElementById('modal_action');
    modal.innerHTML = markup;
    modal.showModal();
}


// close modal
function close_action_modal() {
    let modal = document.getElementById('modal_action');
    modal.close();
}

// function to make the tooltip of the action-button visible onmouseover
function ac_tooltip_visible(category) {

    // first set all z-Indexes to -1
    let a = document.querySelectorAll('.tooltipcontent');
    let i;
    for (i = 0; i < a.length; i++) {
        a[i].style.zIndex = "-1";
    }

    // get the current category from the button
    let cat = category.dataset.cat;
    console.log(category);

    // based on the current category, set zIndex to 100 of the corresponding tooltipcontent-id.
    if (cat == 'dashboard') {
        document.getElementById('ac-dashboard').style.zIndex = "100";
    }

    else if (cat == 'writing') {
        document.getElementById('ac-writing').style.zIndex = "100";
    }

    else if (cat == 'characters') {
        document.getElementById('ac-characters').style.zIndex = "100";
    }

    else if (cat == 'locations') {
        document.getElementById('ac-locations').style.zIndex = "100";
    }

    else if (cat == 'ideas') {
        document.getElementById('ac-ideas').style.zIndex = "100";
    }

    else if (cat == 'research') {
        document.getElementById('ac-research').style.zIndex = "100";
    }

    else if (cat == 'something') {
        document.getElementById('ac-something').style.zIndex = "100";
    }
}
