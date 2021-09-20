import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import marked from 'marked';

const postsDirectory = path.join(process.cwd(), 'posts');

const loadAllPosts = (directoryPath: string) => {
  const fileNames = fs.readdirSync(directoryPath);
  const allPosts = fileNames
    .map((fileName) => {
      const fullPostPath = path.join(postsDirectory, fileName);
      const postContents = fs.readFileSync(fullPostPath, 'utf-8');
      const matterResult = matter(postContents);
      const { title, date } = matterResult.data;
      const contentHtml = marked(matterResult.content);

      return {
        title: title,
        content: contentHtml,
        date: date,
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
