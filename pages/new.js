import MyHead from "./../components/MyHead";
import Layout from "./../components/Layout";
import Form from "./../components/Form";
import Link from "next/link";

function New() {
  return (
    <div>
      <MyHead />
      <Layout>
        <section>
        <h2>New post</h2>
            <Form />
        </section>
      </Layout>
      {/* <style jsx>{`
   
    
    `}</style> */}
    </div>
  );
}
export default New;