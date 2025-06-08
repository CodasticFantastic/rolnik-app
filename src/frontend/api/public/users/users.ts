import { User } from "@/backend/modules/user/user.types";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/public/users");

  if (!res.ok) {
    throw new Error("Nie udało się pobrać użytkowników");
  }

  return res.json();
}
