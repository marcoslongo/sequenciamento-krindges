import { useSession, signIn, signOut } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    loading: status === "loading",
    login: signIn,
    logout: signOut,
  };
};