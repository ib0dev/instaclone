import { supabase } from './config';

async function addUserToDatabase(user, fullName, userName, profilePicture) {
  try {
    const { error } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email,
        full_name: fullName,
        user_name: userName,
        profile_picture: profilePicture || '',
        created_at: new Date().toISOString(),
      });
    if (error) throw error;
  } catch (error) {
    console.error('Error adding user to database:', error);
    throw error;
  }
}

export async function signUp(email, password, fullName, userName, posts, profilePictureFile) {
  try {
    // Sign up user
    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authError) throw authError;

    let profilePictureUrl = '';
    if (profilePictureFile) {
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(`${user.id}/profile.jpg`, profilePictureFile, {
          upsert: true,
        });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(`${user.id}/profile.jpg`);
      profilePictureUrl = urlData.publicUrl;
    }

    await addUserToDatabase(user, fullName, userName, profilePictureUrl);

    // Add initial post
    const initialPosts =
      posts && posts.length > 0
        ? posts
        : [
            {
              user_id: user.id,
              content: `Welcome post by ${userName}!`,
              created_at: new Date().toISOString(),
              likes: 0,
            },
          ];
    for (const post of initialPosts) {
      await supabase.from('posts').insert(post);
    }

    return user;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
}

export const updateProfilePicture = async (userId, file) => {
  try {
    // Upload file to Supabase Storage
    const fileName = `${userId}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(fileName, file);
    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(fileName);
    if (!publicUrlData?.publicUrl) throw new Error("Failed to get public URL");

    const newProfilePictureUrl = publicUrlData.publicUrl;

    // Update the users table
    const { error: updateError } = await supabase
      .from('users')
      .update({ profile_picture: newProfilePictureUrl })
      .eq('id', userId);
    if (updateError) throw new Error(`Database update failed: ${updateError.message}`);

    return newProfilePictureUrl;
  } catch (error) {
    throw error;
  }
};

export async function logOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
}

supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    console.log('User is signed in:', session.user.id);
  } else {
    console.log('No user signed in');
  }
});