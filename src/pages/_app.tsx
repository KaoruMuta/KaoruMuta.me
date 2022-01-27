import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import 'prismjs/themes/prism-okaidia.css';
import Layout from 'components/Layout';
import { pageview } from 'lib/gtag';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Layout currentPath={router.asPath}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};
export default MyApp;
