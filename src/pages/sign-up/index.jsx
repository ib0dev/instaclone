import React, { useState } from "react";
import { signUp } from "../../firebase/auth"; // Import signUp from auth.js
import { useNavigate } from "react-router";

const InstagramSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /* TODO: loading */
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password,fullName,userName); 
      console.log("User signed up successfully");
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.error("Signup error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 text-black flex-col">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl w-full">
    
        {/* Content Section */}
        <div className="flex flex-col items-center w-full max-w-sm">
          {/* Signup Box */}
          <div className="bg-white border border-gray-300 rounded-sm w-full p-6 mb-2">
            <div className="text-center mb-6">
              <a href="https://ibb.co/XtKd6c7">
                <img
                  src="https://i.ibb.co/2dCLRGv/logoname.png"
                  alt="logoname"
                  className="mx-auto w-48"
                />
              </a>
            </div>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-sm px-2 py-3 text-[12px] focus:outline-none peer"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-sm px-2 py-3 text-[12px] focus:outline-none peer"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="relative">
                {/* TODO: eye icon */}
                <input
                  type="text"
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-sm px-2 py-3 text-[12px] focus:outline-none peer"
                  id="fullname"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-sm px-2 py-3 text-[12px] focus:outline-none peer"
                  id="username"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded py-2 text-sm hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Login Box */}
          <div className="bg-white border border-gray-300 rounded-sm w-full p-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-500 font-medium hover:underline"
              >
                Log in
              </a>
            </p>
          </div>

          {/* Download Section */}
          <div className="mt-6 text-center">
            <p className="text-sm mb-4">Get the app.</p>
            <div className="flex justify-center gap-2">
              <a href="https://imgbb.com/">
                <img
                  src="https://i.ibb.co/5KyMHpd/appstore.png"
                  alt="appstore"
                  className="w-32"
                />
              </a>
              <a href="https://imgbb.com/">
                <img
                  src="https://i.ibb.co/ZTHhz0b/playstore.png"
                  alt="playstore"
                  className="w-32"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4">
        <ul className="flex flex-wrap justify-center gap-4 mb-6 max-w-lg mx-auto">
          {[
            "About",
            "Blog",
            "Jobs",
            "Help",
            "API",
            "Privacy",
            "Terms",
            "Top Accounts",
            "Hashtags",
            "Locations",
          ].map((item) => (
            <li
              key={item}
              className="text-gray-500 text-xs cursor-pointer hover:underline"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="flex justify-center items-center gap-4">
          <select
            aria-label="Switch Display Language"
            className="bg-transparent text-gray-500 text-xs border-none cursor-pointer"
          >
            {[
              { value: "en", label: "English" },
              { value: "es", label: "Español" },
              { value: "fr", label: "Français" },
              { value: "de", label: "Deutsch" },
              { value: "ja", label: "日本語" },
            ].map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <span className="text-gray-500 text-xs">
            © 2021 Instagram from Facebook
          </span>
        </div>
      </footer>
    </div>
  );
};

export default InstagramSignup;