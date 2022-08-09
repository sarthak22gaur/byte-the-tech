import { inferQueryOutput } from "@/utils/trpc";
import { MdBluetoothSearching } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { IoArrowRedoSharp } from "react-icons/io5";
import { TiArrowRightOutline } from "react-icons/ti";

type blogContent = inferQueryOutput<"blogs.getSingleBlog">;

export const BlogInfoCard: React.FC<{
  blog: blogContent;
}> = (props) => {
  let tags: Array<string>;

  tags = [];
  if (props.blog.tags && props.blog.tags !== "NULL") {
    tags = props.blog.tags.split(",");
  }
  return (
    <section className="w-full lg:fixed lg:max-w-[30vw] lg:right-0 gap-8 p-8 lg:mr-8 ">
      <div className="flex justify-start gap-4 h-min shadow-lg rounded items-center bg-secondary-light-bg dark:bg-secondary-dark-bg w-full border-2">
        <div className="pl-4 flex items-center justify-center">
          <Image
            layout="fixed"
            width={50}
            height={50}
            className="rounded"
            src={
              props.blog?.User?.image
                ? props.blog?.User?.image
                : "https://storage.googleapis.com/cp_bucket_test/8KKpE4bnrgPr_BSjdodjBBS01657346517231.png"
            }
            alt="Main image"
          />
        </div>

        <div className="pr-4">
          <p className="pt-2 font-light text-md">Author</p>
          <p className="font-['dancing_script'] pb-2 font-bold text-2xl">
            {props.blog.author}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogInfoCard;
