import Link from 'next/link';
import { FaTags } from 'react-icons/fa';

const Description = ({ date, categories }: { date: string; categories: string[] }) => {
  return (
    <section className="flex flex-col items-start mt-2 xl:flex-row">
      <time className="block flex-1 text-sm">{`${date}に投稿`}</time>
      <section className="flex flex-wrap flex-1 items-center mt-2 xl:justify-end xl:mt-0">
        <FaTags className="xl:ml-8" />
        {categories.map((category) => {
          return (
            <Link href={`/blog/categories/${category}`} key={category} className="ml-2 text-sm xl:hover:opacity-hover">
              {category}
            </Link>
          );
        })}
      </section>
    </section>
  );
};

export default Description;
