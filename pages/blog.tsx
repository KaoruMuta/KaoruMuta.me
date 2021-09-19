import { NextPage } from 'next';

const Blog: NextPage = () => {
  return (
    <section className="font-sans divide-y mt-8 xl:mt-16">
      <h1 className="font-semibold text-2xl xl:text-4xl">tionblog</h1>
      <section className="flex flex-row mt-2 pt-2">
        <time>2021/09/01</time>
        <h2 className="ml-16 font-semibold">Next.jsでブログを作成しました</h2>
      </section>
    </section>
  );
};

export default Blog;
