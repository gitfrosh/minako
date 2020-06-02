import MyHead from "../../components/MyHead";
import Layout from "../../components/Layout";
import { fetchPost } from "../../helpers/api";
import Form from "../../components/Form";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";

const Post = (token) => {
  const [data, setData] = useState([]);
  const router = useRouter();
  console.log(router)
  const { id } = router.query;
  

  useEffect(() => {
    console.log(id, token)
  
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
          <Form token={token} post={data} />
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
