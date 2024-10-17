"use client";
import { createContext, useState } from "react";

export const Context = createContext({
  users: [
    {
      address: "",
      balance: 0,
      seed: "",
    },
    {
      address: "",
      balance: 0,
      seed: "",
    },
    {
      address: "",
      balance: 0,
      seed: "",
    },
    {
      address: "",
      balance: 0,
      seed: "",
    },
  ],
  setUsers: () => {},
});

export default function ContextProvider({ children }) {
  const [users, setUsers] = useState([
    {
      address: "",
      balance: 0,
      seed: "",
    },
    {
      address: "",
      balance: 0,
      seed: "",
    },
    {
      address: "",
      balance: 0,
      seed: "",
    },
    {
      address: "",
      balance: 0,
      seed: "",
    },
  ]);

  return (
    <Context.Provider value={{ users, setUsers }}>{children}</Context.Provider>
  );
}
