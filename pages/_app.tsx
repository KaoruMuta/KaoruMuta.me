import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <Layout currentPath={router.asPath}>
      <Component {...pageProps} />
    </Layout>
  );
};
export default MyApp;
