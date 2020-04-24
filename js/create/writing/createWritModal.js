// Create a dropdownmenu in the add_subchapter modal.

function modal_subchapter_dropdown(markup) {
   
    // require sqlite3 and connect database
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database(databaselocation);

    // get all current chapters from database
    db.all("SELECT chapname, chapid FROM Chapters WHERE chaptrash=0 ORDER BY chaporder", function(err,chaps) {
        
        if (err) {
            console.log(err, 'ik doe ut niet!')
        }
        
        else {         
            
                      
            // form-subchapter-dropdown is the dropdownmenu
            let dropdown = document.getElementById('form-subchapter-dropdown');

            dropdown.add(new Option('Select chapter'));

            // iterate over the object retrieved form db.all. 
            for (const [key, value] of Object.entries(chaps)) {
                console.log(key, value);

                // create a new option for each object. Option name is chapname, option value is chapid.
                dropdown.add(new Option(value.chapname, value.chapid))

            }
        }
    });


    let modal = document.getElementById('modal_create');
modal.innerHTML = markup;
modal.showModal();

};