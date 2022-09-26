import { AuthVar } from "../apollo/initialState";

export const resetAuthvar = () => {
  AuthVar({
    isLogin: false,
    token: null,
    id: null,
    email: null,
    role: "CUSTOMER",
  });
};

export const logout = (navigate: any) => {
  localStorage.removeItem("auth");
  resetAuthvar();
  navigate("/login");
};
