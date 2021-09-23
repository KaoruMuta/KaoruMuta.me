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
      <h1 className="font-bold text-4xl xl:text-5xl">tionblog</h1>
      {allSortedPostsByDate.map((post) => {
        const { id, title, date } = post;
        return (
          <section className="flex flex-col my-4 pt-4" key={id}>
            <Link href={`blog/posts/${id}`}>
              <a className="flex-1 flex-wrap font-semibold text-xl xl:text-2xl">{title}</a>
            </Link>
            <time className="flex-1 text-sm">{date}</time>
          </section>
        );
      })}
    </section>
  );
};

export default Blog;
