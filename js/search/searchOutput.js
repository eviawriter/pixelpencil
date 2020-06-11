function searchOutput(content, cat) {

    // global variables within this function
    var search = content.dataset.search;

    console.log(search);

    if (cat == 'writing') {

        let button = document.getElementById('menu-writing');
        menu('writing', button);

        let chapid = content.dataset.chapid;
        let subid = content.dataset.subid;

        document.querySelector('.sn-accordion-item.active').classList.remove('active');
        document.querySelector('.sn-accordion-item[data-chapid="'+ chapid + '"]').classList.add('active');

        let subitems = document.querySelectorAll('.sn-subitem.writing');

        for (let i = 0; i < subitems.length; i++) {
            subitems[i].style.backgroundColor = ""
        }

        let subnav = document.querySelector('.sn-subitem.writing[data-subid="'+subid+'"]');
        subnav.style.backgroundColor = "#00AE9D";

        subnav_writing(subnav, search);

    }

    if (cat == 'characters') {
        subnav_characters(content, search);
    }

    if (cat == 'locations') {
        subnav_locations(content, search);
    }

    if (cat == 'ideas') {
        subnav_ideas(content, search);
    }

    if (cat == 'research') {
        subnav_research(content, search);
    }

    console.log(content);

    let modal = document.getElementById('modal_create');
    modal.close();
}

// Method used by subnav_*** 
function subnavHighlight(search, inner) {

    // check if there is an id of a subject. If so, eval inner.subject
    if (inner.id != undefined) {
        console.log(inner.subject);
        var innerhtml = eval(inner.subject);
    }

    else {
        var innerhtml = eval(inner.main);
    }

    // put the innerhtml into a string;
    let content = innerhtml.toString();

    console.log(content);

    // create a search-pattern with RegExp
    let pattern = new RegExp("(" + search + ")", "gi");

    // replace the pattern with some code
    let new_text = content.replace(pattern, "<span class='highlight'>" + search + "</span>");

    console.log(pattern);
    console.log(new_text);

    // if there is an id, eval inner.subreplace and create var based on inner.scroll
    if (inner.id != undefined) {
        eval(inner.subreplace);
        var high = eval(inner.scroll);
    }

    // else eval mainreplace and create new var
    else {
        eval(inner.mainreplace);
        var high = document.querySelector('.highlight');
    }

    console.log(high);

    high.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    subnavEventListener(inner, search)
}

function subnavEventListener(content, search) {

    // add eventlistener to the content-box. This is the container of all categories
    document.querySelector('.box-content').addEventListener('click', function subnavCharClicked() {

        // remove eventlistener after clicking
        document.querySelector('.box-content').removeEventListener('click', subnavCharClicked, false);

        // get inner content based on main.
        let inner = eval(content.main);

        // make it a string
        let string = inner.toString();

        console.log(string);

        // make a regexp as searchpattern
        let pattern = new RegExp("<span class=\"highlight\">" + search + "</span>", "gi");
        console.log(pattern);

        // replace every instance of pattern2 in string
        let new_text = string.replace(pattern, search);
        console.log(new_text);

        // replace current content with new_text2.
        eval(content.mainreplace);

    }, false);
}
