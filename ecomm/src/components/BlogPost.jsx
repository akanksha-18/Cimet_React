// src/pages/BlogPost.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
};

export default BlogPost;