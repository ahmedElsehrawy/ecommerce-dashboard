import { makeVar } from "@apollo/client";

export interface Auth {
  isLogin: boolean;
  token: string | null;
  id: number | null;
  email: string | null;
  role: "CUSTOMER" | "VENDOR";
}

const userInitialValue: Auth = {
  isLogin: false,
  token: null,
  id: null,
  email: null,
  role: "CUSTOMER",
};

export const AuthVar = makeVar<Auth>(userInitialValue);
