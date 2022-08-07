import type { NextPage } from "next";
import { IoSend } from "react-icons/io5";
import Image from "next/image";

import { trpc, inferMutationInput, inferQueryOutput } from "@/utils/trpc";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type blogContent = inferQueryOutput<"blogs.getSingleBlog">;
type getALLCommentsQueryOutput = inferQueryOutput<"comment.getCommentsOnPost">;

const CommentsCard: React.FC<{
  comments: getALLCommentsQueryOutput;
}> = (props) => {
  return (
    <>
      <CommentForm />
      {props.comments.map((curr, index) => {
        return <CommentsContent comment={curr} key={index} />;
      })}
    </>
  );
};

const CommentForm: React.FC = () => {
  const { data: session, status } = useSession();
  type createComment = inferMutationInput<"comment.createCommentOnPost">;

  const { handleSubmit, register } = useForm<createComment>();

  /*
      Complete onSuccess and onError
    */

  const { mutate, error } = trpc.useMutation(["comment.createCommentOnPost"], {
    onError: (error) => {},
    onSuccess: () => {},
  });

  const onFormSave = (data: { message: string }) => {
    console.log("In form save");
    console.log(session);

    if (session && session.user && session.user.id && session.user.name) {
      console.log("in mutate");
      mutate({
        message: data.message,
        blogId: "cl6iq6d480570iov02ekixnr8",
        userId: session?.user?.id,
        userName: session.user.name,
      });
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <form className="w-full" onSubmit={handleSubmit(onFormSave)}>
        <textarea
          className="resize-none tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full rounded"
          id="message"
          placeholder="What are your thoughts..?"
          rows={3}
          {...register("message")}
          required
        />

        <div className="flex justify-end w-full ">
          <button
            className="flex gap-4 items-center bg-slate-800 rounded py-1 px-2 text-white"
            type="submit"
          >
            <p>Post</p>
            <IoSend />
          </button>
        </div>
      </form>
    );
  }
  return <div>Please Login</div>;
};

const CommentsContent: React.FC<{
  comment: getALLCommentsQueryOutput[number];
}> = (props) => {
  return (
    <div className="py-4 px-8 gap-8 flex items-start bg-slate-900 mt-4 rounded">
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
        <div className="font-semibold text-lg mb-4">{props.comment.User.name}</div>
        <div>{props.comment.message}</div>
      </div>
    </div>
  );
};

export default CommentsCard;
