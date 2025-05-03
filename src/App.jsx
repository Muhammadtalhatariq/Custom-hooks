import React from 'react';
import useGetRequest from './hooks/useGetRequest';
import usePostRequest from './hooks/usePostRequest';
import usePutRequest from './hooks/usePutRequest';
import useDeleteRequest from "./hooks/UseDeleteRequest"
import usePatchRequest from "./hooks/UsePatchRequest"
const App = () => {

  const { data: posts, loading: loadingGet, error: errorGet } = useGetRequest('https://jsonplaceholder.typicode.com/posts');
  const { postRequest, data: newPost, loading: loadingPost, error: errorPost } = usePostRequest();
  const { putRequest, data: updatedPost, loading: loadingPut, error: errorPut } = usePutRequest();
  const { patchRequest, data: patchedPost, loading: loadingPatch, error: errorPatch } = usePatchRequest();
  const { deleteRequest, data: deletedPost, loading: loadingDelete, error: errorDelete } = useDeleteRequest();

  const handleAdd = () => postRequest('https://jsonplaceholder.typicode.com/posts', { title: 'New Post', body: 'Content of bofy', userId: 1 });
  const handleUpdate = id => putRequest(`https://jsonplaceholder.typicode.com/posts/${id}`, { id, title: 'Updated', body: 'Updated content', userId: 1 })
  const handlePatch = id => patchRequest(`https://jsonplaceholder.typicode.com/posts/${id}`, { title: 'Patched Title' });
  const handleDelete = id => deleteRequest(`https://jsonplaceholder.typicode.com/posts/${id}`);
  console.log(newPost, updatedPost, patchedPost, deletedPost);

  return (
    <>
      <div className='p-4 bg-gray-200 w-full'>
        <div className=' pt-4  gap-8'>
          <h2 className='text-center text-2xl font-bold'>GET Posts</h2>
          {loadingGet && <p className='text-center '>Loading posts...</p>}
          {errorGet && <p style={{ color: 'red' }}>{errorGet}</p>}
          <div className='w-full flex gap-4 flex-wrap my-8 items-center justify-center'>
            {posts && posts.slice(0, 10).map(post => (
              <div key={post.id} className=' border border-black gap-4 p-4 flex flex-col w-96 h-72'>
                <div className='p-2 space-y-4 '>
                  <div> <span className='font-bold text-xl'>Titlt : </span>{post.title}</div>
                  <div><span className='font-bold text-xl'>Decs : </span> {post.body}</div>
                </div>
                <div className='flex gap-4'>
                  <button className='bg-green-500 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold' onClick={() => handleUpdate(post.id)}>PUT</button>
                  <button className='bg-green-500 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold' onClick={() => handlePatch(post.id)}>PATCH</button>
                  <button className='bg-green-500 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold' onClick={() => handleDelete(post.id)}>DELETE</button></div>
              </div>
            ))}
          </div>
        </div>

        <section className='flex items-center justify-center flex-col'>
          <h2 className='text-center text-2xl font-bold py-6'>New Post</h2>
          <button className='bg-green-500 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold' onClick={handleAdd}>Add Post</button>
          {loadingPost && <p>Posting...</p>}
          {errorPost && <p style={{ color: 'red' }}>{errorPost}</p>}
          {newPost && <p>Created New post: {JSON.stringify(newPost)}</p>}
        </section>

        <section className='my-10 text-center'>
          <h2 className='text-center font-medium text-2xl'>Results of Operations</h2>
          {loadingPut && <p>Updating...</p>}
          {errorPut && <p style={{ color: 'red' }}>{errorPut}</p>}
          {updatedPost && <p>Updated Post: {JSON.stringify(updatedPost)}</p>}


          {loadingPatch && <p>Patching...</p>}
          {errorPatch && <p style={{ color: 'red' }}>{errorPatch}</p>}
          {patchedPost && <p>Patched Post: {JSON.stringify(patchedPost)}</p>}

          {loadingDelete && <p>Deleting...</p>}
          {errorDelete && <p style={{ color: 'red' }}>{errorDelete}</p>}
          {deletedPost && <p>Deleted Post: {JSON.stringify(deletedPost)}</p>}
        </section>
      </div>


    </>
  )



}


export default App
