import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./UseLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [keyName, setKeyName] = useState("");
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  console.log(user);

  const login = async (data: any) => {
    console.log(data);
    setKeyName(data.username);
    setUser(data);
    navigate("/loginDashboard");
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
