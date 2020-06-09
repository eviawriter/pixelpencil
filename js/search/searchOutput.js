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

        let modal = document.getElementById('modal_create');
        modal.close();

    }

    if (cat == 'characters') {
        subnav_characters(content, search);
        let modal = document.getElementById('modal_create');
        modal.close();
    }

    if (cat == 'char-cont') {
        var id1 = content.dataset.charid;
        var id2 = content.dataset.subjectid;
        searchOutputCharacters(id1, id2, search)
    }

    if (cat == 'loca') {
        var id1 = content.dataset.locid;
    }

    if (cat == 'loca-cont') {
        var id1 = content.dataset.locid;
        var id2 = content.dataset.locoid;
    }

    if (cat == 'idea') {
        var id1 = content.dataset.ideaid;
    }

    if (cat == 'idea-cont') {
        var id1 = content.dataset.ideaid;
        var id2 = content.dataset.id;
    }

    console.log(content);

}