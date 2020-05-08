// get executed when clicked on a file in Open project.
function menuProjectDetails(details) {

    let locname = details.innerHTML;

    console.log(details.value);

    const path = require('path');

    // create empty var
    var opendir = [];

    // Check if it's empty or not. If empty, do not shift. If not empty, remove first object. 
    if (opendir == "") {
        var file = path.join(projectdir, '' + locname + '');
        opendir = file;
    }

    else if (details.value == "notselected") {
        return;
    }

    else {
        var file = path.join(projectdir, '' + locname + '');
        file.shift();
        opendir = file;
    }

    if (details.value == 'notselected') {
        document.getElementById("menu_open_name").innerText = "";
        document.getElementById("menu_open_desc").innerText = "";
        document.getElementById("menu_open_deadline").innerText = "";
        document.getElementById("menu_open_goal").innerText = "";
        return;
    }

    else {
        // open database
        const sqlite3 = require('sqlite3').verbose();

        let db = new sqlite3.Database(opendir);

        // select the neccessary text.
        db.get("SELECT projectname, projectdesc, projectdate, deadwords FROM Project", function (err, project) {
            if (err) {
                alert(err);
            }

            if (project == undefined) {
                document.getElementById("menu_open_name").innerText = "";
                document.getElementById("menu_open_desc").innerText = "";
                document.getElementById("menu_open_deadline").innerText = "";
                document.getElementById("menu_open_goal").innerText = "";
            }

            else {
                console.log(project.projectname, project.projectdate, project.projectdesc, project.deadwords);

                if (project.projectname == "") {
                    document.getElementById("menu_open_name").innerText = "";
                }

                else {
                    document.getElementById("menu_open_name").innerText = project.projectname;
                }

                if (project.projectdate == "") {
                    document.getElementById("menu_open_deadline").innerText = "";
                }

                else {
                    document.getElementById("menu_open_deadline").innerText = "Deadline: " + project.projectdate;
                }

                if (project.projectdesc == "") {
                    document.getElementById("menu_open_desc").innerText = "";
                }

                else {
                    document.getElementById("menu_open_desc").innerText = project.projectdesc;
                }

                if (project.deadwords == "") {
                    document.getElementById("menu_open_goal").innerText = "";
                }

                else {
                    document.getElementById("menu_open_goal").innerText = "Word-goal: " + project.deadwords + " words";
                }

            }
        }
        )
    }
};

function menuOpenProject() {

    let projectdirectory = formopenproject["menu_open_dir"].value;
    let checkselect = formopenproject["menu_open_selected"].value;

    let markup = `
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    `
    if (projectdirectory != "" && checkselect == "") {
        // Function to set databaselocation correctly

        const path = require('path');

        // let datalocation = path.join(__dirname, 'Projectdata/' + projectdir + '');
        let datalocation = path.join(projectdir, '' + projectdirectory + '');

        // let datalocation = './Projectdata/' + projectdir + '';

        changedatabasedir(datalocation);
        console.log('selected from list');

        document.getElementById('hamcontent').innerHTML = markup;
    }

    else if (projectdirectory == "" && checkselect != "") {
        let datalocation = formopenproject["menu_open_selected"].files[0].path;
        changedatabasedir(datalocation)
        document.getElementById('hamcontent').innerHTML = markup;
    }

    else if (projectdirectory == "notselected" && checkselect != "") {
        let datalocation = formopenproject["menu_open_selected"].files[0].path;
        changedatabasedir(datalocation)
        document.getElementById('hamcontent').innerHTML = markup;
    }

    else {
        alert('Cannot select multiple files');
        return;
    }
}

function changedatabasedir(datalocation) {

    console.log(datalocation);

    databaselocation = "";
    databaselocation = datalocation;
    db = new sqlite3.Database(databaselocation);

    reloadContent();
}
