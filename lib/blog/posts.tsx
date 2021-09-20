import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import marked from 'marked';

const postsDirectory = path.join(process.cwd(), 'posts');

const loadAllPosts = (directoryPath: string) => {
  const fileNames = fs.readdirSync(directoryPath);
  const allPosts = fileNames.map((fileName, index) => {
    const postId = (index + 1).toString();
    const fullPostPath = path.join(postsDirectory, fileName);
    const postContents = fs.readFileSync(fullPostPath, 'utf-8');
    const matterResult = matter(postContents);
    const contentHtml = marked(matterResult.content);

    return {
      id: postId,
      content: contentHtml,
      ...matterResult.data,
    };
  });
  return allPosts;
};

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
