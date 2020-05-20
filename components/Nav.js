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
          <Link href="/new">New Post </Link>
          <Link href="/">Home </Link>

        </nav>
      </header>
      <style jsx>{`
        header {
          width: auto;
          text-align: right;
          top: 0;
          left: 0;
          overflow: hidden;
          padding: 17px 15px;
          background: #fff;
          -webkit-transform: translateX(0);
          transform: translateX(0);
          -webkit-transition: all 0.4s;
          transition: all 0.4s;
        }
        nav {
          float: right;
        }
      `}</style>
    </>
  );
}

export default Nav;
