import { contextBridge, ipcRenderer } from 'electron';
import type { ElectronAPI } from '../shared/todo.js';

const api: ElectronAPI = {
    getTodos:   () => ipcRenderer.invoke('get-todos'),
    addTodo:    (text) => ipcRenderer.invoke('add-todo', text),
    toggleTodo: (id) => ipcRenderer.invoke('toggle-todo', id),
    deleteTodo: (id) => ipcRenderer.invoke('delete-todo', id),
    toggleAll:  () => ipcRenderer.invoke('toggle-all'),
};

contextBridge.exposeInMainWorld('api', api);
