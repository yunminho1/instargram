import { createContext, useContext } from "react";

type cashKeyValue = {
  postsKey: string;
};
export const CashKeyContext = createContext<cashKeyValue>({
  postsKey: "/api/posts",
});

export function useCashKey() {
  return useContext(CashKeyContext);
}
