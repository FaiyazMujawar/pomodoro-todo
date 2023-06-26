import { TodoInput } from '@graphql/resolvers/types';
import { Todo } from '@prisma/client';
import { Button, DatePicker, Input, Modal, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, useEffect, useState } from 'react';
import { createTodoMutation, updateTodoMutation } from './ApolloQueries';
import useMutation from '@/hooks/useMutation';
import { useTodos } from '@/context/TodoContext';

type ModalType = 'Edit' | 'Create';

// TODO: update todo list UI when updating any particular todo

interface EditTodoModalProps {
  data?: Todo;
  type?: ModalType;
  show: boolean;
  onClose: () => unknown;
}

const EditTodoModal = ({
  type = 'Create',
  data = undefined,
  show,
  onClose,
}: EditTodoModalProps) => {
  if (type === 'Edit' && (data === null || data === undefined)) {
    throw new Error('Data must be provided for edit modal');
  }

  const { todos, setTodos } = useTodos();

  const {
    operation: updateTodo,
    result: { loading: updatingTodo, data: updatedTodo },
  } = useMutation(updateTodoMutation);

  const {
    operation: createTodo,
    result: { loading: creatingTodo, data: newTodo },
  } = useMutation(createTodoMutation);

  useEffect(() => {
    if (
      updatingTodo === false &&
      updatedTodo !== undefined &&
      updatedTodo !== null
    ) {
      todos.splice(todos.findIndex(({ id: _id }) => _id === data?.id));
      setTodos(todos);
      onClose();
    }
  }, [updatingTodo]);

  const initValue: TodoInput = {
    title: data?.title ?? '',
    description: data?.title ?? '',
    dueDate: data?.dueDate ?? new Date(),
  };
  const [todo, setTodo] = useState<TodoInput>(initValue);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  }

  function handleSubmit() {
    if (type === 'Create') {
      createTodo({ todo });
    } else {
      updateTodo({ id: data!.id, update: todo });
    }
  }

  return (
    <Modal
      open={show}
      title={type === 'Create' ? 'Add Todo' : 'Edit Todo'}
      centered
      onCancel={onClose}
      maskClosable={false}
      destroyOnClose={true}
      footer={[
        <Button
          key={1}
          type='primary'
          htmlType='submit'
          loading={creatingTodo || updatingTodo}
          onClick={handleSubmit}
        >
          {type === 'Create' ? 'Add' : 'Update'}
        </Button>,
      ]}
    >
      <div>
        <div className='flex mb-2'>
          <Input
            className='w-3/4 mr-2'
            value={todo.title}
            name='title'
            placeholder='Enter title...'
            onChange={handleChange}
          />
          <DatePicker
            name='dueDate'
            onChange={(e) => {
              if (e !== undefined && e !== null) {
                setTodo({
                  ...todo,
                  dueDate: new Date(e.toString()),
                });
              }
            }}
          />
        </div>
        <TextArea
          rows={6}
          name='description'
          placeholder='Enter description...'
          onChange={handleChange}
          value={todo.description}
        />
      </div>
    </Modal>
  );
};

export default EditTodoModal;
