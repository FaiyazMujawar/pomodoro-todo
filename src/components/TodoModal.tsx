'use client';

import { Modal, Popconfirm, Tag, notification } from 'antd';
import { differenceInDays, format, isAfter } from 'date-fns';
import { Todo } from '@prisma/client';
import { getTodoStatusColor } from './TodoCard';
import { useTodos } from '@/context/TodoContext';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import useMutation from '@/hooks/useMutation';
import {
  deleteTodoMutation,
  getTodoById,
  markTodoAsDone,
} from './ApolloQueries';
import { useEffect, useState } from 'react';
import Loading from './LoadingComponent';
import useLazyQuery from '@/hooks/useLazyQuery';

interface TodoMdodalProps {
  id: string;
  show: boolean;
  onClose: () => unknown;
  onClickUpdate: () => unknown;
}

const TodoModal = ({ id, onClose, show, onClickUpdate }: TodoMdodalProps) => {
  const { todos, setTodos } = useTodos();
  // const [todo, setTodo] = useState<Todo | undefined>(undefined);

  const {
    operation: getTodo,
    result: { loading, data: response },
  } = useLazyQuery<{ getTodoById: Todo }>(getTodoById);
  const {
    operation: deleteTodo,
    result: { loading: deleting, data },
  } = useMutation(deleteTodoMutation);
  const {
    operation: markAsDone,
    result: { loading: markingAsDone },
  } = useMutation(markTodoAsDone);

  // whenever modal loads, make API call
  useEffect(() => {
    if (show) {
      getTodo({ id });
    }
  }, [show]);

  // when deleting todo
  useEffect(() => {
    if (deleting === false && data !== undefined && data !== null) {
      setTodos(todos.filter(({ id: _id }) => _id !== id));
      notification.success({ message: 'Todo deleted successfully!' });
      onClose();
    }
  }, [deleting]);

  // when marking as done
  useEffect(() => {
    if (markingAsDone === false) {
      onClose();
    }
  }, [markingAsDone]);

  if (loading === true || loading === undefined) {
    return (
      <Modal onCancel={onClose} open={show} footer={null}>
        <Loading />
      </Modal>
    );
  }

  return (
    <Modal
      title={response!.getTodoById?.title ?? 'Title'}
      open={show}
      onCancel={onClose}
      centered
      destroyOnClose
      footer={null}
    >
      <div className='tags my-2'>
        <Tag>
          {response!.getTodoById!.isComplete
            ? `Completed on ${format(
                new Date(response!.getTodoById!.completedAt!),
                'd LLL, yyyy'
              )}`
            : `Due on ${format(
                new Date(response!.getTodoById!.dueDate),
                'd LLL, yyyy'
              )}`}
        </Tag>
        <Tag color={getTodoStatusColor(response!.getTodoById!)}>
          {getTodoText(response!.getTodoById!)}
        </Tag>
      </div>
      <p>{response!.getTodoById?.description ?? 'No description provided'}</p>
      <div className='actions mt-2'>
        <IoCheckmarkDoneOutline
          size={'20px'}
          className='mr-2 cursor-pointer'
          color='green'
          onClick={() => {
            markAsDone({ id });
          }}
        />
        <AiOutlineEdit
          size={'20px'}
          className='mr-2 cursor-pointer'
          color='gray'
          onClick={onClickUpdate}
        />
        <Popconfirm
          title={'Delete this todo?'}
          onConfirm={() => {
            deleteTodo({ id });
          }}
          onCancel={() => {
            console.log('dont delete');
          }}
          okButtonProps={{ loading: deleting }}
          okText={'Yes'}
          cancelText={'No'}
        >
          <AiOutlineDelete
            size={'20px'}
            className='mr-2 cursor-pointer'
            color='red'
          />
        </Popconfirm>
      </div>
    </Modal>
  );
};

function getTodoText(todo: Todo) {
  const dueOn = new Date(todo.dueDate);
  if (todo.isComplete) return 'Completed';
  const today = new Date();
  if (isAfter(today, dueOn)) return 'Overdue';
  if (differenceInDays(dueOn, today) < 7) return 'Due shortly';
  return 'Pending';
}

export default TodoModal;
