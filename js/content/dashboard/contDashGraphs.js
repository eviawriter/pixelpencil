(function contDashStart() {

    // execute on first load
    contDashChart();

})()

function contDashChart(update) {

    // first get the content from the database.
    // ie; get the chapters (which become labels),
    // count each word in those chapters by retrieving all
    // the subchapter-content and counting the words per chapter
    let data = {
        function: 'get',
        db: 'array', // returns array with db.all instead of object with db.each
        table: 'words',
        records: 'chapid, chapname',
        column: 'chaptrash',
        id: '0',
        and: '',
        where: '', // extra column inc. value; ie trash=0
        orderby: 'ORDER BY',
        order: 'chaporder'
    }

    database(data, function (result) {

        for (i = 0; i < result.length; i++) {

            let data = {
                function: 'get',
                db: 'array', // returns array with db.all instead of object with db.each
                table: 'words',
                records: 'chapid, words',
                column: 'chaptrash',
                id: '0',
                and: 'AND',
                where: 'chapid=' + result[i].chapid, // extra column inc. value; ie trash=0
                orderby: 'ORDER BY',
                order: 'chaporder'
            }

            database(data, function (result, chapid) {

                console.log(result);

                let words = [];

                for (i = 0; i < result.length; i++) {

                    words.push(result[i].words);

                };

                console.log(words);

                let count = words.reduce((a, b) => a + b, 0);

                console.log(count);

                let data = {
                    function: 'edit', // specify the function
                    table: 'Chapters', // specify the table to update
                    rows: 'count="' + count + '"', // all the rows you want to update
                    column: 'chapid', // based on which column do you want to update the rows?
                    id: result[0].chapid // id of that particular column. 
                }

                database(data, function (result) {

                    contDashArrays(update);

                })
            })
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
    var ctt = document.getElementById('dashtime');

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

    var dashtime = new Chart(ctt, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Number of words per day',
                data: [12, 19, 3, 5, 2, 3],
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

    dashword.canvas.parentNode.style.height = '300px';
    dashword.canvas.parentNode.style.width = '500px';
    dashtime.canvas.parentNode.style.height = '300px';
    dashtime.canvas.parentNode.style.width = '500px';


    if (update == 'update') {
        dashword.data.datasets.data = [];
        dashword.data.datasets.forEach((dataset) => {
            dataset.data.push(count);
        });

        dashword.update();
    }
};