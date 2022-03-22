// https://nextjs.org/docs/basic-features/built-in-css-support#adding-a-global-stylesheet

import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
