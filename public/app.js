$(document).ready(function(){
   $.getJSON('/api/todos')
   .then(addTodos)
   
//   Add event listener when hit enter to create new todo
    $("#todoInput").keypress(function(event){
        if (event.which === 13) {
            createTodo();
        }
    })
    
// Add event listener to delete list item
    $('.list').on('click','span', function(e){
        e.stopPropagation();
        removeTodo($(this).parent());   //this refers to the span. The parent is li.
    })
    
// Add event listener to toggle completed status
    $('.list').on('click', 'li', function(){
        completeTodo($(this));  //this refers to the li
    })

});

// Create a new list item per todo element
function addTodos(todos) {
    todos.forEach(function(val){
        addTodoToList(val);    
    })
}

// Add a single todo item to the page
function addTodoToList(todo){
    var newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
    
    newTodo.data('id',todo._id);  //save id
    newTodo.data('completed', todo.completed);  //save completed status
    
    if(todo.completed){
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);    
}

// Saves in the database the new item and adds it to the view
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

// Send ajax request to delete item. Then remove the item from the view.
function removeTodo(todo){
    $.ajax({
        method: 'DELETE',
        url: '/api/todos/' + todo.data('id')
    })
    .then(function(data){
        todo.remove();
        console.log(data)
    })
    .catch(function(error){
        console.log(error)
    })
}

function completeTodo(todo){
    //flip the completed status
    var completedStatus = !todo.data('completed');
    //send the new status to the api
    $.ajax({
      method: 'PUT',
      url: '/api/todos/' + todo.data('id'),
      data: {completed: completedStatus}
    })
    .then(function(data){
        todo.data('completed', completedStatus);
        todo.toggleClass('done');
    })
    .catch(function(err){
        console.log(err);
    })
}