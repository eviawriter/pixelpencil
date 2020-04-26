function delete_idea_category(id) {

    cat = id.dataset.catid;

    console.log(cat);

    // category needs to be deleted
    let data = {
        function: 'delete',
        table: 'IdeasCategory',
        column: 'catid',
        id: cat
    }

    database(data, function (del) {

        console.log('Idea category', del);

        let cont = document.getElementById('subnav-ideas').querySelector('.sn-accordion-item.open[data-catid="' + cat + '"]');

        console.log(cont);

        cont.parentNode.removeChild(cont);

        let data = {
            function: 'delete',
            table: 'Ideas',
            column: 'catid',
            id: cat
        }

        database(data, function (delsub) {

            console.log('ideas', delsub);

            // needs more things to do

        })
    })

    // close the modal.
    let modal = document.getElementById('modal_delete');
    modal.close();
}

function delete_idea(id) {

    loc = id.dataset.ideaid;

    // location that needs to be deleted
    let data = {
        function: 'delete',
        table: 'Ideas',
        column: 'ideaid',
        id: loc
    }

    database(data, function (del) {

        console.log('Ideas', del);

        let cont = document.querySelector('.sn-subitem.ideas[data-ideaid="' + loc + '"]');

        cont.parentNode.removeChild(cont);

    });

    // close the modal.
    let modal = document.getElementById('modal_delete');
    modal.close();

}