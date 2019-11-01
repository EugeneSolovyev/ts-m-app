import User from "../../constants/user";

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case User.SIGN_IN:
    case User.SIGN_UP:
      return { ...payload };
    case User.LOG_OUT:
      return { ...DEFAULT_STATE };
    default:
      return state;
  }
};
