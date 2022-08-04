import { createContext } from "react";

const DefaultEditorContext = {
  markdownText: "",
  setMarkdownText: (text: string) => {},
};

export default createContext(DefaultEditorContext);
