var express = require('express');

var db = require('./models');

function seedDb(){
    
    var todoList = [
        {
            name: 'This is one element',
            completed: false,
            created_date: Date.now()
        }    
    
    ]
    
    db.Todo.remove()
    .then(function(){
        db.Todo.create(todoList)
        .then(function(){
            console.log("db seeded")   
        });
    });

}

module.exports = seedDb;
