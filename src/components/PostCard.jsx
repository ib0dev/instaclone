import React from "react";
import { CommentIcon, LikeIcon, MorePostIcon, SaveIcon, ShareIcon } from "@/assets/icons/allicons";

function PostCard({postUserName,postProfileImg,postImageUrl,likes,comments,postCap}) {
  return (
    <div id="card" className="w-[470px] mt-4">
      <div>
        <div className="flex justify-between items-center pl-1 pb-3">
          <div className="flex gap-2 items-center">
            <div>
              <img
                src={postProfileImg}
                alt=""
                className="w-[32px] h-[32px] object-cover rounded-full"
              />
            </div>
            <div className="text-sm font-semibold">{postUserName}</div>
          </div>
          <MorePostIcon />
        </div>
        <div className="flex justify-center">
          <img
            src={postImageUrl}
            alt=""
          />
        </div>
        <div className="flex justify-between mt-3">
          <div className="flex gap-4">
            <LikeIcon />
            <CommentIcon />
            <ShareIcon />
          </div>
          <div>
            <SaveIcon />
          </div>
        </div>
        <div className="text-sm font-semibold mt-4">{likes} likes</div>
        <div className="flex gap-1">
          <div className="text-sm font-semibold">{postUserName}</div>
          <div className="text-sm">{postCap}</div>
        </div>
        <div className="text-sm text-[#A8A8A8] mt-1">View all {comments.length} comments</div>
      </div>
    </div>
  );
}

export default PostCard;
