import type { NextPage } from 'next';
import Head from 'next/head';
import Profile from '../components/Profile';
import { AppConstants } from '../constants/AppConstants';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{AppConstants.HomePage.TITLE}</title>
      </Head>
      <Profile />
    </>
  );
};

export default Home;
