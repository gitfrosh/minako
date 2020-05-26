import { useForm, useField } from "react-form";
import { login } from "../helpers/api";
import { useState, useContext } from 'react';
import AuthContext from "../helpers/AuthProvider";

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
  const { token, setToken } = useContext(AuthContext);
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

  async function sendToServer(values) {
      console.log(values)
      const response = await login(values);
      console.log(response)

    const token = "123";
    setToken(token)
  }

  console.log(token)

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
