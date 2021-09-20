import { InferGetStaticPropsType } from 'next';
import { loadAllSortedPostsByDate } from '../lib/blog/posts';
import Link from 'next/link';

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
    <section className="font-sans divide-y mt-8 xl:mt-16">
      <h1 className="font-semibold text-2xl xl:text-4xl">tionblog</h1>
      {allSortedPostsByDate.map((post) => {
        const { id, title, date } = post;
        return (
          <section className="flex flex-row mt-2 pt-2" key={id}>
            <time>{date}</time>
            <Link href={`blog/posts/${id}`}>
              <a className="ml-16 font-semibold">{title}</a>
            </Link>
          </section>
        );
      })}
    </section>
  );
};

export default Blog;
