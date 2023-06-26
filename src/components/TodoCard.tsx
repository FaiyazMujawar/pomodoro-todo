'use client';

import { Todo } from '@prisma/client';
import { format, isAfter, differenceInDays } from 'date-fns';
import { useState } from 'react';
import TodoModal from './TodoModal';
import EditTodoModal from './EditTodoModal';

export interface TodoCardProps {
  todo: Todo;
}

export function getTodoStatusColor(todo: Todo) {
  const dueOn = new Date(todo.dueDate);
  if (todo.isComplete) return 'green';
  const today = new Date();
  if (isAfter(today, dueOn)) return 'red';
  if (differenceInDays(dueOn, today) < 7) return 'orange';
  return '#dee2e6';
}

const TodoCard = ({ todo }: TodoCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <div
        className='todo-card border border-solid border-gray-300 rounded-md hover:shadow-lg p-4 cursor-pointer'
        style={{
          borderLeftColor: getTodoStatusColor(todo),
          borderLeftWidth: '4px',
        }}
        onClick={() => setShowModal(true)}
      >
        <div>{todo.title}</div>
        <div className='mt-2 text-gray-400 text-xs'>
          Due on {format(new Date(todo.dueDate), 'd LLL, yyyy')}
        </div>
      </div>
      <EditTodoModal
        data={todo}
        type='Edit'
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
      <TodoModal
        onClickUpdate={() => {
          setShowModal(false);
          setShowEditModal(true);
        }}
        show={showModal}
        id={todo.id}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default TodoCard;
