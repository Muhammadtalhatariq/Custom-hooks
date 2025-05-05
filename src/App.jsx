import React, { useState } from 'react';
import useGetRequest from './hooks/UsegetRequest';
import usePostRequest from './hooks/UsepostRequest';
import usePutRequest from './hooks/UsePutRequest';
import useDeleteRequest from "./hooks/UseDeleteRequest"
import usePatchRequest from "./hooks/UsePatchRequest"
import Loading from './components/Loading';
import { Formik } from 'formik';
import Input from './components/Input';
import { validation } from './Validation';

const App = () => {
  const [title, settitle] = useState("")
  const [body, setbody] = useState("")

  const objData = {
    title: title,
    body: body,
  }

  const { data: posts, loading: loadingGet, error: errorGet } = useGetRequest('https://jsonplaceholder.typicode.com/posts');
  const { postRequest, data: newPost, loading: loadingPost, error: errorPost } = usePostRequest();
  const { putRequest, data: updatedPost, loading: loadingPut, error: errorPut } = usePutRequest();
  const { patchRequest, data: patchedPost, loading: loadingPatch, error: errorPatch } = usePatchRequest();
  const { deleteRequest, data: deletedPost, loading: loadingDelete, error: errorDelete } = useDeleteRequest();

  const handleAdd = () => postRequest('https://jsonplaceholder.typicode.com/posts', objData);
  const handleUpdate = id => putRequest(`https://jsonplaceholder.typicode.com/posts/${id}`, { id, title: 'Updated', body: 'Updated content', userId: 1 })
  const handlePatch = id => patchRequest(`https://jsonplaceholder.typicode.com/posts/${id}`, { title: 'Patched Title' });
  const handleDelete = id => deleteRequest(`https://jsonplaceholder.typicode.com/posts/${id}`);
  // console.log(newPost, updatedPost, patchedPost, deletedPost);

  return (
    <>
      <div className='p-4 bg-gray-200 w-full'>
        <div className=' pt-4  gap-8'>
          <h2 className='text-center text-2xl font-bold'>Get Posts</h2>
          {loadingGet && <Loading />}
          {errorGet && <p className='text-red-500 font-semibold text-center'>{errorGet}</p>}
          <div className='w-full flex gap-4 flex-wrap my-8 items-center justify-center'>
            {posts && posts.slice(0, 12).map(post => (
              <div key={post.id} className=' border border-black rounded-xl gap-4 p-4 flex flex-col w-96'>
                <div className='p-2 space-y-2 '>
                  <div> <span className='font-bold text-xl'>Titlt : </span>{post.title}</div>
                  <div><span className='font-bold text-xl'>Body : </span> {post.body}</div>
                </div>
                <div className='flex gap-4'>
                  <button className='bg-green-500 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold' onClick={() => handleUpdate(post.id)}>Put</button>
                  <button className='bg-green-600 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold' onClick={() => handlePatch(post.id)}>Patch</button>
                  <button className='bg-red-600 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold' onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center justify-center flex-col text-center'>
          <h2 className='text-center text-2xl font-bold py-6'>New Post</h2>
          {loadingPost && <Loading />}
          {errorPost && <p className='text-red-500 font-semibold text-center'>{errorPost}</p>}

          <div>
            <Formik
              initialValues={{ title: null, body: null }}
              validationSchema={validation}
              onSubmit={(values) => {
                const { title, body } = values
                console.log(title, body);
                setbody(body)
                settitle(title)
              }}
            >
              {props => (
                <form className='flex flex-col space-y-2' onSubmit={props.handleSubmit}>
                  <Input
                    type="text"
                    label="Title :"
                    name="title"
                    className='bg-transparent border border-black md:w-80 w-68 outline-none px-2'
                  />
                  <Input
                    type="text"
                    label="Body :"
                    name="body"
                    className='bg-transparent border border-black md:w-80 w-68 outline-none px-2'
                  />
                <div className='flex justify-end'>
                <button type='submit' className='bg-green-500 py-2 px-4 w-32 rounded-lg cursor-pointer text-white font-semibold' onClick={handleAdd}>Add Post</button>
                </div>
                </form>
              )}
            </Formik>
          </div>

          {newPost && <p className='pt-10'>Created New post: {JSON.stringify(newPost)}</p>}
        </div>
        <div className='my-10 text-center'>
          <h2 className='text-center font-medium text-2xl'>Results of Operations</h2>
          {loadingPut && <Loading />}
          {errorPut && <p className='text-red-500 font-semibold text-center'>{errorPut}</p>}
          {updatedPost && <p className='pt-10'>Updated Post: {JSON.stringify(updatedPost)}</p>}

          {loadingPatch && <Loading />}
          {errorPatch && <p className='text-red-500 font-semibold text-center'>{errorPatch}</p>}
          {patchedPost && <p className='pt-10'>Patched Post: {JSON.stringify(patchedPost)}</p>}

          {loadingDelete && <Loading />}
          {errorDelete && <p className='text-red-500 font-semibold text-center'>{errorDelete}</p>}
          {deletedPost && <p className='pt-10'>Deleted Post: {JSON.stringify(deletedPost)}</p>}
        </div>
      </div>
    </>
  )
}


export default App
