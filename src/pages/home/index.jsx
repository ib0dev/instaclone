import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import PostCard from "@/components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: postsData, error } = await supabase
          .from('posts')
          .select(`
            id,
            media_url,
            content,
            created_at,
            user_id,
            users (user_name, profile_picture)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const postIds = postsData.map(post => post.id);
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select('post_id')
          .in('post_id', postIds);

        if (commentsError) throw commentsError;

        const commentCounts = commentsData.reduce((acc, comment) => {
          acc[comment.post_id] = (acc[comment.post_id] || 0) + 1;
          return acc;
        }, {});

        const fetchedPosts = postsData.map(post => ({
          id: post.id,
          postProfileImg: post.users.profile_picture || '/src/assets/images/nopp.jpg',
          postImageUrl: post.media_url,
          postUserName: post.users.user_name,
          comments: commentCounts[post.id] || 0,
          postCap: post.content,
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
          key={index}
          postProfileImg={post.postProfileImg}
          postImageUrl={post.postImageUrl}
          postUserName={post.postUserName}
          comments={post.comments}
          postCap={post.postCap}
        />
      ))}
    </div>
  );
}

export default Home;