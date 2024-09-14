"use client";

import React, { useContext, useState, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

const UserContext = React.createContext();

export function UserProvider({ children, value }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user.email);
    });
  }, [setCurrentUser]);
  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}

export function useUserValue() {
  return useContext(UserContext);
}
