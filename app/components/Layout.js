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
        @media (min-width: 800px) {
          .outline {
            min-width: 1050px;
          }
        }

        body,
        __next {
          height: 100vh;
          width: 100%;
          font-family: Manrope, open sans, sans-serif;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
          text-align: center;
          display: table;
        }
        main {
          max-width: 1076px;
          text-align: left;
          display: inline-block;
          padding: 1em 1em 1em 1em;
        }
        .wrapper {
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
          width: 100%;
          left: 0;
          top: 0;
          z-index: 0;
        }
        h1 {
          font-size: 8.6rem;
          margin-bottom: -2rem;
          color: rgb(17, 75, 95);
        }
        .subtitle {
          font-size: 1.6rem;
          margin-left: 0.8rem;
          color: rgb(26, 147, 111);
        }

        .table-cell {
          max-width: 600px;
        }

        .table-tag {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          font-variant: tabular-nums;
          line-height: 1.5715;
          list-style: none;
          -webkit-font-feature-settings: "tnum";
          font-feature-settings: "tnum";
          display: inline-block;
          height: auto;
          padding: 0 7px;
          line-height: 20px;
          white-space: nowrap;
          background: #fafafa;
          border: 1px solid #d9d9d9;
          border-radius: 2px;
          cursor: default;
          opacity: 1;
          -webkit-transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
          transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        }

        .rc-md-navigation .button,
        .tool-bar .button {
          background-color: unset;
          border: unset;
          border-radius: unset;
          font-size: unset;
          font-weight: unset;
          padding: unset;
          text-decoration: unset;
          letter-spacing: unset;
          text-transform: unset;
          white-space: unset;
        }

        label {
          font-weight: unset;
        }

        input {
          width: 100%;
        }

        .error-label {
          margin-top: -15px;
          font-style: italic;
          color: red;
        }

        .error-label-editor {
          font-style: italic;
          color: red;
        }

        button,
        .button,
        button[disabled]:hover {
          background-color: #fff;
          border-color: rgb(26, 147, 111);
          color: #000 !important;
          margin-bottom: 0px;
        }

        button:hover,
        .button:hover {
          background-color: #fafafa;
          border-color: rgb(17, 75, 95);
        }

        textarea:focus, input[type='text']:focus{
          border-color: rgb(26,147,111);
      }


        a,
        a:hover,
        a:visited,
        a:active {
          color: rgb(26, 147, 111);
        }
      `}
    </style>
  </>
);

export default Layout;
