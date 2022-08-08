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
      tags: tags,
    });
  };

  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      if (poppedTag) {
        setInput(poppedTag);
      }
    }

    setIsKeyReleased(false);
  };

  const deleteTag = (index: number) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
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

              <div className="p-2 m-4 border-2 border-cyan-700 rounded-xl w-fit">
                <button type="submit">Save</button>
              </div>
            </div>
            <div className="p-4 m-4">
              {tags.map((tag, index) => (
                <div
                  className="flex gap-8 m-4 w-fit p-2 rounded-xl bg-red-300"
                  key={index}
                >
                  {tag}
                  <button onClick={() => deleteTag(index)}>X</button>
                </div>
              ))}
              <input
                className="border-2 border-cyan-700 p-2"
                value={input}
                placeholder="Enter a tag"
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={onChange}
              />
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
