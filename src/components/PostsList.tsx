import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts'
        );
        const tenPosts = response.data.slice(0, 10);
        setPosts(tenPosts);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ol>
        {posts.length ? (
          posts.map((post) => (
            <li key={post.id}>
              <div>{post.title}</div>
              <Link to={`/post/${post.id}`}>Подробнее</Link>
            </li>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ol>
    </div>
  );
};

export default PostsList;
