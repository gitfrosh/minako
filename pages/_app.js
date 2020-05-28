import "milligram/dist/milligram.min.css";
import "react-markdown-editor-lite/lib/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "../helpers/styles.css";
import Loading from "../components/Loading";
import Login from "../pages/login";
import React, { useState, useEffect } from "react";
import { ToastProvider } from "react-toast-notifications";

export default function MyApp({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (process.browser) {
      var match = document.cookie.match(
        new RegExp("(^| )" + "minako" + "=([^;]+)")
      );
      if (match) setAllowed(true);
      if (match) setToken(match[2]);
      setLoading(false);
    }
  });

  const ComponentToRender = isLoading ? Loading : allowed ? Component : Login;
  return (
    <ToastProvider autoDismiss>
      <ComponentToRender token={token} {...pageProps} />{" "}
    </ToastProvider>
  );
}
