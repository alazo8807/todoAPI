$(document).ready(function(){
   $.getJSON('/api/todos')
   .then(addTodos)
   
//   Add event listener when hit enter to create new todo
    $("#todoInput").keypress(function(event){
        if (event.which === 13) {
            createTodo();
        }
    })

});

// Creates a new list item per todo element
function addTodos(todos) {
    todos.forEach(function(val){
        addTodoToList(val);    
    })
}

// Add a single todo item to the page
function addTodoToList(todo){
    var newTodo = $("<li class='task'>" + todo.name + "</li>");
    if(todo.completed){
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);    
}

// Saves in the database the new item and adds it to the page
function createTodo(){
    var todoText = $('#todoInput').val();
    $.post('/api/todos', {name: todoText})
    .then(function(todoCreated){
        addTodoToList(todoCreated);
        
        // clear the input
        $('#todoInput').val('');
    })
    .catch(function(err){
        console.log(err);
    })
}