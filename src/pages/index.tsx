import Gallery from 'components/Gallery';
import Title from 'components/Title';
import { loadAllSortedPostsByDate } from 'lib/posts';
import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

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
        <meta
          name="description"
          content="Personal website hosted by Kaoru Muta. tionblogへようこそ。技術のアウトプットだけでなく、日々の備忘録も残しています。"
        />
        <title>tionblog</title>
      </Head>
      <section className="divide-y my-16">
        <Title name="tionblog" />
        <Gallery posts={allSortedPostsByDate} />
      </section>
    </>
  );
};

export default Blog;
