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

import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

class TodoUI {
    private collection: TodoCollection;
    private newTaskInput: HTMLInputElement;
    private todoList: HTMLElement;
    private showCompleteCheckbox: HTMLInputElement;

    constructor() {
        this.collection = new TodoCollection("Usuario");
        this.newTaskInput = document.getElementById("newTaskInput") as HTMLInputElement;
        this.todoList = document.getElementById("todoList") as HTMLElement;
        this.showCompleteCheckbox = document.getElementById("showCompleteCheckbox") as HTMLInputElement;

        this.initializeEvents();
        this.displayTodoList();
    }

    private initializeEvents(): void {
        // Evento para agregar tarea
        document.getElementById("addTaskBtn")?.addEventListener("click", () => this.addTask());

        // Evento para mostrar/ocultar tareas completadas
        this.showCompleteCheckbox?.addEventListener("change", () => this.displayTodoList());

        // Evento para eliminar tareas completadas
        document.getElementById("removeCompleteBtn")?.addEventListener("click", () => {
            this.collection.removeComplete();
            this.displayTodoList();
        });
    }

    private addTask(): void {
        if (this.newTaskInput.value.trim() !== "") {
            this.collection.addTodo(this.newTaskInput.value);
            this.newTaskInput.value = "";
            this.displayTodoList();
        }
    }

    private toggleComplete(id: number, complete: boolean): void {
        this.collection.markComplete(id, complete);
        this.displayTodoList();
    }

    private displayTodoList(): void {
        if (!this.todoList) return;

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
                this.toggleComplete(item.id, (e.target as HTMLInputElement).checked);
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

    private createCell(text: string): HTMLTableCellElement {
        const cell = document.createElement("td");
        cell.textContent = text;
        return cell;
    }
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    new TodoUI();
});