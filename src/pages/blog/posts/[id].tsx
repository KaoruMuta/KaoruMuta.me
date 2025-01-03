import Ads from 'components/Ads';
import Description from 'components/Description';
import PageTitle from 'components/PageTitle';
import Share from 'components/Share';
import { loadAllPostIds, loadPostById } from 'lib/posts';
import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Prism from 'prismjs';
import { useEffect } from 'react';

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const post = loadPostById(params.id);
  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = loadAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ post }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      {post && (
        <>
          <Head>
            <title>{post.title}</title>
          </Head>
          <article className="my-16 break-all">
            <PageTitle name={post.title} />
            <Description date={post.date} categories={post.categories} />
            <hr className="mt-4"></hr>
            <article
              className="py-4 max-w-none prose prose-indigo xl:prose-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <hr className="mb-4"></hr>
            <Share url={`${process.env.HOST}/blog/posts/${post.id}`} title={post.title} />
            <Ads />
          </article>
        </>
      )}
    </>
  );
};

export default Post;
