import MyHead from "./../components/MyHead";
import Layout from "./../components/Layout";
import Link from "next/link";
import fetchPosts from "../helpers/api";

function HomePage({ posts }) {
  return (
    <>
      <MyHead />
      <Layout>
        <div>
          <h1>minako</h1>
          <span className="subtitle">cms made simple</span>
          <br />
          <br />
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <p id="right">
            <a className="button" href="/new">
              + New Post
            </a>
          </p>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Category</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.date}</td>
                  <td>{post.category}</td>
                  <td>
                    {" "}
                    <Link
                      prefetch={false}
                      href={`/post/[post]`}
                      as={`/post/${post.id}`}
                      passHref
                    >
                      <a>edit</a>
                    </Link>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
      <style jsx>{`
        h1 {
          font-size: 8.6rem;
          margin-bottom: -2rem;
        }
        .subtitle {
          font-size: 1.6rem;
          margin-left: 0.8rem;
        }
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
