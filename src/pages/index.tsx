import BlogPostList from 'components/BlogPostList';
import PageTitle from 'components/PageTitle';
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
      <section className="my-16">
        <PageTitle name="tionblog" />
        <hr className="mt-4" />
        <BlogPostList posts={allSortedPostsByDate} />
      </section>
    </>
  );
};

export default Blog;
