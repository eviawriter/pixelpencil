// This function is a method to use throughout the program when 
// something needs to be retrieved, stored, changed or deleted in
// the database. 
// The data-object is used and passed to database(data, function(result)) {}
// Only 'select' and 'create' return meaningful data (mostly the id)
// 'Delete' and 'Edit' return an update. 
function database(data, result) {

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

                alert(err, sql);
            }

            else {

                console.log(`Row(s) updated: ${this.changes}`);

                return result('deleted');
            }
        });

    }

    else if (data.function == 'edit') {

        // syntax data example:
        // let data = {
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
                alert(err, sql);
            }

            else {

                console.log(`Row(s) updated: ${this.changes}`);

                return result('updatet');
            }

        })

    }

    else if (data.function == 'get') {
        // syntax easy form of get-function:
        // function: 'get',
        // db: 'array',             // array = db.all, empty = db.each
        // records: 'column 1, column 2' 
        // table: 'table'
        // expression: 'ORDER BY pizza'  // custom queries like WHERE and ORDER BY
        if (data.simple == 'yes') {
            var sql = "SELECT DISTINCT " + data.records + " FROM " + data.table + " " + data.expression + "";
        }

        //      syntax with 'WHERE' clause: 
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
        else {
            var sql = "SELECT DISTINCT " + data.records + " FROM " + data.table + " WHERE " + data.column + " = '" + data.id + "' " + data.and + " " + data.where + " " + data.orderby + " " + data.order + "";
        }

        console.log(sql);

        // returns array with content.
        if (data.db == 'array') {

            db.all(sql, function (err, records) {

                if (err) {

                    alert(err, sql);
                    console.log(err, sql);
                }

                else {

                    return result(records);

                }
            })
        }

        // returns objects. 
        else {

            db.each(sql, function (err, records) {

                if (err) {

                    alert(err, sql);
                    console.log(err, sql);
                }

                else {

                    return result(records);

                }
            })
        };
    }

    else if (data.function == 'create') {

        // SYNTAX:
        // let data {
        //     table: 'table to insert',
        //     rows: 'columns you wanna insert',
        //     values: 'values you wanna insert in the row'
        // }

        let sql = "INSERT INTO " + data.table + " (" + data.rows + ") VALUES (" + data.values + ")";

        console.log(sql);

        db.run(sql, function (err) {

            if (err) {
                alert(err, sql);
            }

            else {

                console.log(this);

                let id = this.lastID;

                return result(id);
            }
        })
    }

    else if (data.function == 'count') {

        // SYNTAX:
        // let data {
        //      table: (name of table)
        //      trash: (name of trash column)
        // }
        if (data.union == 'yes') {
            var sql = `
                SELECT COUNT(*) AS count FROM ${data.table} WHERE ${data.trash}=0 
                UNION ALL 
                SELECT COUNT(*) FROM ${data.table2} WHERE ${data.trash2}=0 
                UNION ALL 
                SELECT COUNT(*) FROM ${data.table3} WHERE ${data.trash3}=0 
                UNION ALL 
                SELECT COUNT(*) FROM ${data.table4} WHERE ${data.trash4}=0 
                UNION ALL 
                SELECT COUNT(*) FROM ${data.table5} WHERE ${data.trash5}=0
                UNION ALL 
                SELECT COUNT(*) FROM ${data.table6} WHERE ${data.trash6}=0
            `
        }

        else {
            var sql = "SELECT COUNT(*) AS count FROM " + data.table + " WHERE " + data.trash + "=0";
        }

        console.log(sql);

        db.all(sql, function (err, res) {

            if (err) {
                alert(err, sql);
            }

            else {

                console.log(res);

                let chap = res[0].count;
                let subchap = res[1].count;
                let char = res[2].count;
                let loc = res[3].count;
                let idea = res[4].count;
                let rese = res[5].count;


                let uit = {
                    chap: chap,
                    subchap: subchap,
                    char: char,
                    loc: loc,
                    idea: idea,
                    rese: rese
                }

                return result(uit);
            }
        })
    }

    else if (data.function == 'custom') {

        console.log(data.sql);

        console.log(data.type);

        if (data.type == 'all') {

            db.all(data.sql, function (err, res) {

                if (err) {
                    alert(err, data.sql);
                }

                else {
                    console.log(res, 'all');

                    return result(res);
                }
            })
        }

        if (data.type == 'each') {

            db.each(data.sql, function (err, res) {

                if (err) {
                    alert(err, data.sql);
                }

                else {
                    console.log(res, 'each');

                    return result(res);
                }
            })
        }

        if (data.type == 'get') {

            db.get(data.sql, function (err, res) {

                if (err) {
                    alert(err, data.sql);
                }

                else {
                    console.log(res, 'get');

                    return result(res);
                }
            })
        }
    }
}