const toDoform = document.querySelector(".js-toDoForm"),
    toDoInput = toDoform.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // local store can only save strings.
}

function paintToDos(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");    
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "DELETE";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDos(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDos(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoform.addEventListener("submit", handleSubmit);
}

init();