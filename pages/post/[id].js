import MyHead from "../../components/MyHead";
import Layout from "../../components/Layout";
import fetchPosts from "../../helpers/api";
import dynamic from "next/dynamic";
import MarkdownIt from 'markdown-it'
import { useState } from "react";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const Post = ({ post }) => {
  const [text, setText] = useState(post.html);
  return (
    <>
      <MyHead title={`Blog - ${post.title}`} />
      <Layout>
        <h2>{post.title}</h2>
        <p className="date">{post.date}</p>

        <section>
          <MdEditor
            value={text}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({text, html}, event) => {
              setText(text)
            }}
          />
        </section>
      </Layout>

      <style jsx>
        {`
          button {
            background-color: unset;
          }
        `}
      </style>
    </>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const posts = await fetchPosts();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: {
      id: post.id,
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const posts = await fetchPosts();

  const post = posts.filter((post) => post.id === params.id)[0];
  // Pass post data to the page via props
  return { props: { post } };
}

export default Post;
