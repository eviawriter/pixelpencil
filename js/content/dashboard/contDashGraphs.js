function contDashChart(update) {

    // first get the content from the database.
    // ie; get the chapters (which become labels),
    // count each word in those chapters by retrieving all
    // the subchapter-content and counting the words per chapter
    let data = {
        function: 'get',
        db: 'array',
        table: 'words',
        records: 'chapid, chapname',
        column: 'chaptrash',
        id: '0',
        and: '',
        where: '',
        orderby: 'ORDER BY',
        order: 'chaporder'
    }


    database(data, function (result) {

        if (result == "") {
            let chapters = [];
            let count = [];
            let update = 'update';

            console.log('it is empty!')

            contDashLoadCharts(chapters, count, update);

        }

        else {

            // iterate over each chapter and extract the words-column of
            // every subchapter beloning to it. 
            for (let i = 0; i < result.length; i++) {

                let data = {
                    function: 'get',
                    db: 'array',
                    table: 'words',
                    records: 'chapid, words',
                    column: 'chaptrash',
                    id: '0',
                    and: 'AND',
                    where: 'chapid=' + result[i].chapid,
                    orderby: 'ORDER BY',
                    order: 'chaporder'
                }

                database(data, function (result) {

                    var words = [];

                    // push all the words in that variable.
                    for (i = 0; i < result.length; i++) {

                        words.push(result[i].words);

                    };

                    // get thet total number of words for that chapter
                    let count = words.reduce((a, b) => a + b, 0);

                    // update the number total in the Chapters-table.
                    let data = {
                        function: 'edit',
                        table: 'Chapters',
                        rows: 'count="' + count + '"',
                        column: 'chapid',
                        id: result[0].chapid
                    }

                    // wordt per hoofdstuk uitgevoerd en geüpdatet, maar
                    // heb geen idee hoe ik dat kan voorkomen :) 
                    database(data, function (result) {
                        contDashArrays(update);
                    })
                })
            }
        }
    })
}

function contDashArrays(update) {

    let data = {
        function: 'get',
        db: 'array', // returns array with db.all instead of object with db.each
        table: 'Chapters',
        records: 'chapname, count',
        column: 'chaptrash',
        id: '0',
        and: '',
        where: '', // extra column inc. value; ie trash=0
        orderby: 'ORDER BY',
        order: 'chaporder'
    }

    database(data, function (result) {

        console.log(result);


        let chapters = [];
        let count = [];

        for (i = 0; i < result.length; i++) {

            chapters.push(result[i].chapname);
            count.push(result[i].count);

        }

        if (update == 'update') {

            let update = "update";

            console.log('yes, update is working!!!!!!')

            contDashLoadCharts(chapters, count, update);
            count = [];
        }

        else {

            let update = "";

            contDashLoadCharts(chapters, count, update)
            count = [];
        }

    })

}

// then add graph to dashboard.
function contDashLoadCharts(title, count, update) {

    // add graph to dashboard
    var ctw = document.getElementById('dashword');

    var dashword = new Chart(ctw, {
        type: 'bar',
        data: {
            labels: title,
            datasets: [{
                label: 'Number of words per chapter',
                data: count,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    dashword.canvas.parentNode.style.height = '300px';
    dashword.canvas.parentNode.style.width = '500px';

    if (update == 'update') {
        dashword.data.datasets.data = [];
        dashword.data.datasets.forEach((dataset) => {
            dataset.data.push(count);
        });

        dashword.update();
    }
};

function contDashTime(date, numb, update) {

    var ctt = document.getElementById('dashtime');

    var dashtime = new Chart(ctt, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: 'Number of words per day',
                data: numb,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    })

    dashtime.canvas.parentNode.style.height = '300px';
    dashtime.canvas.parentNode.style.width = '500px';
}

// function to calculate how much words are written per day. Updates every day.
function contDashWordDate() {

    // sql extracts startcount, endcount and the enddate from te database. 
    // strftime puts enddate in European readable date-format. 
    let data = {
        function: 'custom',
        type: 'all',
        sql: 'SELECT startcount, endcount, strftime(\'%d-%m-%Y\', date(enddate, \'unixepoch\', \'localtime\')) AS date FROM Statistics WHERE startcount NOT NULL AND endcount NOT NULL AND enddate NOT NULL ORDER BY enddate'
    }

    database(data, (result) => {

        let date = [];
        let numb = [];

        // for loop iterates over the results from the database. 
        for (i = 0; i < result.length; i++) {

            // since people can open and close the software all day, it's bound to happen
            // that the enddate contains multiple times the same date. So, we check first if the 
            // date has been pushed to [date] earlier in the for loop.
            if (date.includes(result[i].date)) {

                // If so, we take the last entry of [numb] and add endcount an startcount to it.
                let count = numb.slice(-1)[0] + result[i].endcount - result[i].startcount;

                // we remove that last entry from [numb].
                numb.pop();

                // and push count to [numb]. Since [date] is already correctly set, we don't push
                // anything to date.
                numb.push(count);
            }

            else {

                // Well, if it's a new date, we calculate the total words written for that specific
                // entry and push [result[i].date] and [total] to the corresponding variables. 
                let total = (result[i].endcount - result[i].startcount);
                date.push(result[i].date);
                numb.push(total);
            }
        }

        // Let's put our Charts.js to work!
        contDashTime(date, numb);
    })
}