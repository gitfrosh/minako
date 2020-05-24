import Layout from "./../components/Layout";
import { fetchPosts } from "../helpers/api";
import Table from "../components/Table"
function HomePage({ posts }) {
  return (
    <>
      <Layout>
        <div>
          <p>
            <a className="button" href="/new">
              + New Post
            </a>
          </p>
          <Table posts={posts} />
    
        </div>

      </Layout>
      <style jsx>{`

        #right {
          float: right;
        }
      `}</style>
    </>

  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  const posts = await fetchPosts();
  return {
    props: {
      posts: posts.reverse(),
    },
  };
}

export default HomePage;
