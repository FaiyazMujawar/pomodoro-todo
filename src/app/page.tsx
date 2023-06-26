'use client';

import CreateTodoModal from '@/components/CreateTodoModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TodoList from '@/components/TodoList';
import TodoContextProvider from '@/context/TodoContext';
import { Button } from 'antd';
import Input from 'antd/es/input/Input';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

export default function Home() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <TodoContextProvider>
      <div>
        <div className='sticky top-0 mb-2'>
          <Header />
          <div className='m-auto py-4' style={{ backdropFilter: 'blur(2px)' }}>
            <div className='w-1/3  m-auto flex justify-between'>
              <div className='w-full mr-2'>
                <Input
                  size='large'
                  addonBefore={<BiSearch size={'20px'} />}
                  placeholder='Search todos...'
                />
              </div>
              <Button
                size='large'
                type='primary'
                color='#e6f9af'
                onClick={() => setShowCreateModal(true)}
              >
                Add New
              </Button>
              <CreateTodoModal
                show={showCreateModal}
                onClose={() => {
                  setShowCreateModal(false);
                }}
              />
            </div>
          </div>
        </div>
        <div className='w-4/5 m-auto mb-4'>
          <TodoList />
        </div>
        <Footer />
      </div>
    </TodoContextProvider>
  );
}
