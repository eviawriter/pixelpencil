// These functions open the modals for the category characters.
// First we check which button has been pressed based on the key
// they have. 
// 
// Then we open the modal with the new html.
function open_modal_content(ct, key) {

    console.log(key);

    /* THIS IS CHARACTER */

    if (key == 'char-details') {

        // create object with all the info neccessary for opening the modal
        let create = {
            id: 'data-charid=' + ct.dataset.charid,
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

        // Since it's an edit button, we need to get all the stuff belonging
        // to the character from the database. 
        let data = {
            function: 'get',
            simple: 'yes',
            records: 'charname, charkind, charage, chargender, charbio',
            table: 'Characters',
            column: 'charid',
            expression: 'WHERE charid =' + ct.dataset.charid
        }

        database(data, (char) => {

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

            let type = 'char-details';

            ct_modal_markup(create, cont, type);
        })
    }
 
    if (key == 'EditCharSub') {

        let create = {
            id: 'data-subjectid=' + ct.dataset.subjectid,
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
            id: ct.dataset.subjectid,
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

            let type = 'edit-subject';

            ct_modal_markup(create, results, type);

        })
    }

    /* THIS IS LOCATION */
    
    if (key == 'loc-header') {

        let create = {
            id: 'data-locid=' + ct.dataset.locid,
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
            id: ct.dataset.locid,
            and: '',
            where: '',
            orderby: '',
            order: ''
        }

        database(data, function (result) {

            let results = {
                subj: result.locname,
            }

            let type = 'edit-description';

            ct_modal_markup(create, results, type);
        })
    }

    if (key == 'EditLocDesc') {

        let create = {
            id: 'data-locid=' + ct.dataset.locid,
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
            id: ct.dataset.locid,
            and: '',
            where: '',
            orderby: '',
            order: ''
        }

        database(data, function (result) {

            let results = {
                subj: result.locdesc,
            }

            let type = 'edit-description';

            ct_modal_markup(create, results, type);
        })
    }

    if (key == 'EditLocSub') {

        let create = {
            id: 'data-locoid=' + ct.dataset.locoid,
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
            id: ct.dataset.locoid,
            and: '',
            where: '',
            orderby: '',
            order: ''
        }

        // database_subjects is located in js/content/characters/subjects
        database(data, function (result) {

            let results = {
                subj: result.title,
                text: result.text,
                data: 'locid'
            }

            console.log(results);

            let type = 'edit-subject';

            ct_modal_markup(create, results, type);

        })
    }

    /* THIS IS IDEA */

    if (key == 'idea-header') {

        let create = {
            id: 'data-ideaid' + ct.dataset.ideaid,
            title: 'Edit title',
            javascript: 'editIdeas(this, \'title\')',
            form: 'editIdea',
            input1: 'Change title',
            // input 2 needs to be created; dropdown for selecting a new header.
            input2: 'Change header image',
            save: 'Save title'
        }

        let data = {
            function: 'get',
            records: 'title',
            table: 'Ideas',
            column: 'ideaid',
            id: ct.dataset.ideaid,
            and: '',
            where: '',
            orderby: '',
            order: ''
        }

        database(data, function (result) {

            let results = {
                subj: result.title,
            }

            let type = 'edit-description';

            ct_modal_markup(create, results, type);
        })
    }

    if (key == 'EditIdeaDesc') {

        let create = {
            id: 'data-ideaid=' + ct.dataset.ideaid,
            title: 'Edit description',
            javascript: 'editIdeas(this, \'description\')',
            form: 'editIdea',
            input1: 'Change description',
            save: 'Save description'
        }

        let data = {
            function: 'get',
            records: 'text',
            table: 'Ideas',
            column: 'ideaid',
            id: ct.dataset.ideaid,
            and: '',
            where: '',
            orderby: '',
            order: ''
        }

        database(data, function (result) {

            let results = {
                subj: result.text,
            }

            let type = 'edit-description';

            ct_modal_markup(create, results, type);

        })
    }

    if (key == 'EditIdeaSub') {

        let create = {
            id: 'data-id=' + ct.dataset.id,
            title: 'Edit subject',
            javascript: 'editIdeas(this, \'subject\')',
            form: 'editIdea',
            input1: 'Edit subject or question',
            input2: 'Answer',
            save: 'Save subject'
        }

        let data = {
            function: 'get',
            records: 'title, text',
            table: 'IdeasContent',
            column: 'id',
            id: ct.dataset.id,
            and: '',
            where: '',
            orderby: '',
            order: ''
        }

        // database_subjects is located in js/content/characters/subjects
        database(data, function (result) {

            let results = {
                subj: result.title,
                text: result.text,
            }

            console.log(results);

            let type = 'edit-subject';

            ct_modal_markup(create, results, type);

        })


        /* THIS IS THE END OF IDEA */
    }

    /* THIS IS DASHBOARD */

    if (key == 'EditDashDesc') {

        let create = {
            id: '',
            title: 'Edit summary',
            javascript: 'editSummary(this)',
            form: 'editSum',
            input1: 'Add or edit summary',
            save: 'Save summary',
            rows: '16'
        }

        let data = {
            function: 'get',
            simple: 'yes',
            records: 'projectdesc',
            table: 'Project',
            expression: ''
        }

        database(data, (result) => {

            let results = {
                subj: result.projectdesc,
                id: ''
            }

            console.log(results);

            let type = 'edit-description';

            ct_modal_markup(create, results, type);

        })
    }

    if (key == 'project-details') {

        let create = {
            id: '',
            title: 'Edit project goals',
            javascript: 'contDashGoalsEdit(this)',
            form: 'editGoals',
            words: 'How many words do you wish to write?',
            concept: 'When do you wish your first concept will be ready?',
            revision: 'What will be the  deadline of the first revision?',
            project: 'When is the deadline of your entire project?',
            save: 'Save project goals',
            rows: '1'
        }

        let data = {
            function: 'get',
            simple: 'yes',
            records: 'projectdate, deadconcept, deadrevision, deadwords',
            table: 'Project',
            expression: ''
        }

        database(data, (result) => {

            let results = {
                project: result.projectdate,
                revision: result.deadrevision,
                concept: result.deadconcept,
                words: result.deadwords,
            }

            let type = 'edit-projectgoals';

            ct_modal_markup(create, results, type);
        })
    }
}