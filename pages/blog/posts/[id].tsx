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
    <article className="font-sans mt-8 xl:mt-16">
      <h1 className="font-semibold text-2xl xl:text-4xl">{title}</h1>
      <time>{date}</time>
      <article className="mt-2 pt-2" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default Post;
