import useSWR from "swr";
import { HomeUser, SimpleUser } from "@/model/user";
import { useCallback } from "react";

function updateBookmark(postId: string, bookmark: boolean) {
  return fetch("/api/bookmark", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

function updateFollowing(targetId: string, following: boolean) {
  return fetch("/api/following", {
    method: "PUT",
    body: JSON.stringify({ id: targetId, following }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");
  //   const { mutate } = useSWRConfig();

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = user.bookmarks ?? [];
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((b) => b !== postId),
      };
      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );
  const setFollowing = useCallback(
    (targetId: string, following: boolean) => {
      return mutate(updateFollowing(targetId, following), {
        populateCache: false,
      });
    },
    [mutate]
  );
  return { user, isLoading, error, setBookmark, setFollowing };
}
