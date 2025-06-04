export type User = {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "LOW_PRIVILEGED_USER";
  createdAt: Date;
};

export type CreateUserInput = Omit<User, "id" | "createdAt">;
export type UpdateUserInput = Partial<CreateUserInput> & { id: string };
