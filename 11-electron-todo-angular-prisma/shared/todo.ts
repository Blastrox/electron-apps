// ─── Type partagé entre Main Process et Renderer ──────────────
//
// Ce fichier est la source de vérité unique pour le type Todo
// et l'interface ElectronAPI.
//
// Il est importé par :
//   - src/repository/todo.repository.ts  (Main Process)
//   - src/preload.ts                     (Preload)
//   - renderer/app/...                   (Angular — via tsconfig.app.json)

export interface Todo {
    id: number;
    text: string;
    done: boolean;
}

export interface ElectronAPI {
    getTodos: () => Promise<Todo[]>;
    addTodo: (text: string) => Promise<Todo>;
    toggleTodo: (id: number) => Promise<Todo>;
    deleteTodo: (id: number) => Promise<void>;
    toggleAll: () => Promise<Todo[]>;
}


