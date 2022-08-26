import { trpc, inferQueryOutput } from "@/utils/trpc";

import CommentList from "@/components/comment/CommentList";
import CommentLogin from "@/components/comment/CommentLogin";
import CommentForm from "@/components/comment/CommentForm";
import { useSession } from "next-auth/react";

type getALLCommentsQueryOutput = inferQueryOutput<"comment.getCommentsOnPost">;

const Comments: React.FC<{
  blogId: string;
}> = (props) => {
  
  const { data: session, status } = useSession();

  return (
    <>
      {session && session.user && session.user.id && session.user.name ? (
        <CommentForm
          blogId={props.blogId}
          userId={session?.user?.id}
          userName={session?.user?.name}
        />
      ) : (
        <CommentLogin />
      )}
      <CommentList blogId={props.blogId} />
    </>
  );
};

export default Comments;
