import { useForm, useField } from "react-form";
import { login } from "../helpers/api";
import Router from "next/router";
import { useToasts } from "react-toast-notifications";

function UsernameField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("username", {});

  return (
    <>
      <input type="text" {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function PasswordField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("password", {});

  return (
    <>
      <input type="password" {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function Login() {
  const { addToast } = useToasts();

  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values, instance) => {
      await sendToServer(values);
    },
    debugForm: false,
  });

  async function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  async function sendToServer(values) {
    const response = await login(values);
    if (response.message) {
      addToast(response.message, { appearance: "error" });
    } else {
      addToast("Login successful", { appearance: "success" });
      setCookie("minako", response.token, 7);
      Router.push("/");
    }
  }

  return (
    <>
      <div className="log-form">
        <center>
          <h1>
            <img src="/favicon.ico" />
            minako
          </h1>
        </center>
        <Form>
          <div>
            <label>
              Username: <UsernameField />
            </label>
          </div>
          <div>
            <label>
              Password: <PasswordField />
            </label>
          </div>
          <div>
            <button type="submit" disabled={!canSubmit}>
              Submit
            </button>
          </div>

          <div>
            <em>{isSubmitting ? "Submitting..." : null}</em>
          </div>
        </Form>
      </div>
      <style jsx>{`
        h1 {
          padding: 4rem 4rem 0.5rem 4rem;
        }
        .log-form {
          width: 40%;
          min-width: 320px;
          max-width: 475px;
          background: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
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

        input[type="text"]:focus {
          border-color: rgb(26, 147, 111) !important;
        }

        form {
          display: block;
          width: 100%;
          padding: 2em;
        }
      `}</style>
    </>
  );
}

export default Login;
