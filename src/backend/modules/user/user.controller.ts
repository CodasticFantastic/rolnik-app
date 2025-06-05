import { userMapper } from "./user.mapper";
import { userService } from "./user.service";
import { CreateUserInput, SanitizedUserResponse } from "./user.types";

export const UserController = {
  async getUsers(): Promise<SanitizedUserResponse[]> {
    const users = await userService.getAll();
    return users.map(userMapper.sanitizedUserResponse);
  },

  async createUser(data: CreateUserInput): Promise<SanitizedUserResponse> {
    const user = await userService.create(data);
    return userMapper.sanitizedUserResponse(user);
  },
};
