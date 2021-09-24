import { InferGetStaticPropsType } from 'next';
import Gallery from '../../../components/Gallery';
import Title from '../../../components/Title';
import { loadAllCategories, loadSortedPostsForCategoryByDate } from '../../../lib/posts';

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

const Category = ({ category, posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <section className="font-sans divide-y my-8 xl:my-16">
      <Title name={`# ${category}`} />
      <Gallery posts={posts} />
    </section>
  );
};

export default Category;
