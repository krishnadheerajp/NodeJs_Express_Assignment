const express = require('express');
const { Client } = require('pg');
const path = require('path');
var bodyParser = require("body-parser");
const connectionString = 'postgres://postgres:Finserv@2023@localhost:5432/mydatabase';
const client = new Client({
    connectionString: connectionString
});
client.connect();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 5000);

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/update', function (req, res, next) {
    res.sendFile(path.join(__dirname, '/updateform.html'));
});

app.get('/delete', function (req, res, next) {
    res.sendFile(path.join(__dirname, '/deleteform.html'));
});

app.post('/updatesal', function (req, res, next) {
    var empid=parseInt(req.body.empidval);
    var newsal=parseInt(req.body.newsalary);
    client.query(`UPDATE EmpTable set salary='${newsal}' where EmpId='${empid}'`, function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send("Updated Successfully");
        });
    });

app.post('/deleteemp', function (req, res, next) {
    var empid=parseInt(req.body.empidval);
client.query(`DELETE from EmpTable where empid='${empid}'`, function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send("Deleted successfully");
    });
});


app.get('/show', function (req, res, next) {
    client.query("SELECT * FROM EmpTable", function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        });
    });
    
    app.listen(5000, function () {
        console.log('Server is running.. on Port 5000');
    });