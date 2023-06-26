import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className='w-full flex flex-col justify-center'>
      <Spin size='large' />
    </div>
  );
};

export default Loading;
