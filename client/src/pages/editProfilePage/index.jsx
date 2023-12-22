import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Friends from "../../components/Friends";
import WritePost from "../../components/WritePost";
import Posts from "../../components/Posts";
import UserInfo from "../../components/UserInfo";
import EditProfile from "../../components/EditProfile";

const EditProfilePage = () => {
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);

  return (
    <>
      <Box>
        <Navbar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-around"
          overflow="hidden"
          height={isNonMobileScreens ? "90vh" : ""}
        >
          <Box
            className="with-scroll-bar"
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            sx={{
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            <EditProfile />
          </Box>
          <Box
            className="with-scroll-bar"
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
            sx={{
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            <Box
              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              <Posts userId={user._id} editProfile />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditProfilePage;
