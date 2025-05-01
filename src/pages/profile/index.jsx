import { useState, useEffect } from "react";
import { db } from "../../firebase/db";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../../firebase/config";
import { updateProfilePicture } from "../../firebase/auth"; // Import the updateProfilePicture function
import Posts from "../../components/Posts";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null); // State for the selected file

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

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle profile picture update
  const handleUpdateProfilePicture = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const newProfilePictureUrl = await updateProfilePicture(user.uid, file);
        // Update userData state with the new profile picture URL
        setUserData((prev) => ({
          ...prev,
          profilePicture: newProfilePictureUrl,
        }));
        alert("Profile picture updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture.");
    } finally {
      setLoading(false);
      setFile(null); // Clear the file input
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="min-h-screen font-sans pb-12">
      <header>
        <div className="mx-auto px-4">
          <div className="pt-12 pb-8 @supports (display: grid) { grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-8 items-center }">
            <div className="flex justify-center md:justify-start mb-4 md:mb-0">
              <img
                src={
                  userData.profilePicture
                    ? userData.profilePicture
                    : "/src/assets/images/nopp.jpg"
                }
                alt="Profile"
                className="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover"
              />
            </div>
            <div>
              <div className="flex items-center mb-6">
                <h1 className="text-3xl md:text-4xl font-light mr-4">
                  {userData.userName}
                </h1>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-[#363636] px-4 rounded-[8px] py-1 font-semibold"
                />
                <button
                  onClick={handleUpdateProfilePicture}
                  className="bg-[#363636] px-4 rounded-[8px] py-1 font-semibold ml-2"
                  disabled={!file || loading}
                >
                  Update Picture
                </button>
                <button className="bg-[#363636] px-4 rounded-[8px] py-1 font-semibold ml-2">
                  View Archive
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
                  <span className="font-semibold">{userData.posts.length}</span>
                  <span className="text-[#A7A7A7]"> posts</span>
                </li>
                <li>
                  <span className="font-semibold">188</span>
                  <span className="text-[#A7A7A7]"> followers</span>
                </li>
                <li>
                  <span className="font-semibold">206</span>
                  <span className="text-[#A7A7A7]"> following</span>
                </li>
              </ul>
              <p className="text-base md:text-lg">
                <span className="font-semibold">{userData.fullName}</span>{" "}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="w-full h-[1px] bg-[#353535]"></div>
      <Posts userData={userData} />
    </div>
  );
}

export default Profile;