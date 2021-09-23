import { InferGetStaticPropsType } from 'next';
import Description from '../../../components/Description';
import Title from '../../../components/Title';
import { loadAllPostIds, loadPostById } from '../../../lib/blog/posts';

export function getStaticProps({ params }: { params: { id: string } }) {
  const post = loadPostById(params.id);
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
  const { title, content, date, categories } = post;
  return (
    <article className="font-sans my-8 xl:my-16">
      <Title name={title} />
      <Description date={date} categories={categories} />
      <hr className="mt-4"></hr>
      <article className="py-4 max-w-none prose xl:prose-xl" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default Post;
