import type { NextPage } from "next";
import { IoSend } from "react-icons/io5";
import Image from "next/image";

import { trpc, inferMutationInput, inferQueryOutput } from "@/utils/trpc";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";


import { IoLogoGoogle } from "react-icons/io5";

type getALLCommentsQueryOutput = inferQueryOutput<"comment.getCommentsOnPost">;

const CommentsCard: React.FC<{
  // comments: getALLCommentsQueryOutput;
  blogId: string;
}> = (props) => {

  const {data: comments, error} = trpc.useQuery(['comment.getCommentsOnPost', {blogId: props.blogId}] )

  return (
    <>
      <CommentForm id={props.blogId} />
      {comments && comments.map((curr, index) => {
        return <CommentsContent comment={curr} key={index} />;
      })}
    </>
  );
};

const CommentForm: React.FC<{
  id: string;
}> = (props) => {
  const { data: session, status } = useSession();
  type createComment = inferMutationInput<"commentSecure.createCommentOnPost">;

  const { handleSubmit, register } = useForm<createComment>();

  /*
      Complete onSuccess and onError
    */

  const { mutate, error } = trpc.useMutation(
    ["commentSecure.createCommentOnPost"],
    {
      onError: (error) => {},
      onSuccess: () => {},
    }
  );

  const onFormSave = (data: { message: string }) => {
    if (session && session.user && session.user.id && session.user.name) {
      mutate({
        message: data.message,
        blogId: props.id,
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
          className="resize-none tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full rounded border-2 focus:border-0 hover:bg-light-hover active:bg-light-hover focus:bg-light-hover transition-colors"
          id="message"
          placeholder="What are your thoughts..?"
          rows={3}
          {...register("message")}
          required
        />

        <div className="flex justify-end w-full ">
          <button
            className="flex gap-4 items-center rounded py-1 px-2 bg-secondary-light-bg dark:bg-accent-light transition-all"
            type="submit"
          >
            <p>Post</p>
            <IoSend />
          </button>
        </div>
      </form>
    );
  }
  return (
    <p className="p-2 sm:p-4 flex items-center justify-center gap-2 sm:gap-4">
      <button
        className="flex items-center gap-2 bg-secondary-light-bg dark:bg-accent-light lg:dark:bg-secondary-dark-bg lg:bg-light-hover lg:hover:scale-105 lg:hover:bg-secondary-light-bg px-2 py-1 lg:dark:hover:bg-accent-light rounded lg:transition-all"
        onClick={() => signIn()}
      >
        <IoLogoGoogle />
        <p className="text-sm sm:text-base">Login here</p>
      </button>
      <p className="text-sm sm:text-base">to share your thoughts</p>
    </p>
  );
};

const CommentsContent: React.FC<{
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

export default CommentsCard;
