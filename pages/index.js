import Layout from "../components/Layout";
import { fetchPosts } from "../helpers/api";
import Table from "../components/Table";
import { useState, useEffect, useCallback } from "react";
import Loading from "../components/Loading";

function HomePage({ token }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const fetchData = useCallback(async () => {
    setLoading(true)
    const result = await fetchPosts(token);
    setData(result);
    setLoading(false)
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loading />;

  }
  return (
    <>
      <Layout>
        <div>
          <p>
            <a className="button" href="/new">
              + New Post
            </a>
          </p>
          <Table fetchPosts={fetchData} token={token} posts={data} />
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

export default HomePage;
