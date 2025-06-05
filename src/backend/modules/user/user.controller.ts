import { userService } from "./user.service";
import { CreateUserInput, SanitizedUser } from "./user.types";

export const UserController = {
  async getUsers(): Promise<SanitizedUser[]> {
    return await userService.getAllUsers();
  },

  async createUser(data: CreateUserInput): Promise<SanitizedUser> {
    return await userService.createLowPrivilegedUser(data);
  },
};
