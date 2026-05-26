import { Todo } from '../../../../types/electron';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {

  // ─── @Input : données reçues du composant parent ───────────
  @Input() todo!: Todo;
  // Le ! (non-null assertion) dit à TypeScript :
  // "je garantis que todo sera fourni avant l'utilisation"

  // ─── @Output : événements envoyés au composant parent ──────
  @Output() toggled = new EventEmitter<number>();
  // EventEmitter<number> : émettra un id (number) au parent

  @Output() deleted = new EventEmitter<number>();
  // EventEmitter<number> : émettra un id (number) au parent

  // ─── Méthodes ───────────────────────────────────────────────
  onToggle(): void {
    this.toggled.emit(this.todo.id);  // envoie l'id au parent
  }

  onDelete(): void {
    this.deleted.emit(this.todo.id);  // envoie l'id au parent
  }
}
