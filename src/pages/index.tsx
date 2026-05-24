import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import BlogPostList from '../components/BlogPostList';
import PageTitle from '../components/PageTitle';
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from '../lib/metadata';
import { loadAllSortedPostsByDate } from '../lib/posts';

export const getStaticProps = async () => {
  const allSortedPostsByDate = loadAllSortedPostsByDate();
  return {
    props: {
      allSortedPostsByDate,
    },
  };
};

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ allSortedPostsByDate }) => {
  const pageUrl = absoluteUrl('/');
  const ogImageUrl = absoluteUrl('/ogp/default.png');

  return (
    <>
      <Head>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_NAME} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={ogImageUrl} />
        <title>{SITE_NAME}</title>
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
