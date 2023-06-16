"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type usePathDetail = {
  useItemList: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
};

export type usePathType = {
  useStateData: usePathDetail;
};

export const PathContext = createContext({} as usePathType);

type props = {
  children: React.ReactNode;
};
export default function PathProvider({ children }: props) {
  const [path, setPath] = useState("");
  const useStateData: usePathDetail = {
    useItemList: { value: path, set: setPath },
  };
  return (
    <PathContext.Provider value={{ useStateData }}>
      {children}
    </PathContext.Provider>
  );
}

export const usePathUrl = () => useContext(PathContext);
