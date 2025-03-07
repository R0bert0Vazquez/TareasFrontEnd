// import { TodoItem } from "./todoItem";
// import { TodoCollection } from "./todoCollection";
// let todos: TodoItem[] = [
//   new TodoItem(1, "Buy Flowers"), new TodoItem(2, "Get Shoes"),
//   new TodoItem(3, "Collect Tickets"), new TodoItem(4, "Call Joe", true)];
// let collection: TodoCollection = new TodoCollection("Adam", todos);
// console.clear();
// console.log(`${collection.userName}'s Todo List`);
// collection.removeComplete();
// collection.getTodoItems(true).forEach(item => item.printDetails());
import { TodoCollection } from "./todoCollection.js";
class TodoUI {
    constructor() {
        this.collection = new TodoCollection("Usuario");
        this.newTaskInput = document.getElementById("newTaskInput");
        this.todoList = document.getElementById("todoList");
        this.showCompleteCheckbox = document.getElementById("showCompleteCheckbox");
        this.initializeEvents();
        this.displayTodoList();
    }
    initializeEvents() {
        var _a, _b, _c;
        // Evento para agregar tarea
        (_a = document.getElementById("addTaskBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.addTask());
        // Evento para mostrar/ocultar tareas completadas
        (_b = this.showCompleteCheckbox) === null || _b === void 0 ? void 0 : _b.addEventListener("change", () => this.displayTodoList());
        // Evento para eliminar tareas completadas
        (_c = document.getElementById("removeCompleteBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            this.collection.removeComplete();
            this.displayTodoList();
        });
    }
    addTask() {
        if (this.newTaskInput.value.trim() !== "") {
            this.collection.addTodo(this.newTaskInput.value);
            this.newTaskInput.value = "";
            this.displayTodoList();
        }
    }
    toggleComplete(id, complete) {
        this.collection.markComplete(id, complete);
        this.displayTodoList();
    }
    displayTodoList() {
        if (!this.todoList)
            return;
        this.todoList.innerHTML = "";
        const includeComplete = this.showCompleteCheckbox.checked;
        this.collection.getTodoItems(includeComplete).forEach(item => {
            const row = document.createElement("tr");
            // Columna ID
            row.appendChild(this.createCell(item.id.toString()));
            // Columna Tarea
            row.appendChild(this.createCell(item.task));
            // Columna Estado
            const statusCell = this.createCell("");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = item.complete;
            checkbox.addEventListener("change", (e) => {
                this.toggleComplete(item.id, e.target.checked);
            });
            statusCell.appendChild(checkbox);
            row.appendChild(statusCell);
            // Columna Acciones
            const actionsCell = this.createCell("");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => {
                this.collection.removeTodo(item.id);
                this.displayTodoList();
            };
            actionsCell.appendChild(deleteButton);
            row.appendChild(actionsCell);
            this.todoList.appendChild(row);
        });
    }
    createCell(text) {
        const cell = document.createElement("td");
        cell.textContent = text;
        return cell;
    }
}
// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    new TodoUI();
});
