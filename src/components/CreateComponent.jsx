import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { MediaIcon } from "../assets/icons/allicons";
import { useState } from "react";

function CreateComponent({ isOpen, close }) {
     const [postImageUrl, setPostImageUrl] = useState("")

     function sendPost(){

          console.log("salam")
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
              <p className="text-xl ">Drag photos and videos here</p>
              <div class="w-full max-w-sm min-w-[200px]">
                <input
                    onChange={e => setPostImageUrl(e.target.value)}
                  class="w-full placeholder:text-slate-400 text-sm border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow mt-4"
                  placeholder="Image URL"
                />
              </div>
              <button onClick={sendPost}></button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateComponent;
