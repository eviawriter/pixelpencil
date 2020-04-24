// this happens when you click on a menu-button
function menu(button, click) {

    console.log(click);

    // first highlight the current button
    let a = document.querySelectorAll(".menubutton");
    let ai;
    for (ai = 0; ai < a.length; ai++) {
        a[ai].style.backgroundColor = "";
    }

    click.style.backgroundColor = "#00AE9D";

    // then hide all the context-menu's
    let b = document.querySelectorAll(".box-contextmenu");
    let bi;
    for (bi = 0; bi < b.length; bi++) {
        b[bi].style.visibility = "hidden";
    }

    // then hide all the subnavs
    document.getElementById('subnav-dashboard').style.visibility = "hidden";
    document.getElementById('subnav-writing').style.visibility = "hidden";
    document.getElementById('subnav-characters').style.visibility = "hidden";
    document.getElementById('subnav-locations').style.visibility = "hidden";
    document.getElementById('subnav-ideas').style.visibility = "hidden";
    document.getElementById('subnav-research').style.visibility = "hidden";

    // then hide all the content
    document.getElementById('box-content-dashboard').style.visibility = "hidden";
    document.getElementById('box-content-writing').style.visibility = "hidden";
    document.getElementById('box-content-characters').style.visibility = "hidden";
    document.getElementById('box-content-locations').style.visibility = "hidden";
    document.getElementById('box-content-ideas').style.visibility = "hidden";
    document.getElementById('box-content-research').style.visibility = "hidden";

    // then hide the actions-button
    document.getElementById('ac-dashboard').style.visibility = "hidden";
    document.getElementById('ac-writing').style.visibility = "hidden";
    document.getElementById('ac-other').style.visibility = "hidden";

    if (button == 'options') {
        console.log('hey!');
        // modal_overlay('modal_menu_create');
    }

    // then depending on the clicked button, make everything belonging to the category visible
    else if (button == 'dashboard') {

        // make context-menu visible
        let z = document.getElementById("cm-dashboard");
        z.style.visibility = "visible";

        // make subnavs visible

        // make content visible
        document.getElementById('box-content-dashboard').style.visibility = "visible";

        // add new data-cat with the category to the create-button
        // this is used by the function tooltip_visible to make the correct tooltipcontent visible
        document.getElementById('create-button').dataset.cat = "dashboard";

        // make actions-button visible 
        // probably better to first check if an item is already opened before applying this. If not opened, then keep it hidden.
        document.getElementById('ac-dashboard').style.visibility = "visible";

    }

    else if (button == 'writing') {

        // hide action-button
        document.getElementById('action-button').style.visibility = "hidden";

        // make context-menu visible
        document.getElementById("cm-writing").style.visibility = "visible";

        // make subnavs visible
        document.getElementById('subnav-writing').style.visibility = "visible";

        // make content visible
        document.getElementById('box-content-writing').style.visibility = "visible";

        // add new data-cat with the category to the create-button
        // this is used by the function tooltip_visible to make the correct tooltipcontent visible
        document.getElementById('create-button').dataset.cat = "writing";

        // make the counter visible
        // probably better to first check if an item is already opened before applying this. If not opened, then keep it hidden.
        document.getElementById('ac-writing').style.visibility = "visible";
    }

    else if (button == 'characters') {

        // make context-menu visible
        document.getElementById("cm-characters").style.visibility = "visible";

        // make subnavs visible
        document.getElementById("subnav-characters").style.visibility = "visible";

        // make content visible
        document.getElementById('box-content-characters').style.visibility = "visible";

        // add new data-cat with the category to the create-button
        // this is used by the function tooltip_visible to make the correct tooltipcontent visible
        document.getElementById('create-button').dataset.cat = "characters";

        // make actions-button visible
        // probably better to first check if an item is already opened before applying this. If not opened, then keep it hidden.
        document.getElementById('ac-other').style.visibility = "visible";
        document.getElementById('action-button').dataset.cat = "characters";

        // add a check if there is an id. If not, do nothing, else, make visible. 
        let check = document.getElementById('ac-characters').querySelector('.tooltip').dataset.charid;

        if (check !== '') {
            console.log('do something');
            document.getElementById('action-button').style.visibility = "visible";
        }

        else {
            // hide action-button
            document.getElementById('action-button').style.visibility = "hidden";
        }
    }

    else if (button == 'locations') {

        // make context-menu visible
        document.getElementById("cm-locations").style.visibility = "visible";

        // make subnavs visible
        document.getElementById('subnav-locations').style.visibility = "visible";

        // make content visible
        document.getElementById('box-content-locations').style.visibility = "visible";

        // add new data-cat with the category to the create-button
        // this is used by the function tooltip_visible to make the correct tooltipcontent visible
        document.getElementById('create-button').dataset.cat = "locations";

        // make actions-button visible
        // probably better to first check if an item is already opened before applying this. If not opened, then keep it hidden.
        // document.getElementById('ac-locations').style.visibility = "visible";
        document.getElementById('ac-other').style.visibility = "visible";
        document.getElementById('action-button').dataset.cat = "locations";

        // add a check if there is an id. If not, do nothing, else, make visible. 
        let check = document.getElementById('ac-locations').querySelector('.tooltip').dataset.locid;

        if (check !== '') {
            console.log('do something');
            document.getElementById('action-button').style.visibility = "visible";
        }

        else {
            // hide action-button
            document.getElementById('action-button').style.visibility = "hidden";
        }


    }

    else if (button == 'ideas') {

        // make context-menu visible
        document.getElementById("cm-ideas").style.visibility = "visible";

        // make subnavs visible
        document.getElementById('subnav-ideas').style.visibility = "visible";

        // make content visible
        document.getElementById('box-content-ideas').style.visibility = "visible";

        // add new data-cat with the category to the create-button
        // this is used by the function tooltip_visible to make the correct tooltipcontent visible
        document.getElementById('create-button').dataset.cat = "ideas";

        // make actions-button visible
        // probably better to first check if an item is already opened before applying this. If not opened, then keep it hidden.
        // document.getElementById('ac-ideas').style.visibility = "visible";
        document.getElementById('ac-other').style.visibility = "visible";
        document.getElementById('action-button').dataset.cat = "ideas";

        // add a check if there is an id. If not, do nothing, else, make visible. 
        let check = document.getElementById('ac-ideas').querySelector('.tooltip').dataset.ideaid;

        if (check !== '') {
            console.log('do something');
            document.getElementById('action-button').style.visibility = "visible";
        }

        else {
            // hide action-button
            document.getElementById('action-button').style.visibility = "hidden";
        }

    }

    else if (button == 'research') {

        // make context-menu visible
        document.getElementById("cm-research").style.visibility = "visible";

        // make subnavs visible
        document.getElementById('subnav-research').style.visibility = "visible";

        // make content visible
        document.getElementById('box-content-research').style.visibility = "visible";

        // add new data-cat with the category to the create-button
        // this is used by the function tooltip_visible to make the correct tooltipcontent visible
        document.getElementById('create-button').dataset.cat = "research";

        // make actions-button visible
        // probably better to first check if an item is already opened before applying this. If not opened, then keep it hidden.
        // document.getElementById('ac-research').style.visibility = "visible";
        document.getElementById('ac-other').style.visibility = "visible";
        document.getElementById('action-button').dataset.cat = "research";

        // add a check if there is an id. If not, do nothing, else, make visible. 
        let check = document.getElementById('ac-research').querySelector('.tooltip').dataset.resid;

        if (check !== '') {
            console.log('do something');
            document.getElementById('action-button').style.visibility = "visible";
        }

        else {
            // hide action-button
            document.getElementById('action-button').style.visibility = "hidden";
        }

    }

}

// function to make the tooltip of the create-button visible onmouseover
function create_tooltip_visible(category) {

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