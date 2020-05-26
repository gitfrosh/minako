import "milligram/dist/milligram.min.css";
import "react-markdown-editor-lite/lib/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "../helpers/styles.css";
import AuthContext from "../helpers/AuthProvider";
import React, {useState} from "react";

export default function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider
      value={{
        token: token,
        setToken: setToken
      }}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
