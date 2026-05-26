import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';


// DATABASE_URL AVANT l'import de PrismaClient
process.env['DATABASE_URL'] = 'file:' + path.join(__dirname, '..', '..', 'prisma', 'todo.db');

import * as db from './repository/todo.repository';

// ─── Fenêtre ───────────────────────────────────────────────────

function createWindow(): void {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    });

    win.loadFile(
        path.join(__dirname, '..', '..', 'renderer/app/dist/app/browser/index.html')
    );
}

app.whenReady().then(async () => {
    createWindow();
});

app.on('before-quit', async () => {
    await db.closeDb();
});

// ─── IPC ───────────────────────────────────────────────────────

ipcMain.handle('get-todos', () => db.getTodos());
ipcMain.handle('add-todo', (_e, text: string) => db.addTodo(text));
ipcMain.handle('toggle-todo', (_e, id: number) => db.toggleTodo(id));
ipcMain.handle('delete-todo', (_e, id: number) => db.deleteTodo(id));
ipcMain.handle('toggle-all', () => db.toggleAll());
