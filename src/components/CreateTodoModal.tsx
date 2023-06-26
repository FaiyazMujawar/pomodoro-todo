'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Button, DatePicker, Input, Modal, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { createTodoMutation } from './ApolloQueries';
import { TodoInput } from '@graphql/resolvers/types';
import { useTodos } from '@/context/TodoContext';
import { Todo } from '@prisma/client';
import useMutation from '@/hooks/useMutation';

interface CreateTodoModalProps {
  show: boolean;
  onClose: () => unknown;
}

const CreateTodoModal = ({ show, onClose }: CreateTodoModalProps) => {
  const [todoData, setTodoData] = useState<TodoInput>({
    title: '',
    description: '',
    dueDate: new Date(),
  });
  const {
    operation: createTodo,
    result: { loading, data },
  } = useMutation(
    createTodoMutation
    // {
    //   onCompleted: ({ createTodo: newTodo }) => {
    //     setTodos([...todos, newTodo]);
    //     notification.success({
    //       message: 'Todo added successfully!',
    //     });
    //     onClose();
    //   },
    // }
  );
  const { todos, setTodos } = useTodos();

  function handleSubmit() {
    createTodo({ todo: todoData });
  }

  useEffect(() => {
    if (loading === false && data !== undefined && data !== null) {
      setTodos([data!.createTodo, ...todos]);
      notification.success({ message: 'Todo added successfully!' });
      onClose();
    }
  }, [loading]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value, name } = event.target;
    setTodoData({
      ...todoData,
      [name]: value,
    });
  }

  return (
    <div>
      <Modal
        title='Add Todo'
        maskClosable={false}
        open={show}
        centered={true}
        destroyOnClose={true}
        onCancel={onClose}
        footer={[
          <Button
            type='primary'
            htmlType='submit'
            loading={loading}
            onClick={handleSubmit}
          >
            Add
          </Button>,
        ]}
      >
        <div>
          <div className='flex mb-2'>
            <Input
              className='w-3/4 mr-2'
              value={todoData.title}
              name='title'
              onChange={handleChange}
            />
            <DatePicker
              name='dueDate'
              onChange={(e) => {
                if (e !== undefined && e !== null) {
                  setTodoData({
                    ...todoData,
                    dueDate: new Date(e!.toString()),
                  });
                }
              }}
            />
          </div>
          <TextArea
            rows={6}
            name='description'
            onChange={handleChange}
            value={todoData.description}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreateTodoModal;
