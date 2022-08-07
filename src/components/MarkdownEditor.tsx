import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import MarkDown from "markdown-it";
import DefaultEditorContext from "@/context/editorContext";
import remarkGfm from 'remark-gfm'
import { useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";

const MarkdownEditor = () => {
  return (
    <>
      <div className="flex min-h-[50vh] p-4">
        <MarkedInput />
        <MarkedPreview />
      </div>
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
      <div className="w-[50%] border-[1px] p-4 prose dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
      </div>
    </>
  );
};

export default MarkdownEditor;
