import { Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";

const Friends = ({ friendsList = null, handleBeFriend = null }) => {
  const { palette } = useTheme();

  const { _id, friends } = useSelector((state) => state.user);
  const [userFriends, setUserFriends] = useState([]);
  const isCurrentUser = !friendsList ? true : false;
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const medium = palette.neutral.medium;

  useEffect(() => {
    if (friendsList) {
      setUserFriends(friendsList);
    } else {
      setUserFriends(friends);
    }
  }, [friendsList, friends]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box>
        <WidgetWrapper>
          <Box display="flex" flexDirection="column" gap="1.5rem">
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
              sx={{ mb: "1.5rem" }}
            >
              Friends
            </Typography>
            {!userFriends.length ? (
              <Typography
                color={palette.neutral.dark}
                variant="h6"
                fontWeight="300"
                sx={{ m: "0 auto 1.5rem auto" }}
              >
                No friends yet!
              </Typography>
            ) : (
              userFriends.map((friend) => (
                <Friend
                  key={friend._id}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  subtitle={friend.occupation}
                  userPicturePath={friend.picturePath}
                  handleBeFriend={handleBeFriend}
                />
              ))
            )}
          </Box>
        </WidgetWrapper>
      </Box>
    </>
  );
};

export default Friends;
