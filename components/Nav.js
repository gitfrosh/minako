import Link from "next/link";
import { logout } from "../helpers/api";
import { useToasts } from "react-toast-notifications";
import Router from "next/router";

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
  const { addToast } = useToasts();

  async function logoutNow(e) {
    e.preventDefault();
    const response = await logout();
    if (response.success) {
      addToast("Logout successful", { appearance: "success" });
      document.cookie = "minako" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      Router.push("/login");
    } else {
      addToast(response.message, { appearance: "error" });
    }
  }
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
            </a>{" "}
            <a onClick={(e) => logoutNow(e)} className="button" href="/">
              Logout
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
          float: right;
          margin-top: -8rem;
        }
      `}</style>
    </>
  );
}

export default Nav;
