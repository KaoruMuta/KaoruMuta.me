import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';
import { PostPropsType } from '../types/PostPropsType';

const POST_BASE_DIR = path.join(process.cwd(), 'posts');

const loadAllPosts = (directoryPath: string): PostPropsType[] => {
  return fs
    .readdirSync(directoryPath, { encoding: 'utf-8', recursive: true })
    .sort((a, b) => a.localeCompare(b))
    .filter((filePath) => fs.statSync(path.join(directoryPath, filePath)).isFile())
    .map((filePath) => {
      const postContents = fs.readFileSync(path.join(directoryPath, filePath), 'utf-8');
      const matterResult = matter(postContents);
      const { title, date, categories } = matterResult.data;
      const postId = path.basename(filePath).replace(/^[0-9]{8,}-(.*)\.md$/, '$1');
      const displayedCategories = categories == null || !categories.length ? [] : categories.split(' ');
      return {
        id: postId,
        title: title,
        content: marked(matterResult.content),
        date: date,
        categories: displayedCategories,
      };
    });
};

export const loadAllSortedPostsByDate = () => {
  return loadAllPosts(POST_BASE_DIR).sort((a, b) => b.date.localeCompare(a.date));
};

export const loadAllPostIds = () => {
  const allPosts = loadAllPosts(POST_BASE_DIR);

  return allPosts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
};

export const loadPostById = (id: string) => {
  const allPosts = loadAllPosts(POST_BASE_DIR);
  return allPosts.find((post) => post.id === id);
};

export const loadAllCategories = () => {
  const allPosts = loadAllPosts(POST_BASE_DIR);
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
