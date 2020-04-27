window.addEventListener('DOMContentLoaded', (event) => {
    contDashStats();
});


function contDashStats() {

    console.log('i\'m running!')
    // count nr. of chapters and subchapters
    let data = {
        function: "count",
        union: 'yes',
        table: "Chapters",
        trash: "chaptrash",
        table2: "Subchapters",
        trash2: "subtrash",
        table3: "Characters",
        trash3: "chartrash",
        table4: "Locations",
        trash4: "trash",
        table5: "Ideas",
        trash5: "trash",
        table6: "Research",
        trash6: "trash"
    }

    database(data, function (res) {

        let writing = `
            You wrote<br>
            ${res.chap} chapter(s) and ${res.subchap} subchapter(s)
            `

        document.getElementById('dashwriter').innerHTML = writing;

        let character = `
            You contstructed <br> ${res.char} different characters
        `
        document.getElementById('dashcharacters').innerHTML = character;

        let location = `
        You described <br> ${res.loc} locations
        `
        document.getElementById('dashlocations').innerHTML = location;

        let ideas = `
        You jot down <br> ${res.idea} great ideas
        `
        document.getElementById('dashideas').innerHTML = ideas;

        let research = `
        You added <br> ${res.rese} pieces of research
        `
        document.getElementById('dashresearch').innerHTML = research;
        
    });
}