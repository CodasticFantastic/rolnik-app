import { useQuery } from "@tanstack/react-query";

import { SanitizedUser } from "@/backend/modules/user/user.types";
import { fetchUsers } from "./users.fetch";

export function useAdminUsers() {
  return useQuery<SanitizedUser[], Error>({
    queryKey: ["admin", "users"],
    queryFn: fetchUsers.GET,
  });
}

export const userQuery = {
  useAdminUsers,
};
