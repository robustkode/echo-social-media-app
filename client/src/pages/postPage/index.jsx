import { Box, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import UserInfo from "../../components/UserInfo";
import MyPostWidget from "../../components/WritePost";
import PostsWidget from "../../components/Posts";
import Friends from "../../components/Friends";
import { useTheme } from "@emotion/react";
import Post from "../../components/Post";
import Comments from "../../components/Comments";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PostPage = () => {
  const [writer, setWriter] = useState(undefined);
  const [friends, setFriends] = useState([]);
  const [postData, setPostData] = useState(undefined);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const { state: post } = useLocation();
  const token = useSelector((state) => state.token);

  const getFriends = async (id) => {
    const response = await fetch(
      `https://echo-social-media-app.vercel.app/users/${id}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setFriends(data);
  };

  const getUser = async (id) => {
    const response = await fetch(
      `https://echo-social-media-app.vercel.app/users/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setWriter(data);
  };

  const handlePatchFriend = (data) => {
    setFriends(data);
    getUser(postData.postUserId);
  };
  useEffect(() => {
    setPostData(post);
    if (post.postUserId !== _id) {
      getUser(post.postUserId);
      getFriends(post.postUserId);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleComment = (data) => {
    setPostData({
      ...data,
      postId: data._id,
      postUserId: data.userId,
      name: `${data.firstName} ${data.lastName}`,
    });
  };

  const handlePatchLike = (updated) => {
    const updatedPost = { ...postData, likes: updated.likes };
    setPostData(updatedPost);
  };

  if (!postData) {
    return null;
  }

  return (
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
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          display={!isNonMobileScreens ? "none" : "block"}
        >
          <UserInfo
            userData={postData.postUserId === _id ? undefined : writer}
            handleBeFriend={handlePatchFriend}
          />
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
          {postData ? (
            <>
              <Box>
                <Post
                  postId={postData.postId}
                  postUserId={postData.postUserId}
                  name={postData.name}
                  description={postData.description}
                  location={postData.location}
                  picturePath={postData.picturePath}
                  userPicturePath={postData.userPicturePath}
                  likes={postData.likes}
                  comments={postData.comments}
                  handleBeFriend={handlePatchFriend}
                  handlePatchLike={handlePatchLike}
                />

                <Box
                  height="2rem"
                  backgroundColor={palette.background.default}
                ></Box>
              </Box>
              <Comments
                comments={postData.comments}
                postId={postData.postId}
                handleWrite={handleComment}
              />
            </>
          ) : (
            <Typography textAlign="center" mt="5rem">
              No post found by the ID
            </Typography>
          )}
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Friends
              friendsList={postData.postUserId === _id ? undefined : friends}
              handleBeFriend={handlePatchFriend}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostPage;
