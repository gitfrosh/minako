import MyHead from "../../components/MyHead";
import Layout from "../../components/Layout";
import { fetchPost } from "../../helpers/api";
import PostForm from "../../components/PostForm";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";

const Post = (token) => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPost(id, token.token);
      setData(result);
    };
    id && fetchData();
  }, [id]);

  if (data && data.length < 1) {
    return <Loading />;
  }

  return (
    <>
      <MyHead />
      <Layout>
        <section>
          <h2>Edit post</h2>
          <PostForm token={token} post={data} />
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
