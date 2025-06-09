"use client";

import { useAdminUsers } from "@/frontend/api/private/users/user.query";
import { Skeleton } from "@/frontend/components/shadcn/skeleton";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function UsersPage() {
  const { data, isPending, error } = useAdminUsers();

  if (isPending) return <Skeleton className="h-100 w-full" />;
  if (error) return <div>Wystąpił błąd: {error.message}</div>;

  return (
    <div className="container mx-auto my-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
