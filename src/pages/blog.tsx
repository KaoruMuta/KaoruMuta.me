import Gallery from 'components/Gallery';
import Title from 'components/Title';
import { loadAllSortedPostsByDate } from 'lib/posts';
import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { AppConstants } from '../constants/AppConstants';

export const getStaticProps = async () => {
  const allSortedPostsByDate = loadAllSortedPostsByDate();
  return {
    props: {
      allSortedPostsByDate,
    },
  };
};

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ allSortedPostsByDate }) => {
  return (
    <>
      <Head>
        <meta name="description" content={AppConstants.BlogPage.CONTENT} />
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
