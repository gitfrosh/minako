import Layout from "./../components/Layout";

export default function Page() {
  return (
    <>
      <Layout>
        <div className="error"><h2><em>Oh no.</em> Something went wrong.</h2></div>
      </Layout>
      <style jsx global>
        {`
          .error {
            text-align: center
          }
        
          
        `}
      </style>
    </>
  );
}
