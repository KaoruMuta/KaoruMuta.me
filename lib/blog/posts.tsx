import fs from 'fs';
import matter from 'gray-matter';
import marked from 'marked';
import path from 'path';
import { PostPropsType } from '../../types/PostPropsType';
import { formatDate } from '../date';

const postsDirectory = path.join(process.cwd(), 'posts');

const loadAllPosts = (directoryPath: string): PostPropsType[] => {
  const fileNames = fs.readdirSync(directoryPath);
  const allPosts = fileNames
    .map((fileName) => {
      const fullPostPath = path.join(postsDirectory, fileName);
      const postContents = fs.readFileSync(fullPostPath, 'utf-8');
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

export function loadAllSortedPostsByDate() {
  const allPosts = loadAllPosts(postsDirectory);
  return allPosts.reverse();
}

export function loadAllPostIds() {
  const allPosts = loadAllPosts(postsDirectory);

  return allPosts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}

export function loadPost(id: string) {
  const allPosts = loadAllPosts(postsDirectory);
  return allPosts.find((post) => post.id === id);
}
