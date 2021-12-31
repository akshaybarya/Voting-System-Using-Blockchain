import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { CookiesProvider, Cookies } from "react-cookie";

// // Custom Imports
import "../css/globals.css";
import theme from "../css/theme";
// import { CookiesProvider } from "react-cookie";
// import { SWRConfig } from "swr";

// const isBrowser = () => typeof window !== "undefined";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>E-Voting-System</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {/* <SWRConfig
        value={{
          revalidateOnFocus: false,
          shouldRetryOnError: false,
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}> */}
      {/* <CookiesProvider cookies={isBrowser() ? undefined : cookies}> */}
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CookiesProvider>
      {/* </SWRConfig> */}
    </Fragment>
  );
}

// MyApp.getCookies = (ctx) => {
//   if (ctx && ctx.req && ctx.req.headers.cookie) {
//     return new Cookies(ctx.req.headers.cookie);
//   }
//   return new Cookies();
// };

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  // await dbConnect();
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // const cookies = MyApp.getCookies(ctx);

  // return { pageProps, cookies };
  return { pageProps };
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
