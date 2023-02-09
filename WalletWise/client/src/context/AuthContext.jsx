import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userinfo, setUserInfo] = useState({
    email: "",
    id: "",
    loading: true,
  });
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/login/me",
          config
        );
        console.log(response.data);
        if (response.data && response.data.id) {
        }
        setUserInfo({
          email: response.data.data.user.email,
          id: response.data.data.user.id,
          loading: false,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setUserInfo({ email: null, id: null, loading: false });
    }
  }, []);

  return (
    <UserContext.Provider value={[userinfo, setUserInfo]}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
