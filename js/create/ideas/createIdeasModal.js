// Create a dropdownmenu in the add_subchapter modal.

function modal_ideas_dropdown(markup) {

    let data = {
        function: 'get',
        db: 'array', // returns array with db.all instead of object with db.each
        table: 'IdeasCategory',
        records: 'title, catid',
        column: 'trash',
        id: '0',
        and: '',
        where: '',
        orderby: '',
        order: ''
    }

    database(data, function (cat) {

        console.log(cat);

        let dropdown = document.getElementById('form-ideas-dropdown');

        dropdown.add(new Option('Select category'));

        // iterate over the object retrieved form db.all. 
        for (const [key, value] of Object.entries(cat)) {
            console.log(key, value);

            // create a new option for each object. Option name is chapname, option value is chapid.
            dropdown.add(new Option(value.title, value.catid))

        }

    })

    let modal = document.getElementById('modal_create');
    modal.innerHTML = markup;
    modal.showModal();
}