'use client';

import TodoCard from './TodoCard';
import { getAllTodosQuery } from './ApolloQueries';
import { Todo } from '@prisma/client';
import Loading from './LoadingComponent';
import { useTodos } from '@/context/TodoContext';
import { useEffect } from 'react';
import useQuery from '@/hooks/useQuery';

const TodoList = () => {
  const { loading, data } = useQuery<{ getAllTodos: Todo[] }>(getAllTodosQuery);
  const { todos, setTodos } = useTodos();

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setTodos(data.getAllTodos);
    }
  }, [data]);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className='todo-list'>
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
};

export default TodoList;
