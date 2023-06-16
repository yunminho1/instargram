"use client";
import usePosts from "@/hook/usePosts";
import { Comment, SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import ActionBar from "./ActionBar";
import ModalPortal from "./ModalPortal";
import PostDetail from "./PostDetail";
import PostModal from "./PostModal";
import PostUserAvartar from "./PostUserAvartar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();
  const handleComment = (comment: Comment) => {
    postComment(post, comment);
  };
  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <PostUserAvartar image={userImage} username={username} />
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onPostComment={handleComment}>
        {text && (
          <p>
            <span className="font-bold mr-1">{username}</span>
            {text}
          </p>
        )}
        {comments >= 1 && (
          <button
            onClick={() => setOpenModal(true)}
            className="font-bold text-sky-500 text-sm my-2"
          >
            {`View all ${comments} comments`}
          </button>
        )}
      </ActionBar>

      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
