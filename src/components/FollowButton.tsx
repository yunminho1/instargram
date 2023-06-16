"use client";
import useMe from "@/hook/useMe";
import { HomeUser, ProfileUser } from "@/model/user";
import { useRouter } from "next/navigation";
import { startTransition, useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";
import useSWR from "swr";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  //const { data: loggedInuser } = useSWR<HomeUser>("/api/me");
  const { user: loggedInuser, setFollowing } = useMe();
  const router = useRouter();
  const [isPeanding, startTransition] = useTransition();
  const [isFetching, setFetcing] = useState(false);
  const isUpdating = isPeanding || isFetching;

  const showButton = loggedInuser && loggedInuser?.username !== username;
  const following =
    loggedInuser && loggedInuser.follwing
      ? loggedInuser.follwing.find((item) => item.username === username)
      : false;

  const followingBooelan = following ? true : false;
  const text = following ? "Unfollow" : "Follow";
  const handelClick = async () => {
    setFetcing(true);
    await setFollowing(user.id, !followingBooelan);
    setFetcing(false);
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating &&<div className="absolute z-20 inset-0 flex justify-center items-center"> <PulseLoader size={6}/></div>}
          <Button disabled={isUpdating} text={text} onClick={handelClick} red={text == "Unfollow"} />
        </div>
      )}
    </>
  );
}
