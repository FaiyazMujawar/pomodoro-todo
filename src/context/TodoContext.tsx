import { Todo } from '@prisma/client';
import { createContext, useContext, useState } from 'react';

const TodoContext = createContext<Todo[]>([]);
const TodoContextUpdate = createContext<(todo: Todo[]) => unknown>(() => {});

export function useTodos() {
  const todos = useContext(TodoContext);
  const setTodos = useContext(TodoContextUpdate);
  return { todos, setTodos };
}

export default function TodoContextProvider(props: any) {
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <TodoContext.Provider value={todos}>
      <TodoContextUpdate.Provider
        value={(data) => {
          setTodos(data);
        }}
      >
        {props.children}
      </TodoContextUpdate.Provider>
    </TodoContext.Provider>
  );
}
