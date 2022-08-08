import type { NextPage } from "next";
import MarkdownEditor from "@/components/MarkdownEditor";
import DefaultEditorContext from "@/context/editorContext";
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

  // const selectedTags = tags => console.log(tags);

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
      tags: data.tags,
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session?.role === "MEMBER") {
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
                  id="headimage"
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
                  id="author"
                  {...register("author")}
                  placeholder="Author Name"
                  required
                />
                <label className="my-2" htmlFor="tags">
                  Tags
                </label>
                <input
                  className="p-2"
                  type="text"
                  id="tags"
                  {...register("tags")}
                  placeholder="Add tags as comma seperated values(max: 3)"
                  required
                />
              </div>

              <div className="p-2 my-4 border-2 border-cyan-700 rounded w-fit">
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
          <MarkdownEditor />
        </div>
      </DefaultEditorContext.Provider>
    );
  }
  return <div>Please Login</div>;
};

export default Create;
