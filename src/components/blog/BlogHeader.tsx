// Package imports
import Image from "next/image";

const BlogHeader: React.FC<{
  blogTitle: string;
  fileUrl: string;
  createdAt: string;
  blogTags: Array<string>;
}> = (props) => {
  const date = new Date(props.createdAt).toDateString();
  const [weekday, month, day, year] = date.split(" ");
  const dateString = month + " " + day + ", " + year;

  return (
    <header className="flex flex-col justify-center p-2">
      <div className="pt-4 text-xs sm:text-base">
        {dateString}
      </div>

      <div className="text-3xl sm:text-4xl py-4 font-black dark:text-secondary-dark text-primary-dark">
        {props.blogTitle}
      </div>
      <div className="text-lg items-center flex gap-4 pb-4">
        {props.blogTags.map((tag, index) => {
          return (
            <div
              className="bg-secondary-light-bg dark:bg-accent-light px-2 rounded transition-colors"
              key={index}
            >
              {tag}
            </div>
          );
        })}
      </div>
      <div className="block w-full h-fit">
        <Image
          layout="responsive"
          width={16}
          height={9}
          src={"https:" + props.fileUrl}
          alt="Main image"
        />
      </div>
    </header>
  );
};

export default BlogHeader;
