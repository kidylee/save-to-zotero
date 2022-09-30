import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Save To Zetero</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Save To Zetero is an opensource Twitter bot which saves content to your Zetero by commenting tweets or thread."
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
