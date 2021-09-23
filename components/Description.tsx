import { FaTags } from 'react-icons/fa';

const Description = ({ date, categories }: { date: string; categories: string[] }) => {
  return (
    <section className="flex flex-col items-start mt-2 xl:flex-row">
      <time className="block flex-1 text-sm">{`${date}に投稿`}</time>
      <section className="flex flex-row flex-wrap flex-1 items-center mt-2 xl:justify-end xl:mt-0">
        <FaTags className="ml-0 xl:ml-8" />
        {categories.map((category) => {
          return (
            <span className="ml-2 text-sm" key={category}>
              {category}
            </span>
          );
        })}
      </section>
    </section>
  );
};

export default Description;
