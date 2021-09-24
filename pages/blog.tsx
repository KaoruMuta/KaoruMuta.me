import { InferGetStaticPropsType } from 'next';
import Gallery from '../components/Gallery';
import Title from '../components/Title';
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
    <section className="font-sans divide-y my-8 xl:my-16">
      <Title name="tionblog" />
      <Gallery posts={allSortedPostsByDate} />
    </section>
  );
};

export default Blog;
