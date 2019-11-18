// Remove the active class on mouse-over
// actually only neccessary for writing :) 
// should be del
function subnav_remove_active(subnav, current) {

    if (subnav == 'dashboard') {

        let activeclass = document.getElementById('subnav-dashboard').querySelector(".active");
    
        if (activeclass !== null) {
            activeclass.classList.remove('active')
            current.classList.add('active');
        }
    }

    if (subnav == 'writing') {

        let activeclass = document.getElementById('subnav-writing').querySelector(".active");

        if (activeclass !== null) {
            activeclass.classList.remove('active')
            current.classList.add('active');
        }
    }

    if (subnav == 'characters') {

        let activeclass = document.getElementById('subnav-characters').querySelector(".active");

        if (activeclass !== null) {
            activeclass.classList.remove('active')
            current.classList.add('active');
        }
    }

    if (subnav == 'locations') {

        let activeclass = document.getElementById('subnav-locations').querySelector(".active");
    
        if (activeclass !== null) {
            activeclass.classList.remove('active')
            current.classList.add('active');
        }
    }

    if (subnav == 'ideas') {

        let activeclass = document.getElementById('subnav-ideas').querySelector(".active");
    
        if (activeclass !== null) {
            activeclass.classList.remove('active')
            current.classList.add('active');
        }
    }

    if (subnav == 'research') {

        let activeclass = document.getElementById('subnav-research').querySelector(".active");
    
        if (activeclass !== null) {
            activeclass.classList.remove('active')
            current.classList.add('active');
        }
    }
}