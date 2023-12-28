export type PostPropsType = {
  id: string;
  title: string;
  content: string | Promise<string>;
  date: string;
  categories: string[];
};
