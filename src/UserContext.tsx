import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { User } from "./Models/UserModel";
import { AccountService } from "./Account/AccountService";

interface UserState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

type UserAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: User }
  | { type: "FETCH_ERROR"; payload: Error };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, user: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface UserContextType extends UserState {
  refreshUser: () => Promise<void>;
  dispatch: React.Dispatch<UserAction>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialState: UserState = {
  user: null,
  loading: true,
  error: null,
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUser = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await AccountService.getProfile();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err: any) {
      dispatch({ type: "FETCH_ERROR", payload: err });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider
      value={{ ...state, refreshUser: fetchUser, dispatch }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
