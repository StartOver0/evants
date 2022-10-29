import { createContext } from "react";
export const UserContext = createContext({
  user: null,
  username: null,
  profileData: null,
});
export const RouterContext = createContext({ path: "/" });
export const MainLoading = createContext(true);
export const LeaderContext = createContext({ leaderid: null });
