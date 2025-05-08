import { supabase } from './config';

// Create a new post
export async function createPost(userId, content, imageFile = null) {
  try {
    let imageUrl = '';
    
    // Upload image to Supabase Storage if provided
    if (imageFile) {
      const fileName = `${userId}/posts/${Date.now()}_${Math.random().toString(36).substring(2)}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, imageFile, {
          upsert: true,
        });
      if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

      // Get public URL for the uploaded image
      const { data: urlData } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName);
      if (!urlData?.publicUrl) throw new Error('Failed to get image URL');
      imageUrl = urlData.publicUrl;
    }

    // Create post in the database
    const postData = {
      user_id: userId,
      content: content || '',
      media_url: imageUrl || '',
      created_at: new Date().toISOString(),
    };

    const { data, error: postError } = await supabase
      .from('posts')
      .insert(postData)
      .select()
      .single();
    
    if (postError) throw new Error(`Post creation failed: ${postError.message}`);

    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Read all posts (with optional pagination)
export async function getPosts(limit = 10, offset = 0, currentUserId) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          user_name,
          full_name,
          profile_picture
        ),
        likes!post_likes (count, user_id)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch posts: ${error.message}`);

    // Process the data to include like count and whether the current user liked the post
    const processedData = data.map(post => {
      const likeCount = post.likes?.length || 0;
      const userLiked = post.likes?.some(like => like.user_id === currentUserId) || false;
      return {
        ...post,
        likeCount,
        userLiked,
      };
    });

    return processedData;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

// Read a single post by ID
export async function getPostById(postId, currentUserId) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          user_name,
          full_name,
          profile_picture
        ),
        likes!post_likes (count, user_id)
      `)
      .eq('id', postId)
      .single();

    if (error) throw new Error(`Failed to fetch post: ${error.message}`);
    if (!data) throw new Error('Post not found');

    const likeCount = data.likes?.length || 0;
    const userLiked = data.likes?.some(like => like.user_id === currentUserId) || false;

    return {
      ...data,
      likeCount,
      userLiked,
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

// Read posts by user ID
export async function getPostsByUser(userId, limit = 10, offset = 0, currentUserId) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          user_name,
          full_name,
          profile_picture
        ),
        likes!post_likes (count, user_id)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Failed to fetch user posts: ${error.message}`);

    const processedData = data.map(post => {
      const likeCount = post.likes?.length || 0;
      const userLiked = post.likes?.some(like => like.user_id === currentUserId) || false;
      return {
        ...post,
        likeCount,
        userLiked,
      };
    });

    return processedData;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw error;
  }
}

// Update a post
export async function updatePost(postId, userId, updates) {
  try {
    // Verify post exists and belongs to user
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', postId)
      .single();

    if (fetchError) throw new Error(`Failed to fetch post: ${fetchError.message}`);
    if (!existingPost) throw new Error('Post not found');
    if (existingPost.user_id !== userId) throw new Error('Unauthorized to update this post');

    // Handle image update if provided
    let imageUrl = updates.media_url || '';
    if (updates.imageFile) {
      const fileName = `${userId}/posts/${Date.now()}_${Math.random().toString(36).substring(2)}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, updates.imageFile, {
          upsert: true,
        });
      if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

      const { data: urlData } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName);
      if (!urlData?.publicUrl) throw new Error('Failed to get image URL');
      imageUrl = urlData.publicUrl;
    }

    // Prepare update data
    const updateData = {
      content: updates.content,
      media_url: imageUrl,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', postId)
      .select()
      .single();

    if (error) throw new Error(`Post update failed: ${error.message}`);

    return data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

// Delete a post
export async function deletePost(postId, userId) {
  try {
    // Verify post exists and belongs to user
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('user_id, media_url')
      .eq('id', postId)
      .single();

    if (fetchError) throw new Error(`Failed to fetch post: ${fetchError.message}`);
    if (!existingPost) throw new Error('Post not found');
    if (existingPost.user_id !== userId) throw new Error('Unauthorized to delete this post');

    // Delete associated image from storage if exists
    if (existingPost.media_url) {
      const filePath = existingPost.media_url.split('/').slice(-2).join('/');
      const { error: storageError } = await supabase.storage
        .from('post-images')
        .remove([filePath]);
      if (storageError) console.warn('Failed to delete image:', storageError.message);
    }

    // Delete post
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) throw new Error(`Post deletion failed: ${error.message}`);

    return { success: true, postId };
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

// Like/unlike a post
export async function togglePostLike(postId, userId) {
  try {
    // Check if user already liked the post
    const { data: existingLike, error: likeError } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (likeError && likeError.code !== 'PGRST116') {
      throw new Error(`Failed to check like status: ${likeError.message}`);
    }

    let updatedLikes;
    if (existingLike) {
      // Unlike: Remove like
      const { error: deleteError } = await supabase
        .from('post_likes')
        .delete()
        .eq('id', existingLike.id);
      if (deleteError) throw new Error(`Failed to unlike post: ${deleteError.message}`);
    } else {
      // Like: Add like
      const { error: insertError } = await supabase
        .from('post_likes')
        .insert({ post_id: postId, user_id: userId });
      if (insertError) throw new Error(`Failed to like post: ${insertError.message}`);
    }

    // Fetch updated like count
    const { data: likeData, error: countError } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId);

    if (countError) throw new Error(`Failed to fetch like count: ${countError.message}`);
    updatedLikes = likeData.length;

    return { postId, likes: updatedLikes, liked: !existingLike };
  } catch (error) {
    console.error('Error toggling post like:', error);
    throw error;
  }
}