import { getRequest } from "../fetch/fetch";
import { User } from "../Models/UserModel";

export const AccountService = {
  getProfile: () => {
    return getRequest<User>("Account/Profile");
  },
};
