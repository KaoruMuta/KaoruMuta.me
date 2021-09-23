import { InferGetStaticPropsType } from 'next';
import { loadAllPostIds, loadPost } from '../../../lib/blog/posts';
import { GetStaticPropsType } from '../../../types/GetStaticPropsType';

export function getStaticProps({ params }: GetStaticPropsType) {
  const post = loadPost(params.id);
  return {
    props: {
      post,
    },
  };
}

export function getStaticPaths() {
  const paths = loadAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, content, date } = post;
  return (
    <article className="font-sans my-8 xl:my-16">
      <h1 className="font-bold text-4xl xl:text-5xl">{title}</h1>
      <time className="block mt-1 text-sm">{date + 'に投稿'}</time>
      <hr className="mt-4"></hr>
      <article className="py-4 max-w-none prose xl:prose-xl" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default Post;
