import { AppProps } from 'next/app';

// Include only the reset
// import 'instantsearch.css/themes/reset.css';

// or include the full Algolia theme
import 'instantsearch.css/themes/algolia.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
