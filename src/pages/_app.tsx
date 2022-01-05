import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import 'prismjs/themes/prism-okaidia.css';
import Layout from 'components/Layout';
import { GOOGLE_ANALYTICS_ID, pageview } from 'lib/gtag';

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
      {GOOGLE_ANALYTICS_ID && (
        <>
          <Script
            id="gtag-manager"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          />
          <Script
            id="gtag-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ANALYTICS_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
          <Script
            id="google-adsense"
            data-ad-client="ca-pub-8671682597497935"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
        </>
      )}
      <Layout currentPath={router.asPath}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};
export default MyApp;
