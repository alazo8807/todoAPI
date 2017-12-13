var express = require('express');
var router = express.Router();
var db = require('../models');  //by default will grab index.js
var helper = require('../helpers/todos');

// The index and the create routes will be defined in the helper module.
// Use router.route to define both routes in a single instruction.
router.route('/')
   .get(helper.getTodos)
   .post(helper.createTodo)

// Rest of the routes in the standard way.
// Show Route
router.get('/:todoId', function(req, res){
   db.Todo.findById(req.params.todoId)
   .then(function(todoFound){
      res.json(todoFound);
   })
   .catch(function(err){
      res.send(err);
   })
});

// Update Route
router.put('/:todoId', function(req, res){
   db.Todo.findOneAndUpdate({_id:req.params.todoId}, req.body, {new:true}) //{n}ew: true} will say to pass the newly updated todo in todoUpdated variable.
   .then(function(todoUpdated){ 
      res.json(todoUpdated);
   })
   .catch(function(err){
      res.send(err);
   })
})

// Delete Route
router.delete('/:todoId', function(req, res){
   db.Todo.remove({_id: req.params.todoId})
   .then(function(){
      res.json({name: "Todo item deleted"});
   })
   .catch(function(err){
      res.send(err);
   })
});

module.exports = router;

