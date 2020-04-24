function delLocContent(cont, option) {

    console.log(cont);

    if (option == 'subject') {
        var data = {
            function: 'delete',
            id: cont.dataset.locoid,
            dataid: 'locoid',
            table: 'LocContent',
            column: 'locoid'
        }
    }

    else if (option == 'description') {

        var data = {
            function: 'edit', // specify the function
            table: 'Locations', // specify the table to update
            rows: 'locdesc=""', // all the rows you want to update
            column: 'locid', // based on which column do you want to update the rows?
            id: cont.dataset.locid, // id of that particular column. 
            dataid: 'locid'
        }
    }

    console.log(data);

    database(data, function (result) {

        if (result == 'deleted') {

            let container = document.querySelector('.ct-subject[data-' + data.dataid + ' = "' + data.id + '"]');

            if (container == undefined) {
                alert('Something went wrong.');
            }

            else {
                container.parentNode.removeChild(container);

                close_delete_modal();

            }
        }

        else {

            let container = document.querySelector('.ct-subject[data-' + data.dataid + ' = "' + data.id + '"]');

            if (container == undefined) {
                alert('Something went wrong.');
            }

            else {
                container.parentNode.removeChild(container);

                close_delete_modal();


                console.log('This should not happen.');

            }
        }
    });


}

