import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddRemoveFriendIcon from "./AddRemoveFriendIcon";

const UserInfo = ({ userData = null, handleBeFriend = null }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      setUserInfo(userData);
    } else {
      setUserInfo(user);
    }
  }, [userData, user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!userInfo) {
    return null;
  }

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={userInfo.picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {userInfo.firstName} {userInfo.lastName}
            </Typography>
            <Typography color={medium}>
              {userInfo.friends.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        <AddRemoveFriendIcon
          userId={userInfo._id}
          data={userInfo}
          handleBeFriend={handleBeFriend}
        />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          {userInfo.location ? (
            <Typography color={main}>{userInfo.location}</Typography>
          ) : (
            <Typography color={medium}>Earth</Typography>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />

          {userInfo.occupation ? (
            <Typography color={main}>{userInfo.occupation}</Typography>
          ) : (
            <Typography color={medium}>Surviving</Typography>
          )}
        </Box>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <FlexBetween gap="1rem" mb="0.5rem">
          <Link href={`/${userInfo.web}`}>
            <LanguageIcon fontSize="large" sx={{ color: main }} />
          </Link>
          <Box>
            <Typography color={main} fontWeight="500">
              Web
            </Typography>
          </Box>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <Link href={`/${userInfo.linkedIn}`}>
            <LinkedInIcon fontSize="large" sx={{ color: main }} />
          </Link>

          <Box>
            <Typography color={main} fontWeight="500">
              LinkedIn
            </Typography>
          </Box>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserInfo;
