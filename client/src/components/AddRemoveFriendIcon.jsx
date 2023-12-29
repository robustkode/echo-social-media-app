import { useTheme } from "@emotion/react";
import {
  ManageAccountsOutlined,
  PersonAddOutlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";

const AddRemoveFriendIcon = ({ userId, handleBeFriend = null }) => {
  const friends = useSelector((state) => state.user.friends);
  const { _id } = useSelector((state) => state.user);

  const isFriend = friends.find(
    (friend) => friend._id === userId || friend._id === _id
  );

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const veryLight = palette.primary.veryLight;
  const primaryDark = palette.primary.dark;

  const patchFriend = async (e) => {
    e.stopPropagation();
    const response = await fetch(
      handleBeFriend
        ? `https://echo-social-media-app.vercel.app/users/${userId}/${_id}`
        : `https://echo-social-media-app.vercel.app/users/${_id}/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (handleBeFriend) {
      handleBeFriend(data);
      const response = await fetch(
        `https://echo-social-media-app.vercel.app/users/${_id}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const currentUserData = await response.json();
      dispatch(setFriends({ friends: currentUserData }));
    } else {
      dispatch(setFriends({ friends: data }));
    }
  };

  return _id === userId ? (
    <IconButton onClick={() => navigate(`/editprofile`)}>
      <ManageAccountsOutlined />
    </IconButton>
  ) : (
    <IconButton
      onClick={(e) => patchFriend(e)}
      sx={{ backgroundColor: veryLight, p: "0.6rem" }}
    >
      {isFriend ? (
        <PersonRemoveOutlined sx={{ color: primaryDark }} />
      ) : (
        <PersonAddOutlined sx={{ color: primaryDark }} />
      )}
    </IconButton>
  );
};

export default AddRemoveFriendIcon;
