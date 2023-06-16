import { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const boolenText = comment.length === 0;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center px-3 selection:border-t border-neutral-300"
    >
      <SmileIcon />
      <input
        className="w-full ml-2 boder-none outline-none p-3"
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className={`font-bold ${boolenText ? "text-sky-200" : "text-sky-500"}`}
      >
        Post
      </button>
    </form>
  );
}
