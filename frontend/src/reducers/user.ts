import { IActionType, IUserReducerState } from "./reducers.d";
import { User } from "../constants/user.enum";

const INITIAL_STATE: IUserReducerState = {
  current: JSON.parse(localStorage.getItem("USER") || "null"),
  other: JSON.parse(localStorage.getItem("USERS") || "[]"),
};

export default (
  state: IUserReducerState = INITIAL_STATE,
  { type, payload }: IActionType
): IUserReducerState => {
  if (typeof payload === "function" && type === User) {
    return payload(state);
  }

  return state;
};
