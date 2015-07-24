var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var csv = require('ya-csv');

var app = express();
app.use(express.static(path.join(__dirname, "")));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(request, response){
    response.sendFile(path.join(__dirname, "pages/game.html"));
});


app.post('/score', function(request, response){

    var fullName1 = request.body.fullName1;
    var score1 = request.body.score1;
    var fullName2 = request.body.fullName2;
    var score2 = request.body.score2;



    var database1 = csv.createCsvFileWriter("score.csv", {"flags": "a"});
    var data1 = [fullName1, score1];
    database1.writeRecord(data1);
    database1.writeStream.end();


    var database2 = csv.createCsvFileWriter("score.csv", {"flags": "a"});
    var data2 = [fullName2, score2];
    database2.writeRecord(data2);
    database2.writeStream.end();

    response.send(fullName1 + " "+  score1 + " "+ fullName2 +" "+ score2);

});


app.get("/score", function(request, response) {
    var reader = csv.createCsvFileReader("score.csv");
    reader.setColumnNames(['name', 'score']);

    var score = [];
    reader.addListener('data', function(data) {
        score.push(data);
    });

    reader.addListener('end', function(){
        response.send(score);
    })

});


var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Gustos's Mansion listening at http://%s:%s", host, port);
});