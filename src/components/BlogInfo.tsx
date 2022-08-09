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

  console.log(tags);

  return (
    <section className="w-full lg:fixed max-w-[30vw] lg:right-0 gap-8 py-8 px-8 lg:mr-8">
      <div className="flex flex-col justify-center shadow-lg items-center p-4">
        <div className="block w-full h-fit">
          <Image
            layout="responsive"
            width={16}
            height={9}
            src={
              props.blog?.User?.image
                ? props.blog?.User?.image
                : "https://storage.googleapis.com/cp_bucket_test/8KKpE4bnrgPr_BSjdodjBBS01657346517231.png"
            }
            alt="Main image"
          />
        </div>
      </div>
    </section>
  );
};

export default BlogInfoCard;
