import { client } from "./sanity";
import { SearchUser } from "@/model/user";
type OAuthUser = {
  id: string;
  email: string | null;
  name: string | null;
  username: string;
  image?: string | null;
};
export async function addUser({ id, username, email, name, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image,
    follwing: [],
    follwers: [],
    bookmarks: [],
  });
}

export async function getUserByUserName(username: string) {
  return client.fetch(`
    *[_type=="user" && username=="${username}"][0]{
      ...,
      "id":_id,
      follwing[]->{username,image},
      follwers[]->{username,image},
      "bookmarks":bookmarks[]->_id
    }
  `);
}

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}")||(username match "${keyword}")`
    : "";
  return client
    .fetch(
      `*[_type=="user" ${query}]{
      ...,
      "follwing" : count(follwing),
      "follwers" : count(follwers),
    }
    `
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        follwing: user.follwing ?? 0,
        follwers: user.follwers ?? 0,
      }))
    );
}

export async function getuserForProfile(username: string) {
  return client
    .fetch(
      `*[_type =="user" && username=="${username}"][0]{
      ...,
      "id":_id,
      "follwing":count(follwing),
      "follwers":count(follwers),
      "posts":count(*[_type=="post" && author->username == "${username}"])
    }
    `
    )
    .then((user) => ({
      ...user,
      follwing: user.follwing ?? 0,
      follwers: user.follwers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookMarks(userId: string, postId: string) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookMark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

export async function addFollowing(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (data) =>
      data.setIfMissing({ follwing: [] }).append("follwing", [
        {
          _ref: targetId,
          _type: "reference",
        },
      ])
    )
    .patch(targetId, (data) =>
      data.setIfMissing({ follwers: [] }).append("follwers", [
        {
          _ref: myId,
          _type: "reference",
        },
      ])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeFollowing(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) => user.unset([`follwing[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`follwers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
