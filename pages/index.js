import Layout from "../components/Layout";
import { fetchPosts } from "../helpers/api";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

function HomePage({ token }) {
  const [data, setData] =useState([])

  useEffect(() => {
      const fetchData = async () => {
        const result = await fetchPosts(token);
        setData(result);
      };
      fetchData();
  }, []);

  if (data.length < 1) {
    return <Loading />
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
          <Table posts={data} />
    
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
