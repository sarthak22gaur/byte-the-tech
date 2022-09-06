// Package imports
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogMarkdown: React.FC<{
  blogContent: string;
}> = (props) => {
  return (
      <section className="border-b-2 p-4">
        <article className="prose prose-base md:prose-lg 2xl:prose-xl dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {props.blogContent}
          </ReactMarkdown>
        </article>
      </section>
  );
};

export default BlogMarkdown;
