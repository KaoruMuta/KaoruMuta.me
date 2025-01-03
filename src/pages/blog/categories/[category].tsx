import BlogPostList from 'components/BlogPostList';
import PageTitle from 'components/PageTitle';
import { loadAllCategories, loadSortedPostsForCategoryByDate } from 'lib/posts';
import { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

export const getStaticProps = async ({ params }: { params: { category: string } }) => {
  const posts = loadSortedPostsForCategoryByDate(params.category);
  return {
    props: {
      category: params.category,
      posts: posts,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = loadAllCategories();
  return {
    paths,
    fallback: false,
  };
};

const Category: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ category, posts }) => {
  return (
    <>
      <Head>
        <title>{category}</title>
      </Head>
      <section className="my-16">
        <PageTitle name={`# ${category}`} />
        <hr className="mt-4" />
        <BlogPostList posts={posts} />
      </section>
    </>
  );
};

export default Category;
