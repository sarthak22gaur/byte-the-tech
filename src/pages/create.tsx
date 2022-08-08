import type { NextPage } from "next";
import MarkdownEditor from "@/components/MarkdownEditor";
import DefaultEditorContext from "@/context/editorContext";
import TagsForm from "@/components/Tags";
import Navbar from "@/components/Navbar";

import { trpc, inferMutationInput } from "@/utils/trpc";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Create: NextPage = () => {
  const { data: session, status } = useSession();

  const [markdownText, setMarkdownText] = useState("");
  const editorCtx = {
    markdownText,
    setMarkdownText,
  };

  const { handleSubmit, register } = useForm<createBlog>();
  type createBlog = inferMutationInput<"blogs.createBlog">;

  /*
    Complete onSuccess and onError
  */

  const { mutate, error } = trpc.useMutation(["blogs.createBlog"], {
    onError: (error) => {},
    onSuccess: () => {},
  });

  const onFormSave = (data: createBlog) => {
    mutate({
      title: data.title,
      description: data.description,
      headimage: data.headimage,
      author: data.author,
      content: markdownText,
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session?.role === 'MEMBER') {
    return (
      <DefaultEditorContext.Provider value={editorCtx}>
        <Navbar />
        <div className="h-screen w-full items-center justify-center">
          <div className="p-4">
            <h1>Create blog</h1>
          </div>

          <form
            className="bg-gray-light max-w-lg p-8"
            onSubmit={handleSubmit(onFormSave)}
          >
            <div className="">
              <div className="flex flex-col">
                <label className="my-2" htmlFor="title">
                  Title
                </label>
                <input
                  className="p-2"
                  type="text"
                  id="title"
                  placeholder="Getting started"
                  {...register("title")}
                  required
                />
                <label className="my-2" htmlFor="description">
                  Description
                </label>
                <input
                  className="p-2"
                  type="text"
                  id="description"
                  {...register("description")}
                  placeholder="Description"
                  required
                />
                <label className="my-2" htmlFor="headimage">
                  Header image url
                </label>
                <input
                  className="p-2"
                  type="url"
                  id="description"
                  {...register("headimage")}
                  placeholder="Header image url"
                  required
                />
                <label className="my-2" htmlFor="author">
                  Author Name
                </label>
                <input
                  className="p-2"
                  type="text"
                  id="description"
                  {...register("author")}
                  placeholder="Author Name"
                  required
                />
              </div>
              
              <div className="">
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
          <TagsForm />
          <MarkdownEditor />
        </div>
      </DefaultEditorContext.Provider>
    );
  }
  return <div>Please Login</div>;
};

export default Create;
