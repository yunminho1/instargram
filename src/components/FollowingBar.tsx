"use client";
import { HomeUser, SimpleUrlUser } from "@/model/user";
import useSWR from "swr";
import { PropagateLoader } from "react-spinners";
import Link from "next/link";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<HomeUser>("/api/me");
  const users = data?.follwing;
 

  //1.클라이언트 컴포넌트에서 백엔드에게 api/me 사용자의 정보를 얻어옴
  //2.백엔드에서는 guswo fhrmdlsehls tkdydwkdml tptuswjdqhffm dldydgotj
  //3. ㅅ백엔드에서 사용자의 상세정보를 snity에서
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-netural-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
      {loading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users?.length === 0) && (
          <p>{`팔로잉한 사용자가 존재 하지 않습니다.`}</p>
        )
      )}
      {users && users?.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className="flex flex-col items-center w-20"
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
