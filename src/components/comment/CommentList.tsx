import Image from "next/image";

import { trpc, inferQueryOutput } from "@/utils/trpc";

type getALLCommentsQueryOutput = inferQueryOutput<"comment.getCommentsOnPost">;

const CommentList: React.FC<{
  blogId: string;
}> = (props) => {
  const { data: comments, error } = trpc.useQuery([
    "comment.getCommentsOnPost",
    { blogId: props.blogId },
  ]);

  if (comments === undefined) {
    return <div>No comments</div>;
  }
  return (
    <>
      {comments.map((curr, index) => {
        return <CommentCard comment={curr} key={index} />;
      })}{" "}
    </>
  );
};

const CommentCard: React.FC<{
  comment: getALLCommentsQueryOutput[number];
}> = (props) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="p-4 gap-8 w-full max-w-[955vw] flex items-start bg-light-hover dark:bg-dark-hover  mt-4 rounded">
        <div className="align-middle">
          <Image
            layout="fixed"
            width={40}
            height={40}
            className="rounded-full"
            src={
              props.comment.User.image
                ? props.comment.User.image
                : "https://storage.googleapis.com/cp_bucket_test/8KKpE4bnrgPr_BSjdodjBBS01657346517231.png"
            }
            alt="Main image"
          />
        </div>
        <div>
          <div className="font-semibold text-base md:text-lg lg:text-xl mb-2">
            {props.comment.User.name}
          </div>
          <p className="text-sm md:text-base lg:text-lg">
            {props.comment.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
