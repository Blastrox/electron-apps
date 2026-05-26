import { PrismaClient } from '@prisma/client';
import type { Todo } from '../../shared/todo.js';

export type { Todo };

const prisma = new PrismaClient();

// ─── Lire toutes les tâches ────────────────────────────────────

export async function getTodos(): Promise<Todo[]> {
    return prisma.todo.findMany({
        orderBy: { id: 'asc' },
    });
}

// ─── Ajouter une tâche ─────────────────────────────────────────

export async function addTodo(text: string): Promise<Todo> {
    return await prisma.todo.create({
        data: { text, done: false },
    });
}

// ─── Basculer done/undone ──────────────────────────────────────

export async function toggleTodo(id: number): Promise<Todo> {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new Error(`Todo ${id} introuvable`);
    return await prisma.todo.update({
        where: { id },
        data: { done: !todo.done },
    });
}

// ─── Supprimer une tâche ───────────────────────────────────────

export async function deleteTodo(id: number): Promise<void> {
    await prisma.todo.delete({ where: { id } });
}

// ─── Tout cocher / tout décocher (TRANSACTION) ────────────────
//
// Une transaction garantit l'atomicité :
//   - soit TOUTES les tâches sont mises à jour
//   - soit AUCUNE ne l'est (en cas d'erreur)
//
// Logique :
//   - Si toutes les tâches sont déjà done=true  → on passe tout à false
//   - Sinon (au moins une est false)            → on passe tout à true

export async function toggleAll(): Promise<Todo[]> {
    return await prisma.$transaction(async (tx) => {
        // 1. Lire l'état actuel de toutes les tâches (dans la transaction)
        const all = await tx.todo.findMany();

        // 2. Décider la nouvelle valeur : tout vrai si au moins un est faux
        const allDone = all.length > 0 && all.every(t => t.done);
        const newDone = !allDone;

        // 3. Mettre à jour TOUTES les tâches en une seule opération atomique
        await tx.todo.updateMany({
            data: { done: newDone },
        });

        // 4. Retourner la liste mise à jour (toujours dans la transaction)
        return tx.todo.findMany({ orderBy: { id: 'asc' } });
    });
}

// ─── Fermer la connexion ───────────────────────────────────────

export async function closeDb(): Promise<void> {
    await prisma.$disconnect();
}
