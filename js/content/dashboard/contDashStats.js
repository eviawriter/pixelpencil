// executes as soon as the DOM is ready.
window.addEventListener('DOMContentLoaded', (event) => {
    contDashStats();
    contDashDeadline();
    contDashWordDate();
    contDashSummary();
    contDashChart();
    contDashGoals()
});

// function to add some data to the Dashboard
function contDashStats() {

    // count number of entries per table based on trash=0.
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

        // add the count to the statistic it belongs to. 
        let writing = `You wrote<br>${res.chap} chapter(s) and ${res.subchap} subchapter(s)`
        document.getElementById('dashwriter').innerHTML = writing;

        let character = `You contstructed <br> ${res.char} different characters`
        document.getElementById('dashcharacters').innerHTML = character;

        let location = `You described <br> ${res.loc} locations`
        document.getElementById('dashlocations').innerHTML = location;

        let ideas = `You jot down <br> ${res.idea} great ideas`
        document.getElementById('dashideas').innerHTML = ideas;

        let research = `You added <br> ${res.rese} pieces of research`
        document.getElementById('dashresearch').innerHTML = research;
    });
}

// function to calculate days until deadline.
function contDashDeadline() {

    let data = {
        function: 'custom',
        type: 'each',
        sql: 'SELECT projectdate FROM Project'
    }

    // get the projectdate
    database(data, (result) => {

        let data = {

            function: 'custom',
            type: 'all',
            sql: "SELECT strftime('%Y-%m-%d', date('now', 'localtime')) AS date"
        }

        let projectdate = result.projectdate;

        // get the current time from the database (new Date() would also be possilbe,
        // but I like to get the date from the database instead).
        database(data, (result) => {

            // convert dates to string
            let date1 = new Date('' + projectdate + '');
            let date2 = new Date('' + result[0].date + '');

            // used to calculate the number of days until deadline
            let oneday = 24 * 60 * 60 * 1000;

            // calculate deadline and put it in the locale date string
            let deadline = Math.round((date1 - date2) / oneday);
            let dateline = new Date(projectdate).toLocaleDateString();

            // create variable line and change the color of the text based on how must time 
            // there still is until deadline.
            if (deadline > 0) {
                var line = `You have ${deadline} days until the<br>deadline of ${dateline}`
            }

            if (deadline <= 0) {
                document.getElementById('dashdeadline').style.color = '';
                var line = `Your deadline of ${dateline} has passed. Hopefully that's a good sign! :)`
            }

            if (deadline > 5 && deadline < 10) {
                document.getElementById('dashdeadline').style.color = 'orange';
            }

            if (deadline > 0 && deadline < 5) {
                document.getElementById('dashdeadline').style.color = 'red';
            }

            // add contents of variable line to dashdeadline. 
            document.getElementById('dashdeadline').innerHTML = line;
        })
    })
}