import { toUserResponse } from "./user.mapper";
import { userService } from "./user.service";
import { CreateUserInput } from "./user.types";

export const UserController = {
  async createUser(data: CreateUserInput) {
    const user = await userService.create(data);
    return toUserResponse(user);
  },

  async getUsers() {
    const users = await userService.getAll();
    return users.map(toUserResponse);
  },
};
