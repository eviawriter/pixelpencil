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
        records: 'subid, chapid, subname, subtext',
        table: 'Subchapters',
        expression: 'WHERE subname LIKE \'%' + search + '%\' AND subtrash=0 OR subtext LIKE \'%' + search + '%\' AND subtrash=0 ORDER BY suborder'
    }

    console.log(data);

    // yes, a promise. I want to chain these, to make loading faster.
    let first = new Promise((resolve, reject) => {

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

                let index = result[i].subtext.indexOf(search);
                console.log(index);

                if (index > 150) {
                    let startindex = index - 150;
                    let endindex = index + 150;

                    console.log(startindex, endindex);

                    let text_to_get = result[i].subtext.substring(startindex, endindex)
                    let fix1 = text_to_get.replace(/<div>/g, '').replace(/<\/div>/g, '').replace(/<br>/g, '').replace(/iv>/g, '').replace(/div>/g, '').replace(/<span>/g, '').replace(/<\/span>/g, '').replace(/<ul>/g, '').replace(/<\/ul>/g, '').replace(/<\/li>/g, '').replace(/<li>/g, '').replace(/<blockquote>/g, '').replace(/<\/blockquote>/g, '').replace(/<\/h1>/g, '').replace(/<h1>/g, '').replace(/<h2>/g, '').replace(/<\/h2>/g, '').replace(/<\/h3>/g, '').replace(/<h3>/g, '').replace(/</g, '').replace(/>/g, '');

                    console.log(fix1);

                    result[i].subtext = fix1;
                }

                if (index < 150) {
                    let startindex = 0;
                    let endindex = index + 150;

                    console.log(startindex, endindex);

                    let text_to_get = result[i].subtext.substring(startindex, endindex)
                    let fix1 = text_to_get.replace(/<div>/g, '').replace(/<\/div>/g, '').replace(/<br>/g, '').replace(/iv>/g, '').replace(/div>/g, '').replace(/<span>/g, '').replace(/<\/span>/g, '').replace(/<ul>/g, '').replace(/<\/ul>/g, '').replace(/<\/li>/g, '').replace(/<li>/g, '').replace(/<blockquote>/g, '').replace(/<\/blockquote>/g, '').replace(/<\/h1>/g, '').replace(/<h1>/g, '').replace(/<h2>/g, '').replace(/<\/h2>/g, '').replace(/<\/h3>/g, '').replace(/<h3>/g, '').replace(/</g, '').replace(/>/g, '');


                    console.log(fix1);

                    result[i].subtext = fix1;
                }
            }

            console.log(result);


            let markup = `
        ${result.map(result => `
            <button class="s-result" onclick="searchOutput(this)" data-subid="${result.subid}" data-chapid="${result.chapid}">${result.subname}</button>
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

function searchGetCharacters(search) {
    console.log('search characters')

    let data = {
        function: 'get',
        db: 'array', // rrturns array with db.all instead of object with db.each
        simple: 'yes',
        records: 'charname, charbio, charid',
        table: 'Characters',
        expression: 'WHERE charname LIKE \'%' + search + '%\' AND chartrash=0 OR charbio LIKE \'%' + search + '%\' AND chartrash=0'
    }

    database(data, (result) => {

        console.log(result);

        if (result == '') {
            let markup = `
            <div class="s-header">Characters</div>
            <div class="s-notfound">no results found</div>
            `
            let add_results = document.getElementById('s-char');
            add_results.insertAdjacentHTML('beforeend', markup);
        }

        else {

            let markup = `
            <div class="s-header">Characters</div>
            ${result.map(result => `
                <button class="s-result" onclick="searchOutput(this)" data-charid="${result.charid}">${result.charname}</button>
                <br>
                <code class="s-content">${result.charbio}</code>
            `).join('')}
        `;

            let add_results = document.getElementById('s-char');
            add_results.insertAdjacentHTML('beforeend', markup);
        }

        let data = {
            function: 'get',
            db: 'array', // rrturns array with db.all instead of object with db.each
            simple: 'yes',
            records: 'charid, subjectid, subject, subjecttext',
            table: 'Charactercontent',
            expression: 'WHERE subject LIKE \'%' + search + '%\' AND subjecttrash=0 OR subjecttext LIKE \'%' + search + '%\' AND subjecttrash=0'
        }

        database(data, (result) => {

            if (result == '') {
                let markup = `
                <div class="s-header">Characters content</div>
                <div class="s-notfound">no results found</div>
                `
                let add_results = document.getElementById('s-char');
                add_results.insertAdjacentHTML('beforeend', markup);
            }

            else {

                for (let i = 0; i < result.length; i++) {

                    let index = result[i].subjecttext.indexOf(search);
                    console.log(index);

                    if (index > 150) {
                        let startindex = index - 150;
                        let endindex = index + 150;

                        console.log(startindex, endindex);

                        let text_to_get = result[i].subjecttext.substring(startindex, endindex)
                        let fix1 = text_to_get.replace(/<div>/g, '').replace(/<\/div>/g, '').replace(/<br>/g, '').replace(/iv>/g, '').replace(/div>/g, '').replace(/<span>/g, '').replace(/<\/span>/g, '').replace(/<ul>/g, '').replace(/<\/ul>/g, '').replace(/<\/li>/g, '').replace(/<li>/g, '').replace(/<blockquote>/g, '').replace(/<\/blockquote>/g, '').replace(/<\/h1>/g, '').replace(/<h1>/g, '').replace(/<h2>/g, '').replace(/<\/h2>/g, '').replace(/<\/h3>/g, '').replace(/<h3>/g, '').replace(/</g, '').replace(/>/g, '');

                        console.log(fix1);

                        result[i].subjecttext = fix1;
                    }

                    if (index < 150) {
                        let startindex = 0;
                        let endindex = index + 150;

                        console.log(startindex, endindex);

                        let text_to_get = result[i].subjecttext.substring(startindex, endindex)
                        let fix1 = text_to_get.replace(/<div>/g, '').replace(/<\/div>/g, '').replace(/<br>/g, '').replace(/iv>/g, '').replace(/div>/g, '').replace(/<span>/g, '').replace(/<\/span>/g, '').replace(/<ul>/g, '').replace(/<\/ul>/g, '').replace(/<\/li>/g, '').replace(/<li>/g, '').replace(/<blockquote>/g, '').replace(/<\/blockquote>/g, '').replace(/<\/h1>/g, '').replace(/<h1>/g, '').replace(/<h2>/g, '').replace(/<\/h2>/g, '').replace(/<\/h3>/g, '').replace(/<h3>/g, '').replace(/</g, '').replace(/>/g, '');


                        console.log(fix1);

                        result[i].subjecttext = fix1;
                    }
                }

                console.log(result);


                let markup = `
            <div class="s-header">Character content</div>
            ${result.map(result => `
            <button class="s-result" onclick="searchOutput(this)" data-subjectid="${result.subjectid}" data-charid="${result.charid}">${result.subject}</button>
            <br>
            <code class="s-content">${result.subjecttext}</code>
        `).join('')}
        `;

                let add_results = document.getElementById('s-char');
                add_results.insertAdjacentHTML('beforeend', markup);

            }
        })
    })
}

function searchGetLocations() {
    console.log('search locations')
}

function searchGetIdeas() {
    console.log('search ideas')
}

function searchGetResearch() {
    console.log('search research')
}