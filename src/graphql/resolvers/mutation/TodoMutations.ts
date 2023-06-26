import { Todo } from '@prisma/client';
import { TodoInput, TodoUpdate } from '../types';
import { prisma } from '@prisma/PrismaClient';

export async function createTodo(
  _parent: any,
  { todo }: { todo: TodoInput },
  _ctx: any
): Promise<Todo> {
  return await prisma.todo.create({ data: todo });
}

export async function deleteTodo(
  _parent: any,
  { id }: { id: string },
  _ctx: any
): Promise<boolean> {
  try {
    return (await prisma.todo.delete({ where: { id } })) !== undefined;
  } catch (error: any) {
    if (error.code === 'P2025') {
      console.error('Not found');
    }
    return false;
  }
}

export async function updateTodo(
  _parent: any,
  {
    id,
    update: { title, description, dueDate },
  }: { id: string; update: TodoUpdate },
  _ctx: any
) {
  try {
    const todo = await prisma.todo.findFirst({ where: { id } });
    if (todo === null || todo === undefined) {
      throw new Error('Not found');
    }
    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.dueDate = dueDate ?? todo.dueDate;

    return await prisma.todo.update({ where: { id }, data: todo });
  } catch (error) {
    throw new Error('Not found');
  }
}

export async function markAsDone(
  _parent: any,
  { id }: { id: string },
  _ctx: any
) {
  await prisma.todo.update({
    where: { id },
    data: { isComplete: true },
  });
}
