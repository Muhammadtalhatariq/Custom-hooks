import React from 'react'
import { Spin } from 'antd';


const Loading = () => {
  return (
    <>
      <div className='flex items-center justify-center pt-10 h-screen'>
        <Spin className='text-center' size="large"> </Spin>
      </div>
    </>
  )
}

export default Loading
