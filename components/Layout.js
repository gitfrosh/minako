import Nav from "./Nav";
import Footer from "./Footer";
import MyHead from "./../components/MyHead";

const Layout = (props) => (
  <>
    <MyHead />

    <main>
      <div className="wrapper">
        <Nav />
        <div className="outline">
          <div className="content">
            <br />
            <br />
            {props.children}
          </div>
        </div>
        <Footer />

      </div>
    </main>
    <style jsx global>
      {`
        body,
        __next {
          font-size: 13px;
          height: 100vh;
          width: 100%;
          font-family: open sans, sans-serif;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
          text-align: center;
          background: lightgray url("/img/21989.jpg") repeat;
          display: table;
        }
        main {
          height: 100vh;
          max-width: 1076px;
          text-align: left;
          display: inline-block;
          padding: 1em 1em 1em 1em;
        }
        .wrapper {
          min-height: 100vh;
          background-color: #fff;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
          width: 100%;
        }
        .content {
          padding-bottom: 2.5rem; /* Footer height */
        }
        .outline {
          padding: 0em 3em 3em 3em;
          overflow: hidden;
          height: 100%;
          outline: none;
          min-width: 800px;
          width: 100%;
          left: 0;
          top: 0;
          z-index: 0;
        }
        h1 {
          font-size: 8.6rem;
          margin-bottom: -2rem;
        }
        .subtitle {
          font-size: 1.6rem;
          margin-left: 0.8rem;
        }
      `}
    </style>
  </>
);

export default Layout;
