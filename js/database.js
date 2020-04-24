function database(data, result) {

    // data contains:
    // let data = {
    //    function: 'get',
    //    id: '',
    //    table: 'Characters'
    // }

    // start sqlite3
    const sqlite3 = require('sqlite3').verbose();

    // attach database or create a new one
    let db = new sqlite3.Database(databaselocation);

    if (data.function == 'delete') {

        // syntax data:
        // let data = {
        //    function: 'delete',
        //    table: (table were data is stored)
        //    column: (column you want to trash, ie: locid)
        //    id: (id you want to trash)
        // }

        let sql = "UPDATE " + data.table + " SET trash = '1' WHERE " + data.column + " = '" + data.id + "'";

        console.log(sql);

        db.run(sql, function (err) {

            if (err) {

                alert(err);
            }

            else {

                console.log(`Row(s) updated: ${this.changes}`);

                return result('deleted');
            }
        });

    }

    else if (data.function == 'edit') {

        // syntax data example:
        // let data {
        // function: 'edit', // specify the function
        // table: 'table_to_edit', // specify the table to update
        // rows: 'locname="' + locname + '", locdesc="' + locdesc + '"', // all the rows you want to update
        // column: '', // based on which column do you want to update the rows?
        // id: '' // id of that particular column. 
        // }

        let sql = "UPDATE " + data.table + " SET " + data.rows + " WHERE " + data.column + " = '" + data.id + "'";

        console.log(sql);

        db.run(sql, function (err) {

            if (err) {
                alert(err);
            }

            else {

                console.log(`Row(s) updated: ${this.changes}`);

                return result('updatet');
            }

        })

    }

    else if (data.function == 'get') {

        // syntax data example:
        // let data = {
        //      function: 'get',
        //      db: 'array', // returns array with db.all instead of object with db.each
        //      table: 'tablename',
        //      records: 'record 1, record 2',
        //      column: 'locid',
        //      id: '13',
        //      and: 'AND',
        //      where: '', // extra column inc. value; ie trash=0
        //      orderby: 'ORDER BY',
        //      order: 'locorder'
        // }

        let sql = "SELECT DISTINCT " + data.records + " FROM " + data.table + " WHERE " + data.column + " = '" + data.id + "' " + data.and + " " + data.where + " " + data.orderby + " " + data.order + "";

        console.log(sql);

        if (data.db == 'array') {

            db.all(sql, function (err, records) {

                if (err) {

                    alert(err);
                }

                else {

                    return result(records);

                }
            })
        }

        else {

            db.each(sql, function (err, records) {

                if (err) {

                    alert(err);
                }

                else {

                    return result(records);

                }
            })
        };
    }

    else if (data.function == 'create') {

        let sql = "INSERT INTO " + data.table + " (" + data.rows + ") VALUES (" + data.values + ")";

        console.log(sql);

        db.run(sql, function (err) {

            if (err) {
                alert(err);
            }

            else {

                console.log(this);

                let id = this.lastID;

                return result(id);
            }

        })

    }


}