// Package imports
import Image from "next/image";

export const BlogCard: React.FC<{
  authorName: string;
  fileUrl: string;
}> = (props) => {
  // TODO: Add createdAt and updatedAt data.
  // TODO: Add sharing options for social media
  return (
    <section className="relative lg:sticky lg:top-8">
      <div className="flex p-4 gap-4 h-min items-center ">
        <div className="">
          <Image
            layout="fixed"
            width={75}
            height={75}
            className="rounded-full lg:rounded"
            src={"https:" + props.fileUrl}
            alt="Main image"
          />
        </div>

        <div className="">
          <p className="font-light text-md">Author</p>
          <p className="font-['dancing_script'] font-bold text-2xl">
            {props.authorName}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogCard;
