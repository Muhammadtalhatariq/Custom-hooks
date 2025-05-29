import React from "react";
import usePostRequest from "../hooks/UsepostRequest";
import { validate } from "../Validation";
import { Formik, Form, Field, ErrorMessage } from "formik";
const AddPost = () => {
  // post method
  const {
    execute: postRequest,
    data: newPost,
    isLoading: loadingPost,
    error: errorPost,
  } = usePostRequest();
  return (
    <>
      <div className="post-method flex items-center justify-center flex-col text-center">
        <h2 className="text-center text-2xl font-bold py-6">New Post</h2>
        <Formik
          initialValues={{ title: "", body: "" }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            postRequest({
              title: values.title,
              body: values.body,
              userId: 1,
            });
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col text-start">
                <label className=" text-gray-700 mb-1 font-medium">
                  Title :{" "}
                </label>
                <Field
                  name="title"
                  type="text"
                  className={`p-1 border rounded-md w-80 outline-none  `}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex flex-col text-start">
                <label className=" text-gray-700 mb-1 font-medium ">
                  Content :{" "}
                </label>
                <Field
                  name="body"
                  as="textarea"
                  className={`p-1 border rounded-md w-80 outline-none  `}
                  rows="3"
                />
                <ErrorMessage
                  name="body"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-green-500 py-2 px-4 rounded-lg cursor-pointer text-white font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "creating.." : "Add Post"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {loadingPost && <Loading />}
        {errorPost && (
          <p className="text-red-500 font-semibold text-center">{errorPost}</p>
        )}
        {newPost && (
          <p className="pt-10">Created New post: {JSON.stringify(newPost)}</p>
        )}
      </div>
    </>
  );
};

export default AddPost;
