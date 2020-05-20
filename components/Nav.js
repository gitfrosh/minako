import Link from "next/link";
// import styled from "styled-components";

// const StyledLink = styled.a`
//   display: inline-block;
//   color: #242424;
//   font-size: 18px;
//   margin-right: 30px;
//   padding: 5px;
//   cursor: pointer;
//   @media only screen and (max-width: 767px) {
//     font-size: 15px;
//   }
//   @media only screen and (max-width: 480px) {
//     font-size: 12px;
//   }
// `;

function Nav() {
  return (
    <>
      <header>
        <nav role="navigation">
          <div>
            <h1>minako</h1>
            <span className="subtitle">cms made simple</span>
          </div>
          <div className="menu">
            <a className="button" href="/">
              Home
            </a>
          </div>{" "}
        </nav>
      </header>
      <style jsx>{`
        header {
          width: auto;
          top: 0;
          left: 0;
          overflow: hidden;
          padding: 4rem;
          background: #fff;
          -webkit-transform: translateX(0);
          transform: translateX(0);
          -webkit-transition: all 0.4s;
          transition: all 0.4s;
        }
        .menu {
           float : right;
           margin-top: -8rem;
        }
      `}</style>
    </>
  );
}

export default Nav;
