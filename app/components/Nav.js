import { logout } from "../helpers/api";
import { useToasts } from "react-toast-notifications";
import Router from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

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
          <a href="/">
            <h1><img src="/favicon.ico"/>minako</h1>
            <span className="subtitle">cms made simple</span>
            </a>
          </div>
          <div className="menu">
            <a onClick={(e) => logoutNow(e)} className="button" href="/">
            <FontAwesomeIcon icon={faSignOutAlt} />            </a>
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
