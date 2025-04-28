import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/db';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '../../firebase/config';
import { updateProfilePicture } from '../../firebase/auth';
function Profile() {
  const [userData, setUserData] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      setProfilePictureFile(e.target.files[0]);
    }
  };

  const handleProfilePictureUpload = async () => {
    if (profilePictureFile && auth.currentUser) {
      try {
        setLoading(true);
        const url = await updateProfilePicture(auth.currentUser.uid, profilePictureFile);
        setUserData({ ...userData, profilePicture: url });
        setProfilePictureFile(null);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={userData.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        {profilePictureFile && (
          <button
            onClick={handleProfilePictureUpload}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload Profile Picture
          </button>
        )}
        <h2 className="mt-4 text-2xl font-bold">{userData.fullName}</h2>
        <p className="text-gray-600">@{userData.userName}</p>
        <p className="text-gray-600">{userData.email}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Posts</h3>
        {userData.posts && userData.posts.length > 0 ? (
          <ul className="mt-2 space-y-4">
            {userData.posts.map((post, index) => (
              <li key={index} className="border p-4 rounded">
                <p>{post.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">Likes: {post.likes}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}

export default Profile;