import MyHead from "../../components/MyHead";
import Layout from "../../components/Layout";
import { fetchPost } from "../../helpers/api";
import Form from "../../components/Form";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";

const Post = ({ token }) => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPost(id, token);
      setData(result);
    };
    fetchData();
  }, []);

  if (data && data.length < 1) {
    return <Loading />;
  }

  return (
    <>
      <MyHead />
      <Layout>
        <section>
          <h2>Edit post</h2>
          <Form post={data} />
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

export default Post;
