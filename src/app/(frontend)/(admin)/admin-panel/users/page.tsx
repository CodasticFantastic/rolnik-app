"use client";
import { useEffect } from "react";

export default function UsersPage() {
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/private/users");
      const json = await res.json();

      console.log(res);
      console.log(json);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <h1>Użytkownicy</h1>;
}
