import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Prism from 'prismjs';
// Load order matters: each language must be imported after the languages it extends.
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-ignore';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-regex';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-vim';
import 'prismjs/components/prism-yaml';
// The show-language plugin requires the toolbar plugin to be loaded first.
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/show-language/prism-show-language';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { useEffect } from 'react';
import Ads from '../../../components/Ads';
import Description from '../../../components/Description';
import PageTitle from '../../../components/PageTitle';
import Share from '../../../components/Share';
import { absoluteUrl, SITE_NAME } from '../../../lib/metadata';
import { loadAllPostIds, loadPostById } from '../../../lib/posts';

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

  const postUrl = post ? absoluteUrl(`/blog/posts/${post.id}`) : '';
  const ogImageUrl = post ? absoluteUrl(`/ogp/posts/${post.id}.png`) : '';
  const description = post ? `${post.title} - ${SITE_NAME}` : SITE_NAME;

  return (
    <>
      {post && (
        <>
          <Head>
            <title>{post.title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={postUrl} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${post.title} - ${SITE_NAME}`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />
          </Head>
          <article className="my-16 break-all">
            <PageTitle name={post.title} />
            <Description date={post.date} categories={post.categories} />
            <hr className="mt-4" />
            <article
              className="py-4 max-w-none prose prose-indigo xl:prose-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <hr className="mb-4" />
            <Share url={postUrl} title={post.title} />
            <Ads />
          </article>
        </>
      )}
    </>
  );
};

export default Post;
