import MyHead from "./../components/MyHead";
import Layout from "./../components/Layout";
import PostForm from "./../components/PostForm";

function New(token) {
  return (
    <>
      <MyHead />
      <Layout>
        <section>
        <h2>New post</h2>
            <PostForm token={token} />
        </section>
      </Layout>
    </>
  );
}
export default New;
