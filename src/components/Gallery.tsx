import Link from 'next/link';
import { PostPropsType } from 'types/PostPropsType';
import Description from './Description';

const Gallery = ({ posts }: { posts: PostPropsType[] }) => {
  return <>
    {posts.map((post) => {
      const { id, title, date, categories } = post;
      return (
        <section className="my-4 pt-4" key={id}>
          <Link
            href={`/blog/posts/${id}`}
            className="font-semibold text-xl xl:text-2xl xl:hover:opacity-hover">
            {title}
          </Link>
          <Description date={date} categories={categories} />
        </section>
      );
    })}
  </>;
};

export default Gallery;
