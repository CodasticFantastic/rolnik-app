import { SanitizedUser } from "@/backend/modules/user/user.types";

async function fetchUsersAsAdmin(): Promise<SanitizedUser[]> {
  const res = await fetch("/api/private/users", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Nie udało się pobrać listy użytkowników.");
  }

  return res.json();
}

export const fetchUsers = {
  async GET(): Promise<SanitizedUser[]> {
    return await fetchUsersAsAdmin();
  },
};
