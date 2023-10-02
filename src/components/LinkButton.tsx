import Link from 'next/link';

const LinkButton = ({
  destination,
  isHighlighted,
  name,
}: {
  destination: string;
  isHighlighted: boolean;
  name: string;
}) => {
  return (
    <Link
      href={destination}
      className={
        isHighlighted ? 'border-b border-black xl:hover:opacity-hover' : 'border-b border-white xl:hover:opacity-hover'
      }
    >
      {name}
    </Link>
  );
};

export default LinkButton;
