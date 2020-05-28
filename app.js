const gantiHeader = title => {
	if(typeof title === 'string'){
	const heading = document.querySelector(".heading-title");
	heading.innerHTML = title;
	} else {
		console.error("Tipe selain string tidak diijinkan")
	}
}
gantiHeader("Javascript");

const heading2 = document.querySelector("#heading-title2");
heading2.textContent = "Fundamental";
//----------------------------------------------------------

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

immediateLoadEventListener();

function immediateLoadEventListener() {
	document.addEventListener("DOMContentLoaded",getTodos);
	todoForm.addEventListener("submit",addTodo);
	todoList.addEventListener("click",deleteTodo);
	clearButton.addEventListener("click",clearTodos);
	filterInput.addEventListener("keyup",filterTodos);
}

function getItemFromLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function createTodoElement(value) {
	const li = document.createElement("li");
	li.className = "todo-item list-group-item d-flex justify-content-between align-items-center mb-1";

	li.appendChild(document.createTextNode(value));
	
	const a = document.createElement("a");
	a.href = "#"
	a.className = "badge badge-danger delete-todo"
	a.innerHTML = "Delete"

	li.appendChild(a);

	//-------
	todoList.appendChild(li);
}

function getTodos() {
	const todos = getItemFromLocalStorage();

	todos.forEach((todo) => {
		createTodoElement(todo);
	})
}

function addTodo(e) {
	if(todoInput.value) {
	e.preventDefault();

	createTodoElement(todoInput.value);

	addTodoLocalStorage(todoInput.value);

	todoInput.value = "";
	} else {
		alert("Harus Isi Text!")
	}
}

function addTodoLocalStorage() {
	const todos = getItemFromLocalStorage();

	todos.push(todoInput.value);

	localStorage.setItem("todos",JSON.stringify(todos));
}

function deleteTodo(e) {
	e.preventDefault();

	if(e.target.classList.contains("delete-todo")) {
		if(confirm("Apakah yakin ingin dihapus ?")) {
		const parent = e.target.parentElement;

		parent.remove();
		deleteTodoLocalStorage(parent);
		}
	}
}

function deleteTodoLocalStorage(deleteTodoValue) {
  let todos = getItemFromLocalStorage();

  todos.forEach((todo, index) => {
    if (deleteTodoValue.firstChild.textContent === todo) {
      todos.splice(index, 1);
    }
  });

  setItemToLocalStorage(todos);
}

function setItemToLocalStorage(item) {
  localStorage.setItem("todos", JSON.stringify(item));
}

function clearTodos() {
	todoList.innerHTML = "";
	clearTodosLocalStorage();
}

function clearTodosLocalStorage() {
	localStorage.clear();
}

function filterTodos(e) {
	const filterText = e.target.value.toLowerCase();
	const todoItems = document.querySelectorAll(".todo-item");

	todoItems.forEach((item) => {
		const itemText = item.firstChild.textContent.toLowerCase();

		if(itemText.indexOf(filterText) != -1){
			item.setAttribute("style","display:block;");
		} else {
			item.setAttribute("style","display:none !important;");
		}
	})
}