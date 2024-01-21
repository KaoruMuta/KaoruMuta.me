import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';
import { PostPropsType } from 'types/PostPropsType';
import { formatDate } from './date';

const postsDirectory = path.join(process.cwd(), 'posts');

const loadAllPosts = (directoryPath: string): PostPropsType[] => {
  const resources = fs.readdirSync(directoryPath, { encoding: 'utf-8', withFileTypes: true, recursive: true });
  const allPosts = resources
    .filter((resource) => resource.isFile())
    .map((file) => {
      const postContents = fs.readFileSync(`${file.path}/${file.name}`, 'utf-8');
      const matterResult = matter(postContents);
      const { title, date, categories } = matterResult.data;
      const contentHtml = marked(matterResult.content);
      const formattedDate = formatDate(date);
      const categoryList = categories !== undefined || !categories.length ? categories.split(' ') : [];

      return {
        title: title,
        content: contentHtml,
        date: formattedDate,
        categories: categoryList,
      };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((post, index) => {
      const postId = (index + 1).toString();
      return {
        id: postId,
        ...post,
      };
    });

  return allPosts;
};

export const loadAllSortedPostsByDate = () => {
  const allPosts = loadAllPosts(postsDirectory);
  return allPosts.reverse();
};

export const loadAllPostIds = () => {
  const allPosts = loadAllPosts(postsDirectory);

  return allPosts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
};

export const loadPostById = (id: string) => {
  const allPosts = loadAllPosts(postsDirectory);
  return allPosts.find((post) => post.id === id);
};

export const loadAllCategories = () => {
  const allPosts = loadAllPosts(postsDirectory);
  const allCategories = allPosts.flatMap((post) => post.categories);
  const allUniqueCategories = Array.from(new Set(allCategories));

  return allUniqueCategories.map((category) => {
    return {
      params: {
        category: category,
      },
    };
  });
};

export const loadSortedPostsForCategoryByDate = (category: string) => {
  const allSortedPostsByDate = loadAllSortedPostsByDate();
  return allSortedPostsByDate.filter((post) => post.categories.includes(category));
};
