import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Prism from 'prismjs';
import Title from 'components/Title';
import Description from 'components/Description';
import Share from 'components/Share';
import Ads from 'components/Ads';
import { loadAllPostIds, loadPostById } from 'lib/posts';

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
  const { id, title, content, date, categories } = post;
  const url = `${process.env.HOST}/blog/posts/${id}`;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <article className="my-16 break-all">
        <Title name={title} />
        <Description date={date} categories={categories} />
        <hr className="mt-4"></hr>
        <article
          className="py-4 max-w-none prose prose-indigo xl:prose-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <hr className="mb-4"></hr>
        <Share url={url} title={title} />
        <Ads />
      </article>
    </>
  );
};

export default Post;
