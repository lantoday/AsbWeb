import { getRequest, postRequest } from "../fetch/fetch";
import { User } from "../Models/UserModel";

export const AccountService = {
  getProfile: () => {
    return getRequest<User>("Account/Profile");
  },
  registerCard: (cardData: {
    cardNumber: string;
    cvc: string;
    expiry: string;
  }) => {
    return postRequest("Account/RegisterCard", cardData);
  },
};
