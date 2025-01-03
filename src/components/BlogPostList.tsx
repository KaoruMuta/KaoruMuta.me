import Link from 'next/link';
import { PostPropsType } from 'types/PostPropsType';
import Description from './Description';

const BlogPostList = ({ posts }: { posts: PostPropsType[] }) => {
  return (
    <>
      {posts.map((post) => {
        const { id, title, date, categories } = post;
        return (
          <>
            <section className="py-4" key={id}>
              <Link href={`/blog/posts/${id}`}>
                <h2 className="font-semibold text-xl xl:text-2xl xl:hover:opacity-hover">{title}</h2>
              </Link>
              <Description date={date} categories={categories} />
            </section>
            <hr />
          </>
        );
      })}
    </>
  );
};

export default BlogPostList;
