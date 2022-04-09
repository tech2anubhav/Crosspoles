export const getUsersList = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: "GET_USERS_SUCCESS", payload: { data } });
    } else {
      dispatch({ type: "GET_USERS_FAILED" });
    }
  } catch (err) {
    dispatch({ type: "GET_USERS_FAILED" });
  }
};

export const removeUserFromList = (user_id) => async (dispatch) => {
  dispatch({ type: "REMOVE_USER", payload: { user_id } });
};

export const updateUserDetails = (user) => async (dispatch) => {
  dispatch({ type: "UPDATE_USER_DETAILS", payload: { data: user } });
};
