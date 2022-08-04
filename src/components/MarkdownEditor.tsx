import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import MarkDown from "markdown-it";
import DefaultEditorContext from "@/context/editorContext";
import { useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { inferMutationInput } from "@/utils/trpc";

const MarkdownEditor = () => {
  const { markdownText } = useContext(DefaultEditorContext);
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
      content: markdownText,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSave)}>
        <div className="flex gap-8 p-4">
          <div className="w-[50%] grid">
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
          </div>
          <div className="w-[50%] grid">
            <button type="submit">Save</button>
            {/* <button type="submit" onSubmit={onFormPublish}>Publish</button> */}
          </div>
        </div>
        <div className="flex min-h-[50vh] p-4">
          <MarkedInput />
          <MarkedPreview />
        </div>
      </form>
    </>
  );
};

const MarkedInput = () => {
  const { setMarkdownText } = useContext(DefaultEditorContext);
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMarkdownText(newValue);
  };

  return (
    <>
      <textarea
        onChange={onInputChange}
        className="w-[50%] border-[1px] p-4"
      ></textarea>
    </>
  );
};

const MarkedPreview = () => {
  const { markdownText } = useContext(DefaultEditorContext);

  return (
    <>
      <div className="w-[50%]  border-[1px] p-4">
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </div>
    </>
  );
};

export default MarkdownEditor;
