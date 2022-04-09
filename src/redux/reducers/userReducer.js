import initialState from "../initialState";

// (state, action) --------destructure action------> (state, {type, payload})  -----------
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_USERS_REQUEST":
      return (state = { ...state, loading: true });

    case "GET_USERS_SUCCESS":
      return (state = { ...state, list: payload.data, loading: false });

    case "GET_USERS_FAILED":
      return (state = { ...state, loading: false });

    case "UPDATE_USER_DETAILS":
      let allUsers = state.list;
      let updatedList = allUsers.map((user) =>
        user.id === payload.data.id ? payload.data : user
      );
      console.log(updatedList);
      console.log(payload.data);
      return (state = { ...state, list: updatedList });

    case "REMOVE_USER":
      let users = state.list;
      let filteredUsers = users.filter((user) => user.id !== payload.user_id);
      return (state = { ...state, list: filteredUsers });

    default:
      return state;
  }
};
