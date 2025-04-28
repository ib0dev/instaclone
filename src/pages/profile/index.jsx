import { useState, useEffect } from "react";
import { db } from "../../firebase/db";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../../firebase/config";
function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="min-h-screen font-sans  pb-12">
      <header>
        <div className=" mx-auto px-4">
          <div className="pt-12 pb-8 @supports (display: grid) { grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-8 items-center }">
            <div className="flex justify-center md:justify-start mb-4 md:mb-0">
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center mb-6">
                <h1 className="text-3xl md:text-4xl font-light mr-4">
                  {userData.userName}
                </h1>
                <button className="border border-gray-300 rounded px-4 py-1 text-sm font-semibold mt-2 md:mt-0">
                  Edit Profile
                </button>
                <button
                  className="ml-2 text-2xl mt-2 md:mt-0"
                  aria-label="profile settings"
                >
                  <i className="fas fa-cog"></i>
                </button>
              </div>
              <ul className="flex space-x-8 mb-6 text-base md:text-lg">
                <li>
                  <span className="font-semibold">{userData.posts.length}</span>{" "}
                  posts
                </li>
                <li>
                  <span className="font-semibold">188</span> followers
                </li>
                <li>
                  <span className="font-semibold">206</span> following
                </li>
              </ul>
              <p className="text-base md:text-lg">
                <span className="font-semibold">{userData.fullName}</span>{" "}
              </p>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap -mx-2 pb-12 md:@supports (display: grid) { grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 }">
            {userData.posts.map((post, index) => (
              <div
                key={index}
                className="relative m-2 md:m-0 flex-1 min-w-[200px] max-w-[300px] md:max-w-none"
                tabIndex="0"
              >
                <img
                  src={post.postImage}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity">
                  <ul className="flex space-x-4 text-white text-lg font-semibold">
                    <li>
                      <i className="fas fa-heart"></i> {post.likes}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
