(function start_menu_get_directory() {
    menu_get_directory();
})();

function menu_get_directory() {
const fs = require('fs');
const path = require('path');

    var files = fs.readdirSync(path.join(projectdir));

    console.log(files);

    files.forEach(element => {
        let opendir = document.getElementById("menu_open_dir");

        let option = document.createElement("option");
        option.setAttribute("value", element);
        option.setAttribute("onclick", "javascript:menu_open_details(this);");
        option.textContent = element;

        opendir.appendChild(option);
        console.log(opendir, option);
    });
};

function menu_open_details(details) {
    console.log(details);

    let locname = details.innerHTML;

    const path = require('path');

    // create empty var
    var opendir = [];
    
    // Check if it's empty or not. If empty, do not shift. If not empty, remove first object. 
    if (opendir == "") {
    var file = path.join(projectdir, ''+ locname + '');
    opendir = file;
}

    else {
        var file = path.join(projectdir, ''+ locname + '');
        file.shift();
        opendir = file;
    }
    
    // open database
    const sqlite3 = require('sqlite3').verbose();

    let dbload = new sqlite3.Database(opendir);

    // select the neccessary text.
    dbload.get("SELECT projectname, projectdesc, projectdate, projectgoal FROM Project", function (err, project) {
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
            console.log(project.projectname, project.projectdate, project.projectdesc, project.projectgoal);

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

            if (project.projectgoal == "") {
                document.getElementById("menu_open_goal").innerText = "";
            }

            else {
                document.getElementById("menu_open_goal").innerText = "Word-goal: " + project.projectgoal + " words";
            }

        }
    }
    )
};

function openproject() {

    console.log(menu_open_dir, menu_open_selected);

    let projectdirectory = formopenproject["menu_open_dir"].value;

    let checkselect = formopenproject["menu_open_selected"].value;

    if (projectdirectory != "" && checkselect == "") {
        // Function to set databaselocation correctly

        const path = require('path');

        // let datalocation = path.join(__dirname, 'Projectdata/' + projectdir + '');
        let datalocation = path.join(projectdir, ''+ projectdirectory +'');

        // let datalocation = './Projectdata/' + projectdir + '';

        changedatabasedir(datalocation);
        console.log('selected from list');

        // make the overlay invisible
        overlayinvisible('modal_menu_create');
    }

    else if (projectdirectory == "" && checkselect != "") {
        let datalocation = formopenproject["menu_open_selected"].files[0].path;
       
        changedatabasedir(datalocation)
        console.log('selected from disk');

        // make the overlay invisible
        overlayinvisible('modal_menu_create');
    }

    else {
        alert('Cannot select multiple files');
        return;
    }
    
    document.getElementById('menu_open_button').style = "";

}

function changedatabasedir(datalocation) {

    console.log(datalocation);

    databaselocation = "";
    databaselocation = datalocation;
    db = new sqlite3.Database(databaselocation);

    // needs to clear the current project. We pass the value 'openproject' into the function
    // in order to repopulate the categories after they have been cleared.
    newprojectreload("openproject");

    // then reload everything else. 

    // And we reset the form
    document.getElementById('formopenproject').reset();
    document.getElementById('menu_open_name').innerHTML = "";
    document.getElementById('menu_open_desc').innerHTML = "";
    document.getElementById('menu_open_deadline').innerHTML = "";
    document.getElementById('menu_open_goal').innerHTML = "";
    document.getElementById('menu_open_button').style = "";
}

// continue from function newprojectreload to repopulate the categories.
function repopulate() {

    console.log('starting to repopulate the categories');
    const sqlite3 = require('sqlite3').verbose();

    let db = new sqlite3.Database(databaselocation);

    chaptreevisible();
    treecharacters();
    createcharactercards();
    chaptree();
}
