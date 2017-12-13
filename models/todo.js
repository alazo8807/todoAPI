var mongoose = require('mongoose');

// Define the Schema of the todo model
var todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: "Please, name cannot be blank" 
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date:{
        type: Date,
        default: Date.now    
    }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;