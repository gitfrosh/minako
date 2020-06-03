import Head from "next/head";

const MyHead = ({ title }) => (
  <Head>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <meta http-equiv="content-Type" content="text/html; utf-8" />
    <meta http-equiv="content-Language" content="en" />
    <meta name="author" content="Rike Exner" />
    <meta charset="utf-8" />
    <title>minako - cms made simple</title>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500&display=swap" rel="stylesheet"/>
    </Head>
);

export default MyHead;
