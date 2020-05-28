import { useForm, useField } from "react-form";
import { login } from "../helpers/api";
import Router from 'next/router'

function UsernameField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("username", {
    //   validate: validateAddressStreet
  });

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
  } = useField("password", {
    //   validate: validateAddressStreet
  });

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
  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      await sendToServer(values);
      console.log("Huzzah!");
    },
    debugForm: true,
  });

  async function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  async function sendToServer(values) {
    const token = await login(values);
    setCookie("minako", token.token, 7)
    Router.push('/')

  }

  return (
    <div>
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
  );
}

export default Login;
