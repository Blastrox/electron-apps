import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItem } from './todo-item';

describe('TodoItem', () => {
  let component: TodoItem;
  let fixture: ComponentFixture<TodoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItem);
    component = fixture.componentInstance;
    // Initialisation de l'@Input obligatoire avant le rendu du template
    component.todo = { id: 1, text: 'Tâche de test', done: false };
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
