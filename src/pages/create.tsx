import type { NextPage } from "next";
import MarkdownEditor from "@/components/MarkdownEditor";
import DefaultEditorContext from "@/context/editorContext";
import Navbar from "@/components/Navbar";

import { trpc } from "@/utils/trpc";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Create: NextPage = () => {
  const [markdownText, setMarkdownText] = useState("");

  const editorCtx = {
    markdownText,
    setMarkdownText,
  };

  return (
    <DefaultEditorContext.Provider value={editorCtx}>
      <Navbar />
      <div className="h-screen">
        <div className="p-4">
          <h1>Create blog</h1>
        </div>
        <MarkdownEditor />
      </div>
    </DefaultEditorContext.Provider>
  );
};

export default Create;
