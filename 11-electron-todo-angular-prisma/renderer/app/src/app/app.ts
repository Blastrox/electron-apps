import { TodoService } from './services/todo.service';
import { Todo } from '../../types/electron';
import { Component, OnInit, signal } from '@angular/core';
import { TodoItem } from './component/todo-item/todo-item';

@Component({
  selector: 'app-root',
  imports: [TodoItem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  todos = signal<Todo[]>([]);
  newText = signal('');

  constructor(private TodoService: TodoService) { }

  ngOnInit(): void {
    this.load();
  }

  async load(): Promise<void> {
    this.todos.set(await this.TodoService.getTodos());
  }

  async add(): Promise<void> {
    if (this.newText().trim() === '') return; // ne rien faire si le champ est vide ou ne contient que des espaces
    await this.TodoService.addTodo(this.newText());
    this.newText.set(''); // réinitialiser le champ
    await this.load(); // recharger la liste
  }

  async toggleAll(): Promise<void> {
    // La transaction retourne directement la liste mise à jour
    // On l'applique au signal — pas besoin de recharger depuis la DB
    this.todos.set(await this.TodoService.toggleAll());
  }

  async toggle(id: number): Promise<void> {
    await this.TodoService.toggleTodo(id);
    await this.load(); // recharger la liste
  }

  async delete(id: number): Promise<void> {
    await this.TodoService.deleteTodo(id);
    await this.load(); // recharger la liste
  }
}

