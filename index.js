var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos');

var seedDb = require('./seed');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// seedDb();

app.get('/', function(req, res){
    res.send("got you");
});

app.use('/api/todos', todoRoutes);


app.listen(process.env.PORT, function(){
    console.log("Server running");
})

