import type { NextPage } from "next";
import {IoSend} from 'react-icons/io5'


import { trpc, inferMutationInput } from "@/utils/trpc";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Comment: React.FC = () => {
//   const { data: session, status } = useSession();

    return (
        <div className="h-screen w-full items-center justify-center">
          <div className="p-4">
            <CommentForm />
          </div>    
        </div>
    );
  
};


const CommentForm: React.FC = () => {
    const { data: session, status } = useSession();
    type createComment = inferMutationInput<'comment.createCommentOnPost'>;
  
    const { handleSubmit, register } = useForm<createComment>();
    
    /*
      Complete onSuccess and onError
    */
  
    const { mutate, error } = trpc.useMutation(['comment.createCommentOnPost'], {
      onError: (error) => {},
      onSuccess: () => {},
    });
  
    
    const onFormSave = (data: {message: string}) => {
        console.log('In form save')
        console.log(session)

        if(session && session.user && session.user.id && session.user.name) {
            console.log('in mutate')
            mutate({
                message: data.message,
                blogId: 'cl6hd5dkz0266l8v0agswjjgj',
                userId: session?.user?.id,
                userName: session.user.name        
              });
        }
      
    };
  
    if (status === "loading") {
      return <div>Loading...</div>;
    }
  
    if (session) {
      return (
          <div className="h-screen w-full items-center justify-center">
            <div className="p-4">
              <h1>Add comment</h1>
            </div>
  
            <form
              className="bg-gray-light max-w-lg p-8"
              onSubmit={handleSubmit(onFormSave)}
            >
              <div className="">
                <div className="flex flex-col">
                  <input
                    className="p-2"
                    id="message"
                    {...register("message")}
                    placeholder="Share you thoughts"
                    required
                  />
                </div>
                <div className="">
                  <button type="submit"><IoSend /></button>
                </div>
              </div>
            </form>
      
          </div>
  
      );
    }
    return <div>Please Login</div>;
  };



export default Comment;