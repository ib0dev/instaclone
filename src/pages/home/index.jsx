import React, { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { postsCollection } from "./../../firebase/db";
import PostCard from "../../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await getDocs(postsCollection);
        const fetchedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="mt-4">
      {posts.map((post, index) => (
        <PostCard
          postProfileImg={post.postProfileImg}
          postImageUrl={post.postImageUrl}
          postUserName={post.postUserName}
          likes={post.likes}
          comments={post.comments}
          postCap={post.postCap}
        />
      ))}
    </div>
  );
}

export default Home;
