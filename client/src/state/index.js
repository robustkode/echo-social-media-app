import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    addRemoveFriend: (state, action) => {
      if (state.user) {
        try {
          const index = current(state.user.friends).findIndex(
            (obj) => obj._id === action.payload.friend._id
          );
          if (index !== -1) {
            state.user.friends = current(state.user.friends).filter(
              (_, i) => i !== index
            );
          } else {
            const newList = [...current(state.user.friends)];
            newList.push(action.payload.friend);
            state.user.friends = newList;
          }
        } catch (e) {}
      } else {
        console.error("user friends non-existent :(");
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setUser,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  addRemoveFriend,
} = authSlice.actions;
export default authSlice.reducer;
