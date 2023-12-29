import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Friends from "../../components/Friends";
import WritePost from "../../components/WritePost";
import Posts from "../../components/Posts";
import UserInfo from "../../components/UserInfo";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [friends, setFriends] = useState([]);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);

  const getUser = async () => {
    const response = await fetch(
      `https://echo-social-media-app.vercel.app/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUserData(data);
  };

  const getFriends = async () => {
    const response = await fetch(
      `https://echo-social-media-app.vercel.app/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setFriends(data);
  };

  const handlePatchFriend = (data) => {
    setFriends(data);
    getUser();
  };

  useEffect(() => {
    getUser();
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!userData) {
    return;
  }

  return (
    <>
      <Box>
        <Navbar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
          overflow="hidden"
          height={isNonMobileScreens && "90vh"}
        >
          <Box
            className="with-scroll-bar"
            flexBasis={isNonMobileScreens ? "26%" : undefined}
            sx={{
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            {_id === userId ? (
              <></>
            ) : (
              <UserInfo
                userData={userData._id === _id ? undefined : userData}
                handleBeFriend={handlePatchFriend}
              />
            )}
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
              <Posts
                userId={userId}
                isProfile
                handleBeFriend={handlePatchFriend}
              />
            </Box>
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis="26%">
              <Friends
                friendsList={userData._id === _id ? undefined : friends}
                handleBeFriend={handlePatchFriend}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
