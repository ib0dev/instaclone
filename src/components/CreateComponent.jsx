import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { MediaIcon } from "../assets/icons/allicons";
import { useState } from "react";
import { createPost, } from "../supabase/posts";
import { supabase } from "../supabase/config";

function CreateComponent({ isOpen, close }) {
  const [postContent, setPostContent] = useState("");
  const [postImageFile, setPostImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendPost() {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in");

      // Create post
      await createPost(user.id, postContent, postImageFile);
      
      // Reset form and close dialog
      setPostContent("");
      setPostImageFile(null);
      close();
    } catch (err) {
      setError(err.message);
      console.error("Post creation failed:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 flex-col">
            <DialogPanel
              transition
              className="w-[537px] h-[543px] bg-[#262626] flex justify-center flex-col items-center"
            >
              <p className="mt-2 text-sm/6 text-white/50">
                <MediaIcon />
              </p>
              <p className="text-xl">Create a new post</p>
              <div className="w-full max-w-sm min-w-[200px]">
                <textarea
                  className="w-full placeholder:text-slate-400 text-sm border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow mt-4"
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="w-full placeholder:text-slate-400 text-sm border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow mt-4"
                  onChange={(e) => setPostImageFile(e.target.files[0])}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>
              <Button
                onClick={sendPost}
                disabled={isLoading}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isLoading ? "Posting..." : "Post"}
              </Button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateComponent;