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
    <section className="font-sans divide-y my-8 xl:my-16">
      <h1 className="font-semibold text-2xl xl:text-4xl">tionblog</h1>
      {allSortedPostsByDate.map((post) => {
        const { id, title, date } = post;
        return (
          <section className="flex flex-row items-center my-4 py-4" key={id}>
            <time className="flex-1 text-sm">{date}</time>
            <Link href={`blog/posts/${id}`}>
              <a className="flex-1 flex-wrap font-semibold">{title}</a>
            </Link>
          </section>
        );
      })}
    </section>
  );
};

export default Blog;
