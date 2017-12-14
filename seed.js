var express = require('express');

var db = require('./models');

function seedDb(){
    
    var todoList = [
        {
            name: 'Buy a car',
            completed: false,
            created_date: Date.now()
        },
        {
            name: 'Buy a house',
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
