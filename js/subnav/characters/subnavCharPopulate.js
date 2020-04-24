function populate_subnav_characters() {

    let characters = document.getElementById('subnav-characters');

    const markup = `
    <div class="sn-accordion">
        
        <section class="sn-accordion-item open" data-chartype="1">
            <h1 class="sn-character-header">Main characters</h1>
            <div class="sn-subitems" data-chartype="1"></div>
        </section>

        <section class="sn-accordion-item open" data-chartype="2">
            <h1 class="sn-character-header">Secondary characters</h1>
            <div class="sn-subitems" data-chartype="2"></div>
        </section>

        <section class="sn-accordion-item open" data-chartype="3">
            <h1 class="sn-character-header">Other characters</h1>
            <div class="sn-subitems" data-chartype="3"></div>
        </section>

    </div>
    `

    characters.innerHTML = markup;

    add_subnav_characters();
}

function add_subnav_characters() {

    let charlist = ["1", "2", "3"];

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    charlist.forEach((chartype) => {

        // load new content based on subid
        let stuff = "SELECT charid, charname, chartype FROM Characters WHERE chartype=" + chartype + " AND chartrash=0";

        // db.all returns an object which is easily turned into a template. 
        db.all(stuff, function (err, char) {
            if (err) {
                console.log(err);
            }

            else {

                console.log(char);

                // get the sn-accordion-item for chartype * 
                let characters = document.getElementById('subnav-characters').querySelector('.sn-subitems[data-chartype="' + chartype + '"]');
                
                // create the HTML-markup for each character, based on data-charid.
                const markup = `
                        ${char.map(char => `
                            <button class="sn-subitem characters" onclick="subnav_characters(this)" data-charid="${char.charid}" data-chartype="${char.chartype}">${char.charname}</button>
                        `).join('')}
                `;

                // insert the HTML before the end of the section sn-accordion-item (the container with the chapter)
                characters.insertAdjacentHTML('beforeend', markup);

            }
        })
    })
} 