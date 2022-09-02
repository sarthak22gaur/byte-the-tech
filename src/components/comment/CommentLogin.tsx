// Package imports
import { signIn } from "next-auth/react";
import { IoLogoGoogle } from "react-icons/io5";

const CommentLogin: React.FC = () => {  
    return (
      <div className="p-2 sm:p-4 flex items-center justify-center gap-2 sm:gap-4">
        <button
          className="flex items-center gap-2 bg-secondary-light-bg dark:bg-accent-light lg:dark:bg-secondary-dark-bg lg:bg-light-hover lg:hover:scale-105 lg:hover:bg-secondary-light-bg px-2 py-1 lg:dark:hover:bg-accent-light rounded lg:transition-all"
          onClick={() => signIn()}
        >
          <IoLogoGoogle />
          <p className="text-sm sm:text-base">Login here</p>
        </button>
        <p className="text-sm sm:text-base">to share your thoughts</p>
      </div>
    );
  };

  export default CommentLogin
  