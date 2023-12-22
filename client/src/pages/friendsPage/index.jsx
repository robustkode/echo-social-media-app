import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import UserInfo from "../../components/UserInfo";
import WritePost from "../../components/WritePost";
import Posts from "../../components/Posts";
import { useTheme } from "@emotion/react";

import Friends from "../../components/Friends";
import { setFriends, setPost } from "../../state";
import { useEffect, useRef, useState } from "react";

const FriendsPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const child1Ref = useRef(null);

  const getFriends = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, [_id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />
      <Box width="100%" padding="2rem 6%">
        <Box
          className="with-scroll-bar"
          flexBasis="26%"
          sx={{
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <Friends userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};

export default FriendsPage;
