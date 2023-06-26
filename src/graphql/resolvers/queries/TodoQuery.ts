import { prisma } from '@prisma/PrismaClient';
import { Todo } from '@prisma/client';

export async function getAllTodos(): Promise<Todo[]> {
  return await prisma.todo.findMany({ take: 1 });
}

export async function getTodoById(
  _parent: any,
  { id }: { id: string },
  _ctx: any
) {
  try {
    return await prisma.todo.findUnique({ where: { id } });
    // return todo;
  } catch (error: any) {
    if (error.code === 'P2025') {
      console.error('Not found');
    }
    return null;
  }
}
