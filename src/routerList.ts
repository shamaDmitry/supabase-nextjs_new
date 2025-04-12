import { v4 as uuidv4 } from "uuid";

export const protectedRoutes = ["/account", "/dashboard"];

export const authRoutes = ["/login", "/signup"];

export const navMenu = [
  {
    id: uuidv4(),
    name: "Home",
    path: "/",
    isProtected: false,
  },
  {
    id: uuidv4(),
    name: "Dashboard",
    path: "/dashboard",
    isProtected: true,
  },
  {
    id: uuidv4(),
    name: "Account",
    path: "/account",
    isProtected: true,
  },
];
