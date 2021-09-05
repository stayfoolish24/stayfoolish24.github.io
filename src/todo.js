const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input")
const toDoList = document.querySelector("#todo-list");

let toDos = [];
const TODOS_KEY = "toDos";

function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

function deleteTodo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintTodo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function toDoSubmit(event){
    event.preventDefault();
    const newTodoObject = {
        text : toDoInput.value,
        id : Date.now()
    };
    toDoInput.value="";
    toDos.push(newTodoObject);
    paintTodo(newTodoObject);
    saveToDos();
}

toDoForm.addEventListener("submit",toDoSubmit);

const getToDos = localStorage.getItem(TODOS_KEY);

function sayHello(item){
    console.log("hello " + item);
}

if (getToDos !== null ){
    const parsedToDos = JSON.parse(getToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintTodo);
}