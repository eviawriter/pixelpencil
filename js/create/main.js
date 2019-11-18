// create all modals for every subnav option.
function open_modal_create(option) {

//    var box = document.querySelectorAll('.box-create-form');
//
//    var i;
//    for (i = 0; i < box.length; i++) {
//        box[i].style.zIndex = "-1";
//    }


    // category dashboard
    if (option == 'da-deadline') {
        // open modal for dashboard-deadline
        let create = {
            title: 'Add deadline',
            javascript: 'add_deadline(this)',
            form: 'deadline',
            input1: 'Subchapter name',
            input2: 'Short description',
            save: 'Save subchapter'
        }

        create_modal_markup(create);
    }

    else if (option == 'da-wordgoal') {

    }

    // category writing
    else if (option == 'wr-chapter') {
        let create = {
            title: 'Create Chapter',
            javascript: 'add_chapter(this)',
            form: 'chapter',
            input1: 'Chapter name',
            input2: 'Short description',
            save: 'Save chapter',
            extrafield: ''
        }

        create_modal_markup(create);

    }

    else if (option == 'wr-subchapter') {
        let create = {
            title: 'Create subchapter',
            javascript: 'add_subchapter(this)',
            form: 'subchapter',
            input1: 'Subchapter name',
            input2: 'Short description',
            save: 'Save subchapter',
            extrafield: '<h3 class="form-input-header">Add this subchapter to:</h3><select name="form-select" id="form-subchapter-dropdown" required=""></select>'
        }

        let sub_dropdown = 'subchapter_dropdown';

        create_modal_markup(create, sub_dropdown);
    }

    // category characters
    else if (option == 'ch-main') {
        let create = {
            title: 'Create main character',
            javascript: 'create_character(this, "main")',
            form: 'character',
            input1: 'Character name',
            input2: 'Short description',
            save: 'Save character',
            extrafield: ''
        }

        create_modal_markup(create);
    }

    else if (option == 'ch-second') {
        let create = {
            title: 'Create secondary character',
            javascript: 'create_character(this, "second")',
            form: 'character',
            input1: 'Character name',
            input2: 'Short description',
            save: 'Save character',
            extrafield: ''
        }

        create_modal_markup(create);
    }

    else if (option == 'ch-other') {
        let create = {
            title: 'Create other character',
            javascript: 'create_character(this, "other")',
            form: 'character',
            input1: 'Character name',
            input2: 'Short description',
            save: 'Save character',
            extrafield: ''
        }

        create_modal_markup(create);
    }

    // category locations
    else if (option == 'lo-location') {
        let create = {
            title: 'Create location',
            javascript: 'create_location(this)',
            form: 'location',
            input1: 'Location name',
            input2: 'Short description',
            save: 'Save location',
            extrafield: ''
        }

        create_modal_markup(create);
    }

    // category ideas
    else if (option == 'id-idea') {
        let create = {
            title: 'Add idea',
            javascript: 'create_idea(this, "idea")',
            form: 'idea',
            input1: 'Idea title',
            input2: 'Short description',
            save: 'Save idea',
            extrafield: ''
        }

        create_modal_markup(create);
    }

    // category research
    else if (option == 're-link') {
        let create = {
            title: 'Add website',
            javascript: 'create_research(this, "link")',
            form: 'research',
            input1: 'Website title',
            input2: 'Short description',
            save: 'Save website',
            extrafield: ''
        }

        create_modal_markup(create);
    }

    else if (option == 're-text') {
        let create = {
            title: 'Add text',
            javascript: 'create_research(this, "text")',
            form: 'research',
            input1: 'Title',
            input2: 'Short description',
            save: 'Save text',
            extrafield: ''
        }

        create_modal_markup(create);
    }

    else if (option == 're-book') {
        let create = {
            title: 'Add book',
            javascript: 'create_research(this, "book")',
            form: 'research',
            input1: 'Title',
            input2: 'Short description',
            save: 'Save book',
            extrafield: ''
        }

        create_modal_markup(create);
    }

    else if (option == 're-interview') {
        let create = {
            title: 'Add interview',
            javascript: 'create_research(this, "interview")',
            form: 'research',
            input1: 'Title',
            input2: 'Short description',
            save: 'Save interview',
            extrafield: ''
        }

        create_modal_markup(create);
    }
}

function create_modal_markup(create, sub_dropdown) {

    const markup = `
    <div class="box-create-form">
    <h3 class="create_form_header">${create.title}</h3>
    <form id="formcreate${create.form}" action="javascript:${create.javascript};">
        <div class="form-box-input">
            <h3 class="form-input-header">${create.input1} *</h3>
            <input name="form-name" type="text" class="form-input" required="">

            <h3 class="form-input-header">${create.input2}</h3>
            <textarea name="form-desc" class="form-input" rows="4"></textarea>

            ${create.extrafield}

        </div>
        <div class="form-input-button">
            <button class="create_close_button" type="button" onclick="close_create_modal()">Close</button>
            <button class="create_save_button" type="submit">${create.save}</button>
        </div>
    </form>

</div>
`
if (sub_dropdown === 'subchapter_dropdown') {
    console.log('hoera!');
    modal_subchapter_dropdown(markup);
}

else {

        let modal = document.getElementById('modal_create');
        modal.innerHTML = markup;
        modal.showModal();
    }
}

// close modal
function close_create_modal() {
    let modal = document.getElementById('modal_create');
    modal.close();
}


// function to make the tooltip of the action-button visible onmouseover
function tooltip_visible(category) {

    // first set all z-Indexes to -1
    let a = document.querySelectorAll('.ac-tooltipcontent');
    let i;
    for (i = 0; i < a.length; i++) {
        a[i].style.zIndex = "-1";
    }

    // get the current category from the button
    let cat = category.dataset.cat;
    console.log(category);

    // based on the current category, set zIndex to 100 of the corresponding tooltipcontent-id.
    if (cat == 'characters') {
        document.getElementById('cr-dashboard').style.zIndex = "100";
    }

    else if (cat == 'writing') {
        document.getElementById('cr-writing').style.zIndex = "100";
    }

    else if (cat == 'characters') {
        document.getElementById('cr-characters').style.zIndex = "100";
    }

    else if (cat == 'locations') {
        document.getElementById('cr-locations').style.zIndex = "100";
    }

    else if (cat == 'ideas') {
        document.getElementById('cr-ideas').style.zIndex = "100";
    }

    else if (cat == 'research') {
        document.getElementById('cr-research').style.zIndex = "100";
    }
}