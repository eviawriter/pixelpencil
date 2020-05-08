function reloadContent() {

    populate_subnav_writing();
    populate_subnav_characters();
    loc_popSubnav();
    subnavIdeasPopulate();
    contDashStats();
    contDashDeadline();
    contDashWordDate();
    contDashSummary();
    contDashChart('update');
    contDashGoals();
    get_time('true');

    document.getElementById('editor').innerHTML = "";
    document.getElementById('box-content-characters').innerHTML = "";
    document.getElementById('box-content-locations').innerHTML = "";
    document.getElementById('box-content-ideas').innerHTML = "";
    document.getElementById('box-content-research').innerHTML = "";


    let click = document.getElementById('menu-dashboard');

    setTimeout(() => {
        document.getElementById('hamcontent').innerHTML = "<div class=\"lds-ellipsis\"><h1 class=\"ct-subject-header\">Loaded!</h1></div>";
        menu('dashboard', click);

        setTimeout(() => {
            let modal = document.getElementById('modal_hamburger');
            modal.close();
        }, 1500);


    }, 2000);
}