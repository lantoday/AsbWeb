import { getRequest, postRequest } from "../fetch/fetch";
import { User } from "../Models/UserModel";
import { CardModel } from "../Models/CardModel";

export const AccountService = {
  getProfile: () => {
    return getRequest<User>("Account/Profile");
  },
  registerCard: (cardData: CardModel) => {
    return postRequest("Account/RegisterCard", cardData);
  },
};
