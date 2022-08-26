import { IoSend } from "react-icons/io5";

import { trpc, inferMutationInput } from "@/utils/trpc";
import { useState } from "react";
import { useForm } from "react-hook-form";

type createComment = inferMutationInput<"commentSecure.createCommentOnPost">;

const CommentForm: React.FC<{
  blogId: string;
  userId: string;
  userName: string;
}> = (props) => {
  const [comment, setComment] = useState("");
  const { handleSubmit, register } = useForm<createComment>();

  const trpcCtx = trpc.useContext();

  // TODO: Implement onSuccess and onError;
  const { mutate, error } = trpc.useMutation(
    ["commentSecure.createCommentOnPost"],
    {
      onError: (error) => {},
      onSuccess: () => {
        trpcCtx.invalidateQueries([
          "comment.getCommentsOnPost",
          { blogId: props.blogId },
        ]);
      },
    }
  );

  // TODO: Add alert modal after comment posts

  const onFormSave = (data: { message: string }) => {
    setComment("");
    mutate({
      message: data.message,
      blogId: props.blogId,
      userId: props.userId,
      userName: props.userName,
    });
  };

  // TODO: Add comment deletion options

  return (
    <form className="w-full" onSubmit={handleSubmit(onFormSave)}>
      <textarea
        className="resize-none tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full rounded border-2 focus:border-0 hover:bg-light-hover active:bg-light-hover focus:bg-light-hover transition-colors"
        id="message"
        placeholder="What are your thoughts..?"
        rows={3}
        value={comment}
        {...register("message")}
        onChange={(e) => {
          setComment(e.target.value);
        }}
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
};

export default CommentForm;
