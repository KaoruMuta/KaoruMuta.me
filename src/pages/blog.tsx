import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Gallery from '../components/Gallery';
import Title from '../components/Title';
import { AppConstants } from '../constants/AppConstants';
import { loadAllSortedPostsByDate } from '../lib/posts';

export const getStaticProps = async () => {
  const allSortedPostsByDate = loadAllSortedPostsByDate();
  return {
    props: {
      allSortedPostsByDate,
    },
  };
};

const Blog = ({ allSortedPostsByDate }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{AppConstants.BlogPage.TITLE}</title>
      </Head>
      <section className="divide-y my-16">
        <Title name={AppConstants.BlogPage.TITLE} />
        <Gallery posts={allSortedPostsByDate} />
      </section>
    </>
  );
};

export default Blog;
