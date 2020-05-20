import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import { useState } from "react";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const Editor = ({handleChange, html}) => {
  const [text, setText] = useState(html || "");
  return (
    <MdEditor
      value={text}
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={({ text, html }, event) => {
        handleChange(text);
      }}
    />
  );
};

export default Editor;
