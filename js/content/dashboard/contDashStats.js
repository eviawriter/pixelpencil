window.addEventListener('DOMContentLoaded', (event) => {
    contDashStats();
    contDashDeadline();
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

        contDashWordDate();

    });
}

function contDashDeadline() {

    let data = {
        function: 'custom',
        type: 'each',
        sql: 'SELECT projectdate FROM Project'
    }

    database(data, (result) => {

        console.log(result);

        let data = {

            function: 'custom',
            type: 'all',
            sql: "SELECT strftime('%d-%m-%Y', date('now', 'localtime')) AS date"
        }

        let projectdate = result.projectdate;

        database(data, (result) => {

            console.log(projectdate, result[0].date);

            let fix = result[0].date;

            let date1 = new Date('' + projectdate + '');
            let date2 = new Date();

            let oneday = 24 * 60 * 60 * 1000;

            console.log(date1, date2);

            let deadline = Math.round((date1-date2)/oneday);

            let dead = `
                You have ${deadline} days until the<br>deadline of ${projectdate}
            `

            document.getElementById('dashdeadline').innerHTML = dead;

            console.log(deadline);

        })

    })

    // var diff = Math.abs(new Date() - compareDate);

}

function contDashWordDate() {

    let data = {
        function: 'custom',
        type: 'all', // returns array with db.all instead of object with db.each
        sql: 'SELECT startcount, endcount, strftime(\'%d-%m-%Y\', date(enddate, \'unixepoch\', \'localtime\')) AS date FROM Statistics WHERE startcount NOT NULL AND endcount NOT NULL AND enddate NOT NULL'
    }

    database(data, (result) => {

        console.log(result);

        let date = [];
        let numb = [];

        for (i = 0; i < result.length; i++) {

            if (date.includes(result[i].date)) {

                console.log(numb.slice(-1)[0]);

                let count = numb.slice(-1)[0] + result[i].endcount - result[i].startcount;

                numb.pop();

                numb.push(count);

                // do nothing
            }

            else {

                console.log(numb);

                let total = (result[i].endcount - result[i].startcount);
                date.push(result[i].date);
                numb.push(total);
            }

        }

        contDashTime(date, numb);

    })
}


    //    // this works
    //    let data = {
    //        function: 'custom',
    //        type: 'each',
    //        sql: 'SELECT DISTINCT enddate FROM Statistics WHERE enddate NOT NULL ORDER BY id DESC LIMIT 1'
    //    }
    //
    //    database(data, function (result) {
    //
    //        console.log(result, 'fuck');
    //
    //        let data = {
    //            function: 'custom',
    //            type: 'each',
    //            sql: 'SELECT strftime(\'%d-%m-%Y\', date(' + result.enddate + ', \'unixepoch\', \'localtime\')) AS date'
    //        }
    //
    //        database(data, function (result) {
    //
    //            console.log(result.date);
    //
    //        })
    //
    //
    //
    //    })