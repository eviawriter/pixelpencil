// These functions open the modals for the category characters.
// First we check which button has been pressed based on the key
// they have. 
// 
// Then we open the modal with the new html.
function open_modal_content(ct, key) {

    console.log(key);

    // edit character details
    if (key == 'char-details') {

        // create object with all the info neccessary for opening the modal
        let create = {
            id: ct.dataset.charid,
            title: 'Edit character details',
            javascript: 'ct_char_edit_details(this)',
            form: 'ct_characterdetails',
            input1: 'Character name',
            input2: 'Short description',
            input3: 'Gender',
            input4: 'Age',
            input5: 'type',
            save: 'Save character',
        }

        console.log(create);

        // Since it's an edit button, we need to get all the stuff belonging
        // to the character from the database. 
        let get = "SELECT charname, charkind, charage, chargender, charbio FROM Characters WHERE charid=" + create.id + ""

        db.each(get, function (err, char) {

            if (err) {
                alert(err);
                return;
            }

            else {

                // there are some caveats here. Two entries are dropdown
                // who need te be correctly selected when opening the modal
                if (char.charkind == 'protagonist') {
                    var prot_type = 'selected';
                }

                else if (char.charkind == 'antagonist') {
                    var ant_type = 'selected';
                }

                else {
                    var unkn_type = 'selected';
                }

                // Bad practise, but char.charage returns null if it's 
                // first entered in the database. Check if that's the case
                // and make it empty if so. 
                if (char.charage == null) {
                    var charage = '';
                }

                else {
                    var charage = char.charage;
                }

                // gender needs to be selected. Also unknown if it's not 
                // known at the time.
                if (char.chargender == 'male') {
                    var male = 'selected';
                }

                else if (char.chargender == 'female') {
                    var female = 'selected';
                }

                else {
                    var gend = 'selected';
                }

                // create the object used to create the modal, based on the
                // information above.
                let cont = {
                    name: char.charname,
                    type1: prot_type,
                    type2: ant_type,
                    type3: unkn_type,
                    age: charage,
                    male: male,
                    female: female,
                    gend: gend,
                    bio: char.charbio
                }

                ct_modal_markup(create, cont);
            }
        })
    }

    // edit subjects based on key. 
    if (key == 'EditCharSub') {

        let create = {
            id: ct.dataset.subjectid,
            dataname: 'subjectid',
            title: 'Edit subject',
            javascript: 'edit_char_subject(this)',
            form: 'editCharSub',
            input1: 'Edit subject or question',
            input2: 'Answer',
            save: 'Save subject'
        }

        // new way to get stuff from database. Database_subjects is a dedicated
        // function specificaly made to just get stuff from the database. 
        // it uses the object 'data' to create the sql-query. 
        let data = {
            records: 'subject, subjecttext',
            table: 'Charactercontent',
            column: 'subjectid',
            id: create.id,
            orderby: '',
            order: ''
        }

        // database_subjects is located in js/content/characters/subjects
        database_subjects(data, function (result) {

            let results = {
                subj: result.subject,
                text: result.subjecttext
            }

            console.log(results);

            // dedicated function to open the modal for editing subjects
            ct_modal_editSubject(create, results);

        })
    }

    // edit location content header
    if (key == 'loc-header') {

        let create = {
            id: ct.dataset.locid,
            title: 'Edit title',
            javascript: 'editLocation(this, \'title\')',
            form: 'editLoc',
            input1: 'Change title',
            // input 2 needs to be created; dropdown for selecting a new header.
            input2: 'Change header image',
            save: 'Save title'
        }

        let data = {
            function: 'get',
            records: 'locname',
            table: 'Locations',
            column: 'locid',
            id: create.id,
            and: '',
            where: '',
            orderby: '',
            order: ''
        }

        database(data, function (result) {

            let results = {
                subj: result.locname
            }

            ct_modal_editLocHeader(create, results);

        })
    }

    if (key == 'EditLocDesc') {
        
        let create = {
            id: ct.dataset.locid,
            title: 'Edit description',
            javascript: 'editLocation(this, \'description\')',
            form: 'editLoc',
            input1: 'Change description',
            save: 'Save description'
        }

        let data = {
            function: 'get',
            records: 'locdesc',
            table: 'Locations',
            column: 'locid',
            id: create.id,
            and: '',
            where: '',
            orderby: '',
            order: ''
        }

        database(data, function (result) {

            let results = {
                subj: result.locdesc
            }

            console.log(results);

            ct_modal_editLocDesc(create, results);

        })
    }

    if (key == 'EditLocSub') {

        let create = {
            id: ct.dataset.locoid,
            dataname: 'locoid',
            title: 'Edit subject',
            javascript: 'editLocation(this, \'subject\')',
            form: 'editLoc',
            input1: 'Edit subject or question',
            input2: 'Answer',
            save: 'Save subject'
        }

        // new way to get stuff from database. Database_subjects is a dedicated
        // function specificaly made to just get stuff from the database. 
        // it uses the object 'data' to create the sql-query. 
        let data = {
            function: 'get',
            records: 'title, text',
            table: 'LocContent',
            column: 'locoid',
            id: create.id,
            and: '',
            where: '',
            orderby: '',
            order: ''
        }

        // database_subjects is located in js/content/characters/subjects
        database(data, function (result) {

            let results = {
                subj: result.title,
                text: result.text
            }

            console.log(results);

            // dedicated function to open the modal for editing subjects
            ct_modal_editSubject(create, results);

        })

    }

}

// markup of modal (character details)
function ct_modal_markup(create, cont) {

    const markup = `
    <div class="box-create-form">
    <h3 class="create_form_header">${create.title}</h3>
    <form id="${create.form}" data-id=${create.id} action="javascript:${create.javascript};">
        <div class="form-box-input">
            <h3 class="form-input-header">Name *</h3>
            <input name="form-name" type="text" class="form-input" value="${cont.name}" required="">

            <div class="form-box-input-columns">
            <span class="form-box-3-columns"> 
                <h3 class="form-input-header">Gender</h3>
                <select name="form-gend" id="form-input-gender" class="form-input">
                    <option value="male" ${cont.male}>Male</option>
                    <option value="female" ${cont.female}>Female</option>                    
                    <option value="unknown" ${cont.gend}>Unknown</option>
                </select>
            </span>
            
            <span class="form-box-3-columns"> 
                <h3 class="form-input-header">Age</h3>
                <input name="form--age" type="text" class="form-input" value="${cont.age}">
            </span>

            <span class="form-box-3-columns"> 
                <h3 class="form-input-header">Type</h3>
                <select name="form-type" class="form-input" id="form-input-type">
                <option value="protagonist" ${cont.type1}>Protagonist</option>
                <option value="antagonist" ${cont.type2}>Antagonist</option>
                <option value="unknown" ${cont.type3}>Unknown</option>
                </select>
            </span>
            </div>

            
            <h3 class="form-input-header">Short description (max. 260 characters)</h3>
            <textarea name="form-desc" class="form-input" rows="4" maxlength="260">${cont.bio}</textarea>

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

// Markup modal Subject Edit
function ct_modal_editSubject(create, result) {

    const markup = `
    <div class="box-create-form">
    <h3 class="create_form_header">${create.title}</h3>
        <form id="${create.form}" data-${create.dataname}=${create.id} action="javascript:${create.javascript};">
            
            <div class="form-box-input">
                <h3 class="form-input-header">${create.input1} *</h3>
                <input name="form-name" type="text" class="form-input" value="${result.subj}" required="">

                <h3 class="form-input-header">${create.input2}</h3>
                <textarea name="form-desc" class="form-input" rows="4">${result.text}</textarea>
            
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

function ct_modal_editLocHeader(create, result) {

    const markup = `
    <div class="box-create-form">
    <h3 class="create_form_header">${create.title}</h3>
        <form id="${create.form}" data-locid=${create.id} action="javascript:${create.javascript};">
            
            <div class="form-box-input">
                <h3 class="form-input-header">${create.input1} *</h3>
                <input name="form-name" type="text" class="form-input" value="${result.subj}" required="">
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

function ct_modal_editLocDesc(create, result) {

    const markup = `
    <div class="box-create-form">
    <h3 class="create_form_header">${create.title}</h3>
        <form id="${create.form}" data-locid=${create.id} action="javascript:${create.javascript};">
            
            <div class="form-box-input">
                <h3 class="form-input-header">${create.input1} *</h3>
                <textarea name="form-desc" class="form-input" rows="4">${result.subj}</textarea>
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