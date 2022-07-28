import { createSlice } from "@reduxjs/toolkit";

const initialNotification = {
  text: "All's good!",
  shown: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotification,
  reducers: {
    setNotificationText(state, action) {
      return {
        ...state,
        text: action.payload,
      };
    },
    notificationOn(state, action) {
      return {
        ...state,
        shown: true,
      };
    },
    notificationOff(state, action) {
      return {
        ...state,
        shown: false,
      };
    },
  },
});

export const { setNotificationText, notificationOn, notificationOff } =
  notificationSlice.actions;
export default notificationSlice.reducer;
