const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var cors = require('cors');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());


var con = mysql.createConnection({
    // properties
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'hospitaldb'
});
con.connect(function (error) {
    if (!!error) {
        console.log('Error');
    } else {
        console.log('Connected'); 
    }
    app.post('/add', (req, res) => {
        //res.send('Hello World');

        var pname = req.body.namep;
        var pid = req.body.idp;
        var ppass = req.body.passp;
        var dname = req.body.named;
        var dpmed = req.body.meddp;
        var date = req.body.date1;

        var sql = 'INSERT INTO haspitaltb (pname,pid,ppass,dname,dpmed,date) VALUES ("' + pname + '","' + pid + '","' + ppass + '","' + dname + '","'+ dpmed + '"," '+ date +'")';

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

    });
    /*
    app.post('/add1', (req, res) => {
        //res.send('Hello World');

        var plang = req.body.plang;
        var cgpa = req.body.cgpa;
        var experience = req.body.experience;
        var expsal = req.body.expsal;

        var sql = 'INSERT INTO hospitaltb(plang,cgpa,experience,expsal) VALUES ("' + plang + '","' + cgpa + '","' + experience + '","' + expsal + '")';

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

    });

    app.post('/adds', (req, res) => {
        //res.send('Hello World');

        var Company = req.body.name1;
        var Require = req.body.degree1;
        var Email = req.body.email1;

        var sql = 'INSERT INTO CompanyTB (Company,Requirements,Email) VALUES ("' + Company + '","' + Require + '","' + Email + '")';

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

    });
    */
    app.get('/getUser', (req, res) => {
        


        var sql = 'SELECT * FROM hospitaltb ';

        con.query(sql, function (err, result) {
            res.send(result)

            console.log(sql);
        });
    })
    /*
    app.get('/getUser', (req, res) => {
        


        var sql = 'SELECT * FROM detailstb ';

        con.query(sql, function (err, result) {
            res.send(result)

            console.log(sql);
        });
    })
    app.get('/getUsers', (req, res) => {


        var sql = `SELECT * FROM CompanyTB  `

        con.query(sql, function (err, result) {
            res.send(result)

            console.log(sql);
        });
    })
*/

});



const port1 = process.env.PORT || 3000;
var server = app.listen(port1, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})