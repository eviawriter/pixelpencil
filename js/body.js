(function initilize_subnav() {

    populate_subnav_writing();
    populate_subnav_characters();
    subnavIdeasPopulate();

})()

function populate_subnav_writing() {

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    // load new content based on subid
    let stuff = "SELECT chapid, chapname, chaporder, ROW_NUMBER() OVER(ORDER BY chaporder) AS chapnr FROM Chapters WHERE chaptrash=0 ORDER BY chaporder";

    // db.all returns an object which is easily turned into a template. 
    db.all(stuff, function (err, chaps) {
        if (err) {
            console.log(err);
        }

        else {
            console.log(chaps);

            // first get the element used for writing
            let chapters = document.getElementById('subnav-writing');

            // add the HTML-markup. With chaps.map we create an array with for every chapter a new <section>. 
            const markup = `
            <div class="sn-accordion">
                ${chaps.map(row => `
                <section class="sn-accordion-item" data-chapid=${row.chapid} data-chaporder=${row.chaporder} onmouseover="subnav_remove_active('writing', this)">
                    <button class="button_chapters" data-chapid=${row.chapid}>
                        <h1>Chapter ${row.chapnr}</h1>
                        <h2>${row.chapname}</h2>
                    </button>
                </section>
                `).join('')}
            </div>
            `
            // The chapid is needed to add the subchapters to the correct chapter.
            let chapidlist = [];

            chaps.forEach((row) => {
                chapidlist.push(row.chapid);
            });

            // Add the content of markup to subnav-writing (chapters);
            chapters.innerHTML = markup;

            db.close();

            // excute a new function to add the subchapters.
            get_subchapters(chapidlist);

        }
    })

};

// function to add subchapters to the chapters.
function get_subchapters(chapidlist) {

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    // for each chapid, we do the  following.
    chapidlist.forEach((chapid) => {

        // get subid, subname and a row-number from te database using chapid. 
        let stuff = "SELECT subid, subname, suborder, chapid, ROW_NUMBER() OVER(ORDER BY suborder) AS subnr FROM Subchapters WHERE subtrash=0 AND chapid=" + chapid + " ORDER BY suborder";

        db.all(stuff, function (err, subs) {
            if (err) {
                console.log(err);
            }

            else {
                console.log(subs);

                // get the correct chapter based on data-chapid
                let chapters = document.getElementById('subnav-writing').querySelector('.sn-accordion-item[data-chapid="' + chapid + '"]');

                let id = { chapid: chapid };

                // create the HTML-markup for each subchapter in this specific chapter, based on data-chapid.
                const markup = `
                <div class="sn-subitems" data-chapid="${id.chapid}">
                    ${subs.map(sub => `
                            <button class="sn-subitem writing" tabindex="0" draggable="true" ondragstart="subdragstart(event)" ondrop="subdragdrop(event)" ondragover="subdragover(event)" ondragenter="subdragenter(event)" ondragleave="subdragleave(event)" onclick="subnav_writing(this)" data-chapid="${sub.chapid}" data-subid="${sub.subid}" data-suborder="${sub.suborder}">${sub.subnr}. ${sub.subname}</button>
                    `).join('')}
                </div>
                `;

                // insert the HTML before the end of the section sn-accordion-item (the container with the chapter)
                chapters.insertAdjacentHTML('beforeend', markup);

            }
        })
    })

    // make the first item of subnav-writing active. This means the subnav is collapsed at the first item.  
    document.getElementById('subnav-writing').querySelector('.sn-accordion-item').classList.add('active');

    db.close();

    // finally add an eventlistener
    delete_general();
};