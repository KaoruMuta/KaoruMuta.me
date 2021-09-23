import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Description from '../components/Description';
import Title from '../components/Title';
import { loadAllSortedPostsByDate } from '../lib/blog/posts';

export function getStaticProps() {
  const allSortedPostsByDate = loadAllSortedPostsByDate();
  return {
    props: {
      allSortedPostsByDate,
    },
  };
}

const Blog = ({ allSortedPostsByDate }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <section className="font-sans divide-y my-8 xl:my-16">
      <Title name="tionblog" />
      {allSortedPostsByDate.map((post) => {
        const { id, title, date, categories } = post;
        return (
          <section className="my-4 pt-4" key={id}>
            <Link href={`/blog/posts/${id}`}>
              <a className="font-semibold text-xl xl:text-2xl">{title}</a>
            </Link>
            <Description date={date} categories={categories} />
          </section>
        );
      })}
    </section>
  );
};

export default Blog;
