import React from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { SchoolProvider } from "./SchoolContext";


const AppProviders = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      <SchoolProvider>{children}</SchoolProvider>
    </UserProvider>
  </AuthProvider>
);

export default AppProviders;
