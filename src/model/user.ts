export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
};

export type SimpleUser = Pick<AuthUser, "username" | "image">;
export type SimpleUrlUser = Pick<AuthUser, "username"> & {
  image: string;
};

export type HomeUser = AuthUser & {
  follwing: SimpleUser[];
  follwers: SimpleUser[];
  bookmarks: string[];
};

export type SearchUser = AuthUser & {
  follwing: number;
  follwers: number;
};

export type ProfileUser = SearchUser & {
  posts: number;
};
