var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos');

var seedDb = require('./seed');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

// seedDb();

app.get('/', function(req, res){
    res.sendFile("index.html");
});

// Todo Routes
app.use('/api/todos', todoRoutes);


app.listen(process.env.PORT, function(){
    console.log("Server running");
})

