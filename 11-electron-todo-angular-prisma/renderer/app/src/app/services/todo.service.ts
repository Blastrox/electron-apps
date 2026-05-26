import { Injectable } from '@angular/core';
import { Todo } from '../../../types/electron';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  constructor(private electronService: ElectronService) { }

  // Lecture
  getTodos(): Promise<Todo[]> {
    return this.electronService.getApi().getTodos();
  }

  //Creation
  addTodo(text: string): Promise<Todo> {
    return this.electronService.getApi().addTodo(text);
  }

  //Toggle
  toggleTodo(id: number): Promise<Todo> {
    return this.electronService.getApi().toggleTodo(id);
  }

  //Toggle All (transaction Prisma)
  toggleAll(): Promise<Todo[]> {
    return this.electronService.getApi().toggleAll();
  }

  //Suppression
  deleteTodo(id: number): Promise<void> {
    return this.electronService.getApi().deleteTodo(id);
  }
}
