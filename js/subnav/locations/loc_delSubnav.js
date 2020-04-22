function delete_loc_category(id) {

    cat = id.dataset.catid;

    console.log(cat);

    // category needs to be deleted
    let data = {
        function: 'delete',
        table: 'LocCategory',
        column: 'catid',
        id: cat
    }

    database(data, function (del) {

        console.log('Location category', del);

        let cont = document.querySelector('.sn-accordion-item.open[data-catid="' + cat + '"]');

        console.log(cont);

        cont.parentNode.removeChild(cont);

        let data = {
            function: 'delete',
            table: 'Locations',
            column: 'catid',
            id: cat
        }

        database(data, function (delsub) {

            console.log('locations', delsub);

        })
    })

    // close the modal.
    let modal = document.getElementById('modal_delete');
    modal.close();
}

function delete_location(id) {

    loc = id.dataset.locid;

    // location that needs to be deleted
    let data = {
        function: 'delete',
        table: 'Locations',
        column: 'locid',
        id: loc
    }

    database(data, function (del) {

        console.log('Location', del);

        let cont = document.querySelector('.sn-subitem.locations[data-locid="' + loc + '"]');

        cont.parentNode.removeChild(cont);

    });

    // close the modal.
    let modal = document.getElementById('modal_delete');
    modal.close();

}