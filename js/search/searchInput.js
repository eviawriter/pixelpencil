// Here be search-stuff

// what happens when you click on a category in the search dialog.
function searchOpenCat(cat) {

    let resultbox = document.querySelectorAll('.s-box-results');

    for (let i = 0; i < resultbox.length; i++) {
        resultbox[i].style.visibility = "hidden";
        resultbox[i].style.width = "0";
        resultbox[i].style.height = "0";
    }

    let cats = document.querySelectorAll('.s-cat');

    for (let i = 0; i < cats.length; i++) {
        cats[i].classList.remove('active');
    }

    let writ = document.getElementById('s-writ');
    let char = document.getElementById('s-char');
    let loca = document.getElementById('s-loca');
    let idea = document.getElementById('s-idea');
    // let rese = document.getElementById('s-rese');

    if (cat == 'writ') {
        document.querySelector('.s-cat.writ').classList.add('active');
        writ.style.visibility = "visible";
        writ.style.width = "";
        writ.style.height = "";
    }

    if (cat == 'char') {
        document.querySelector('.s-cat.char').classList.add('active');
        char.style.visibility = "visible";
        char.style.width = "";
        char.style.height = "";
    }

    if (cat == 'loca') {
        document.querySelector('.s-cat.loca').classList.add('active');
        loca.style.visibility = "visible";
        loca.style.width = "";
        loca.style.height = "";
    }

    if (cat == 'idea') {
        document.querySelector('.s-cat.idea').classList.add('active');
        idea.style.visibility = "visible";
        idea.style.width = "";
        idea.style.height = "";
    }

    if (cat == 'rese') {
        document.querySelector('.s-cat.rese').classList.add('active');
        rese.style.visibility = "visible";
        rese.style.width = "";
        rese.style.height = "";
    }
}

// This creates the search dialog
function getSearchContent(value) {

    let search = value;

    console.log(search);

    // retrieve content from database
    let markup = `
         <div class="box-create-form">
             <h3 class="create_form_header">Search results</h3>
             <div class="box-search-content">
                 <div class="search-cat">
                     <button class="s-cat writ active" onclick="searchOpenCat('writ')">Writing</button>
                     <button class="s-cat char" onclick="searchOpenCat('char')">Characters</button>
                     <button class="s-cat loca" onclick="searchOpenCat('loca')">Locations</button>
                     <button class="s-cat idea" onclick="searchOpenCat('idea')">Ideas</button>
                     <!-- <button class="s-cat rese" onclick="searchOpenCat('rese')">Research</button> -->
                 </div>
                 <div class="search-results">
                     <div id="s-writ" class="s-box-results"></div>
                     <div id="s-char" class="s-box-results"></div>
                     <div id="s-loca" class="s-box-results"></div>
                     <div id="s-idea" class="s-box-results"></div>
                     <!-- <div id="s-rese" class="s-box-results"></div> -->
                 </div>
             </div>
             <div class="form-input-button">
             <button class="create_save_button" type="button" onclick="close_create_modal()">Close</button>
         </div>
         </div>
     `

    let modal = document.getElementById('modal_create');
    modal.innerHTML = markup;
    modal.showModal();

    // first get the subchapters
    let data = {

        function: 'get',
        db: 'array', // rrturns array with db.all instead of object with db.each
        simple: 'yes',
        records: 'subid, Subchapters.chapid, subname, subtext, Chapters.chapname AS category, Chapters.chaptrash',
        table: 'Subchapters',
        expression: 'LEFT JOIN Chapters ON Chapters.chapid = Subchapters.chapid WHERE subname LIKE \'%' + search + '%\' AND subtrash=0 AND chaptrash=0 OR subtext LIKE \'%' + search + '%\' AND subtrash=0 AND chaptrash=0 ORDER BY suborder'
    }

    console.log(data);

    // yes, a promise. I want to chain these, to make loading faster.
    let first = new Promise((resolve, reject) => {

        // this is first executed. Almost same code as in the method 'searchGetStuffMethod()' below
        database(data, (result) => {
            console.log(result);

            if (result == '') {
                let markup = `
                 <div>no results found</div>
                 `
                let add_results = document.getElementById('s-writ');
                add_results.insertAdjacentHTML('beforeend', markup);
                document.getElementById('s-writ').style.visibility = "visible";
            }

            for (let i = 0; i < result.length; i++) {

                // indexOf is case-sensitive, so convert the strings to lowercase
                let search_lowercase = search.toLowerCase();
                var str_lowercase = result[i].subtext.toLowerCase();

                let index = str_lowercase.indexOf(search_lowercase);

                result[i].index = index;
                result[i].search = search;

                console.log(index);

                if (index > 300) {

                    // the search-word has a specific index. To get a string with text, we substract
                    // 300 characters from the index and use this as the startindex. We also add 300
                    // characters to get an end index.
                    let startindex = index - 300;
                    let endindex = index + 300;

                    // get the string based on the calculated start and end index.
                    let text_too_much = result[i].subtext.substring(startindex, endindex);
                    console.log(text_too_much);

                    // create a new regular expression. It means: everything between < and >.
                    let pattern = new RegExp("<.*?>", "gi");

                    // replace every instance of pattern in the string text_too_much
                    let text_to_get = text_too_much.replace(pattern, ' ');
                    console.log(text_to_get);

                    // create a new index based on the search word;
                    let secindex = text_to_get.indexOf(search_lowercase);

                    // create new start and end indexes, totalling 300 characters (-150, +150)
                    let sindex = secindex - 150;
                    let eindex = secindex + 150;

                    // get the text based on the new indexes
                    let text = text_to_get.substring(sindex, eindex);
                    console.log(text);

                    // add it to the subtext. 
                    result[i].subtext = text;
                }

                if (index < 300) {
                    let startindex = 0;
                    let endindex = index + 300;

                    console.log(startindex, endindex);

                    let text_too_much = result[i].subtext.substring(startindex, endindex)

                    // create a new regular expression. It means: everything between < and >.
                    let pattern = new RegExp("<.*?>", "gi");

                    // replace every instance of pattern in the string text_too_much
                    let text_to_get = text_too_much.replace(pattern, ' ');
                    console.log(text_to_get);

                    // create a new index based on the search word;
                    let secindex = text_to_get.indexOf(search_lowercase);

                    // create new start and end indexes, totalling 300 characters (-150, +150)
                    let sindex = secindex - 150;
                    let eindex = secindex + 150;

                    // get the text based on the new indexes
                    let text = text_to_get.substring(sindex, eindex);
                    console.log(text);

                    // add it to the specific subtext
                    result[i].subtext = text;
                }
            }

            console.log(result);


            let markup = `
         ${result.map(result => `
             <span><button class="s-result" onclick="searchOutput(this, 'writing')" data-subid="${result.subid}" data-chapid="${result.chapid}" data-search="${result.search}">${result.subname}</button> (${result.category})</span>
             <br>
             <code class="s-content">${result.subtext}</code>
         `).join('')}
         `;

            let add_results = document.getElementById('s-writ');
            add_results.insertAdjacentHTML('beforeend', markup);
            searchOpenCat('writ');

            console.log(markup);

        })

        resolve()

    })

    first.then(searchGetCharacters(search))
        .then(searchGetLocations(search))
        .then(searchGetIdeas(search))
        .then(searchGetResearch(search))
        .catch((uhoh) => {
            console.log(uhoh);
        })
}

// add some content-specific data to the function and fire off method 'searchGetStuffMethod()'
function searchGetCharacters(search) {
    console.log('search characters')

    let data = {
        function: 'get',
        db: 'array', // rrturns array with db.all instead of object with db.each
        simple: 'yes',
        records: 'charname AS name, charbio AS desc, charid AS id1',
        table: 'Characters',
        expression: 'WHERE charname LIKE \'%' + search + '%\' AND chartrash=0 OR charbio LIKE \'%' + search + '%\' AND chartrash=0'
    }

    let data2 = {
        function: 'get',
        db: 'array', // rrturns array with db.all instead of object with db.each
        simple: 'yes',
        records: 'Charactercontent.charid AS id1, subjectid AS id2, subject, subjecttext AS text, Characters.chartrash, Characters.charname AS category',
        table: 'Charactercontent',
        expression: 'LEFT JOIN Characters ON Characters.charid = Charactercontent.charid WHERE subject LIKE \'%' + search + '%\' AND subjecttrash=0 AND chartrash=0 OR text LIKE \'%' + search + '%\' AND subjecttrash=0 AND chartrash=0'
    }

    let type = 'characters';

    console.log('Get the characters');

    searchGetStuffMethod(data, data2, type, search);
}

function searchGetLocations(search) {

    let data = {
        function: 'get',
        db: 'array', // rrturns array with db.all instead of object with db.each
        simple: 'yes',
        records: 'locname AS name, locdesc AS desc, locid AS id1',
        table: 'Locations',
        expression: 'WHERE locname LIKE \'%' + search + '%\' AND trash=0 OR locdesc LIKE \'%' + search + '%\' AND trash=0'
    }

    let data2 = {
        function: 'get',
        db: 'array', // rrturns array with db.all instead of object with db.each
        simple: 'yes',
        records: 'LocContent.locid AS id1, locoid AS id2, title AS subject, text, Locations.trash AS loctrash, Locations.locname AS category',
        table: 'LocContent',
        expression: 'LEFT JOIN Locations ON Locations.locid = LocContent.locid WHERE subject LIKE \'%' + search + '%\' AND LocContent.trash=0 AND loctrash=0 OR text LIKE \'%' + search + '%\' AND LocContent.trash=0 AND loctrash=0'
    }

    let type = 'locations';

    console.log('Get the Locations');

    searchGetStuffMethod(data, data2, type, search);

}

function searchGetIdeas(search) {
    console.log('search ideas')
    let data = {
        function: 'get',
        db: 'array', // rrturns array with db.all instead of object with db.each
        simple: 'yes',
        records: 'title AS name, text AS desc, ideaid AS id1',
        table: 'Ideas',
        expression: 'WHERE title LIKE \'%' + search + '%\' AND trash=0 OR text LIKE \'%' + search + '%\' AND trash=0'
    }

    let data2 = {
        function: 'get',
        db: 'array', // rrturns array with db.all instead of object with db.each
        simple: 'yes',
        records: 'IdeasContent.ideaid AS id1, id AS id2, IdeasContent.title AS subject, IdeasContent.text, Ideas.trash AS ideatrash, Ideas.title AS category',
        table: 'IdeasContent',
        expression: 'LEFT JOIN Ideas ON Ideas.ideaid = IdeasContent.ideaid WHERE subject LIKE \'%' + search + '%\' AND IdeasContent.trash=0 AND ideatrash=0 OR IdeasContent.text LIKE \'%' + search + '%\' AND IdeasContent.trash=0 AND ideatrash=0'
    }

    let type = 'ideas';

    console.log('Get the Ideas');

    searchGetStuffMethod(data, data2, type, search);
}

function searchGetResearch(search) {
    console.log('Get the Research');
}

// method to get stuff from database and put it in it's place.
// it's only 146 lines if I do it this way :) 
function searchGetStuffMethod(data, data2, type, search) {

    // some specifics based on type. Object is used to put in some 
    // type-specific options in the rest of the code.  
    if (type == 'locations') {
        var object = {
            header: 'Locations',
            element: 's-loca',
            data_id1: 'data-locid',
            data_id2: 'data-locoid',
            this: 'locations'
        }
    }

    if (type == 'ideas') {

        var object = {
            header: 'Ideas',
            element: 's-idea',
            data_id1: 'data-ideaid',
            data_id2: 'data-id',
            this: 'ideas'
        }
    }

    if (type == 'characters') {
        var object = {
            header: 'Characters',
            element: 's-char',
            data_id1: 'data-charid',
            data_id2: 'data-subjectid',
            this: 'characters'
        }
    }

    // run the first data-object
    database(data, (result) => {



        console.log(result);

        // result emtpy? Create a div with 'no results found' and the header
        if (result == '') {
            let markup = `
            <div class="s-header">${object.header}</div>
            <div class="s-notfound">no results found</div>
            `
            // add markup to the corresponding element (i.e. s-char, s-loca, s-idea, s-rese)
            let add_results = document.getElementById('' + object.element + '');
            add_results.insertAdjacentHTML('beforeend', markup);
        }

        // not empty? Do the stuff. Markup creates some header and subtext. 
        else {
            let markup = `
            <div class="s-header">${object.header}</div>
            ${result.map(result => `
                <button class="s-result" onclick="searchOutput(this, '${object.this}')" ${object.data_id1}="${result.id1}" data-search="${search}">${result.name}</button>
                <br>
                <code class="s-content">${result.desc}</code>
            `).join('')}
        `;

            let add_results = document.getElementById('' + object.element + '');
            add_results.insertAdjacentHTML('beforeend', markup);
        }

        // TODO: let the function to get the subchapters also use this method.
        // in that case, data2 is not neccessary, so it should read 'empty'.
        // At the moment, data2 is never emtpy.
        if (data2 != 'empty') {

            database(data2, (result) => {

                // if empty, put it in words.
                if (result == '') {
                    let markup = `
                <div class="s-header">${object.header} content</div>
                <div class="s-notfound">no results found</div>
                `
                    let add_results = document.getElementById('' + object.element + '');
                    add_results.insertAdjacentHTML('beforeend', markup);
                }

                else {
                    // iterate over the results
                    for (let i = 0; i < result.length; i++) {

                        // indexOf is case-sensitive, so convert the strings to lowercase
                        let search_lowercase = search.toLowerCase();
                        var str_lowercase = result[i].text.toLowerCase();

                        // get the index
                        let index = str_lowercase.indexOf(search_lowercase);

                        // add search to content of result[i]
                        result[i].search = search;

                        console.log(index);

                        // if index is over 150, create a start and end index.
                        // both added should be 300 characters long.
                        if (index > 300) {

                            // the search-word has a specific index. To get a string with text, we substract
                            // 300 characters from the index and use this as the startindex. We also add 300
                            // characters to get an end index.
                            var startindex = index - 300;
                            var endindex = index + 300;
                        }

                        // index below 150? make startindex 0 and endindex + 150
                        if (index < 300) {

                            // the search-word has a specific index. To get a string with text, we substract
                            // 300 characters from the index and use this as the startindex. We also add 300
                            // characters to get an end index.
                            var startindex = index - 300;
                            var endindex = index + 300;
                        }

                        // get the string based on the calculated start and end index.
                        let text_too_much = result[i].text.substring(startindex, endindex);
                        console.log(text_too_much);

                        // create a new regular expression. It means: everything between < and >.
                        let pattern = new RegExp("<.*?>", "gi");

                        // replace every instance of pattern in the string text_too_much
                        let text_to_get = text_too_much.replace(pattern, ' ');
                        console.log(text_to_get);

                        // create a new index based on the search word;
                        let secindex = text_to_get.indexOf(search_lowercase);

                        // create new start and end indexes, totalling 300 characters (-150, +150)
                        let sindex = secindex - 150;
                        let eindex = secindex + 150;

                        // get the text based on the new indexes
                        let text = text_to_get.substring(sindex, eindex);
                        console.log(text);

                        // add it to the subtext. 
                        result[i].text = text;

                    }

                    console.log(result);

                    // new markup
                    let markup = `
                        <div class="s-header">${object.header} content</div>
                            ${result.map(result => `
                                <span><button class="s-result" onclick="searchOutput(this)" ${object.data_id2}="${result.id2}" ${object.data_id1}="${result.id1}" data-search="${result.search}">${result.subject}</button> (${result.category})</span>
                                <br>
                                <code class="s-content">${result.text}</code>
                            `).join('')}
                    `;

                    // add it to the corresponding element.
                    let add_results = document.getElementById('' + object.element + '');
                    add_results.insertAdjacentHTML('beforeend', markup);
                }
            })
        }
    })
}