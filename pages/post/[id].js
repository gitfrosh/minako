import MyHead from "../../components/MyHead";
import Layout from "../../components/Layout";
import fetchPosts from "../../helpers/api";
import Form from "../../components/Form";

const Post = ({ post }) => {
  return (
    <>
      <MyHead />
      <Layout>
        <section>
          <h2>Edit post</h2>
          <Form post={post} />
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
