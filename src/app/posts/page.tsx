"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

type PostType = {
  postsMessage: string;
};

const Posts = () => {
  const [posts, setPosts] = useState<PostType | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get<PostType>(
        "http://localhost:3000/api/posts"
      );
      console.log(response.data);
      setPosts(response.data);
    };
    fetchPosts();
  }, []);
  return (
    <>
      {posts ? (
        <h1>These are the posts - {posts.postsMessage} </h1>
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
};

export default Posts;
