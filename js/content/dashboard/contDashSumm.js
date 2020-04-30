// fill in the summary
function contDashSummary() {

    let data = {
        function: 'get',
        simple: 'yes',
        table: 'Project',
        records: 'projectdesc',
        expression: ''
    }

    database(data, (result) => {

        document.getElementById('proj-desc').innerHTML = result.projectdesc;

    })

}

function editSummary() {

    let desc_esc = editSum["form-desc"].value.replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
    let desc = editSum["form-desc"].value;

    let data = {
        function: 'edit', // specify the function
        table: 'Project', // specify the table to update
        rows: 'projectdesc="' + desc_esc + '"', // all the rows you want to update
        column: 'projectid', // based on which column do you want to update the rows?
        id: '1' // id of that particular column. 
    }

    database(data, function (results) {

        console.log(results);

        document.getElementById('proj-desc').innerHTML = desc;

    })

    // close the modal.
    let modal = document.getElementById('modal_action');
    modal.close();
}

// fill in the project goals
function contDashGoals() {

    // first get content from the database
    let data = {
        function: 'get',
        simple: 'yes',
        records: 'projectdate, deadconcept, deadrevision, deadwords',
        table: 'Project',
        expression: ''
    }

    database(data, (result) => {

        document.getElementById('dash_words').textContent = result.deadwords;
        document.getElementById('dash_dead1').textContent = new Date(result.deadconcept).toLocaleDateString();
        document.getElementById('dash_revis').textContent = new Date(result.deadrevision).toLocaleDateString();
        document.getElementById('dash_dead2').textContent = new Date(result.projectdate).toLocaleDateString();
   })
}

function contDashGoalsEdit(cont) {

    // title
    let words = editGoals['form-words'].value;
    let concept = editGoals['form-concept'].value;
    let revision = editGoals['form-revision'].value;
    let project = editGoals['form-project'].value;

    let data = {
        function: 'edit', // specify the function
        table: 'Project', // specify the table to update
        rows: 'deadwords="' + words + '", deadconcept="' + concept + '", deadrevision="' + revision + '", projectdate="' + project + '" ', // all the rows you want to update
        column: 'projectid', // based on which column do you want to update the rows?
        id: '1' // id of that particular column. 
    }

    database(data, (results) => {

        console.log(results);

        document.getElementById('dash_words').textContent = words;
        document.getElementById('dash_dead1').textContent = new Date(concept).toLocaleDateString();
        document.getElementById('dash_revis').textContent = new Date(revision).toLocaleDateString();
        document.getElementById('dash_dead2').textContent = new Date(project).toLocaleDateString();

        contDashDeadline();

    })

    // close the modal.
    let modal = document.getElementById('modal_action');
    modal.close();

}