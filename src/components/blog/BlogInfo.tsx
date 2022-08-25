import Image from "next/image";

import type { TypeBlog } from "@/types/contentful-types";

export const BlogInfoCard: React.FC<{
  blog: TypeBlog;
}> = (props) => {

 
  // TODO: Add createdAt and updatedAt data.
  // TODO: Add sharing options for social media
  return (
    <section className="w-full lg:fixed lg:max-w-[30vw] lg:right-0 gap-8 p-8 lg:mr-8 ">
      <div className="flex justify-start gap-4 h-min shadow-lg rounded items-center bg-secondary-light-bg dark:bg-secondary-dark-bg w-full">
        <div className="pl-4 flex items-center justify-center">
          <Image
            layout="fixed"
            width={50}
            height={50}
            className="rounded"
            src={
              "https:" + props.blog.fields.blogAuthor.fields.authorProfleImage.fields.file.url
            }
            alt="Main image"
          />
        </div>

        <div className="pr-4">
          <p className="pt-2 font-light text-md">Author</p>
          <p className="font-['dancing_script'] pb-2 font-bold text-2xl">
            {props.blog.fields.blogAuthor.fields.authorName}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogInfoCard;
