import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogMarkdown: React.FC<{
  blogContent: string;
}> = (props) => {
  return (
      <section className="flex flex-col items-center justify-center border-b-2 p-4">
        <article className="prose prose-base sm:prose-lg md:prose-xl 2xl:prose-2xl dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {props.blogContent}
          </ReactMarkdown>
        </article>
      </section>
  );
};

export default BlogMarkdown;
