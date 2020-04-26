function delIdeasContent(cont, option) {

    console.log(cont);

    if (option == 'subject') {
        var data = {
            function: 'delete',
            id: cont.dataset.id,
            dataid: 'id',
            table: 'IdeasContent',
            column: 'id'
        }
    }

    else if (option == 'description') {

        var data = {
            function: 'edit', // specify the function
            table: 'Ideas', // specify the table to update
            rows: 'text=""', // all the rows you want to update
            column: 'ideaid', // based on which column do you want to update the rows?
            id: cont.dataset.ideaid, // id of that particular column. 
            dataid: 'ideaid'
        }
    }

    console.log(data);

    database(data, function (result) {

        if (result == 'deleted') {

            let container = document.getElementById('box-content-ideas').querySelector('.ct-subject[data-' + data.dataid + ' = "' + data.id + '"]');

            console.log(container);

            if (container == undefined) {
                alert('Something went very bad, container not found. (result is deleted)');
            }

            else {
                container.parentNode.removeChild(container);

                close_delete_modal();

            }
        }

        else {

            let container = document.getElementById('box-content-ideas').querySelector('.ct-subject[data-' + data.dataid + ' = "' + data.id + '"]');

            console.log(container);

            if (container == undefined) {
                alert('Something went very bad, container not found. (result is not deleted)');
            }

            else {
                container.parentNode.removeChild(container);

                close_delete_modal();

            }
        }
    });


}

