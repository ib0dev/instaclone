import { useState } from "react";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'
import clsx from "clsx";

const InstagramLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.error("Login error:", err.message);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 text-black flex-col">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl w-full">
        {/* Image Section */}
        <div className="hidden md:block mr-8">
          <a href="https://imgbb.com/">
            <img
              src="https://i.ibb.co/Q8X79RK/image.png"
              alt="instagram"
              className="w-96"
            />
          </a>
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center w-full max-w-sm">
          {/* Login Box */}
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-sm px-2 py-3 text-[12px] focus:outline-none peer"
                  id="uname"
                  placeholder="Phone number, username, or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-sm px-2 py-3 text-[12px] focus:outline-none peer"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2" onClick={
                  () => setIsPasswordVisible(!isPasswordVisible)
                }>
                  {
                    isPasswordVisible ? <FaRegEyeSlash className="size-5 cursor-pointer text-gray-800"/> : 
                    <FaRegEye className="size-5 cursor-pointer text-gray-800"/>
                  }
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-xs text-center">{error}</p>
              )}
              <button
                type="submit"
                className={clsx("w-full bg-blue-500 text-white rounded py-2 text-sm hover:bg-blue-600 transition cursor-pointer", isLoading && "opacity-75")}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </form>
            <div className="mt-6 text-center">
              <div className="relative flex items-center justify-center my-4">
                <span className="absolute bg-white px-2 text-gray-500 text-xs font-medium">
                  OR
                </span>
                <span className="w-full h-px bg-gray-300"></span>
              </div>
              <p className="text-blue-800 text-sm font-medium cursor-pointer flex items-center justify-center">
                <i className="fab fa-facebook-square mr-2 text-base"></i>
                Login with Facebook
              </p>
              <a
                href="#"
                className="block mt-4 text-blue-900 text-xs hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Sign Up Box */}
          <div className="bg-white border border-gray-300 rounded-sm w-full p-4 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <a
                href="/sign-up" // Updated to link to /sign-up
                className="text-blue-500 font-medium hover:underline"
              >
                Sign up
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

export default InstagramLogin;