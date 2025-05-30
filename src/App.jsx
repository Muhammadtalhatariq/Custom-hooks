import React from "react";
import useGetRequest from "./hooks/UsegetRequest";
import usePutRequest from "./hooks/UsePutRequest";
import useDeleteRequest from "./hooks/UseDeleteRequest";
import usePatchRequest from "./hooks/UsePatchRequest";
import Loading from "./components/Loading";
import { Link } from "react-router-dom";

const App = () => {
  //  get mathod
  const {
    data: posts,
    isLoading: loadingGet,
    error: errorGet,
  } = useGetRequest("https://jsonplaceholder.typicode.com/posts");

  // put method
  const {
    execute: putRequest,
    data: updatedPost,
    isLoading: loadingPut,
    error: errorPut,
  } = usePutRequest();

  // patch method
  const {
    execute: patchRequest,
    data: patchedPost,
    isLoading: loadingPatch,
    error: errorPatch,
  } = usePatchRequest();

  // delete method
  const {
    execute: deleteRequest,
    data: deletedPost,
    isLoading: loadingDelete,
    error: errorDelete,
  } = useDeleteRequest();

  const handleUpdate = (id) =>
    putRequest(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      id,
      title: "Updated",
      body: "Updated content",
      userId: 1,
    });
  const handlePatch = (id) =>
    patchRequest(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      title: "Patched Title",
    });
  const handleDelete = (id) =>
    deleteRequest(`https://jsonplaceholder.typicode.com/posts/${id}`);

  return (
    <>
      <div className="p-4 bg-gray-100 w-full">
        <div className="get-method ">
          <h2 className="text-center text-2xl font-bold">Posts Manager</h2>
          <div className="flex justify-end ">
            <Link
              to="/addpost"
              className="p-3 bg-green-400 roundrd-lg text-white font-semibold md:m-7 cursor-pointer"
            >
              Add Post
            </Link>
          </div>
          {loadingGet && <Loading />}
          {errorGet && (
            <p className="text-red-500 font-semibold text-center">{errorGet}</p>
          )}
          <div className="w-full flex gap-4 flex-wrap my-4 items-center justify-center">
            {posts &&
              posts.slice(0, 12).map((post) => (
                <div
                  key={post.id}
                  className=" border border-black rounded-xl gap-4 p-4 flex flex-col w-96"
                >
                  <div className="p-2 space-y-2 ">
                    <div>
                      {" "}
                      <span className="font-bold text-xl">Titlt : </span>
                      {post.title}
                    </div>
                    <div>
                      <span className="font-bold text-xl">Body : </span>{" "}
                      {post.body}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="bg-green-500 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold"
                      onClick={() => handleUpdate(post.id)}
                    >
                      Put
                    </button>
                    <button
                      className="bg-green-600 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold"
                      onClick={() => handlePatch(post.id)}
                    >
                      Patch
                    </button>
                    <button
                      className="bg-red-600 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="my-10 text-center">
          <h2 className="text-center font-medium text-2xl">
            Results of Operations
          </h2>
          {loadingPut && <Loading />}
          {errorPut && (
            <p className="text-red-500 font-semibold text-center">{errorPut}</p>
          )}
          {updatedPost && (
            <p className="pt-10">Updated Post: {JSON.stringify(updatedPost)}</p>
          )}

          {loadingPatch && <Loading />}
          {errorPatch && (
            <p className="text-red-500 font-semibold text-center">
              {errorPatch}
            </p>
          )}
          {patchedPost && (
            <p className="pt-10">Patched Post: {JSON.stringify(patchedPost)}</p>
          )}

          {loadingDelete && <Loading />}
          {errorDelete && (
            <p className="text-red-500 font-semibold text-center">
              {errorDelete}
            </p>
          )}
          {deletedPost && (
            <p className="pt-10">Deleted Post: {JSON.stringify(deletedPost)}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
