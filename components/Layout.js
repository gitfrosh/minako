import Nav from "./Nav";

const Layout = (props) => (
  <>
    <main>
      <div className="wrapper">
        <Nav />
        <div className="outline">{props.children}</div>
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
          height: 100vH;

          text-align: left;
          display: inline-block;
          padding: 1em 1em 1em 1em;
        }
        .wrapper {
          height: 100%;

          background-color: #fff;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
          width: 100%;
          position: relative;
        }
        .outline {
          padding: 3em 3em 3em 3em;
          overflow: hidden;
          height: 100%;
          outline: none;
          width: 100%;
          left: 0;
          top: 0;
          z-index: 0;
        }
      `}
    </style>
  </>
);

export default Layout;
