import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state";
import { Link, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

  const theme = useTheme();

  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const neutralLight = theme.palette.neutral.light;
  const { palette } = useTheme();

  return (
    <Box display="flex" padding="1rem 6%" height="10vh" backgroundColor={alt}>
      <FlexBetween
        width={isNonMobileScreens ? "55%" : "70%"}
        ml={isNonMobileScreens ? "auto" : undefined}
        mr={isNonMobileScreens ? undefined : "auto"}
      >
        {isNonMobileScreens ? (
          <>
            <Typography
              fontWeight="bold"
              fontSize="clamp(1rem, 2rem, 2.25rem)"
              color="primary"
              onClick={() => navigate("/")}
              sx={{
                "&:hover": {
                  color: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              Echo
            </Typography>
            <FlexBetween gap="2rem">
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>

              <Button
                className="Button"
                sx={{
                  borderRadius: "3rem",
                  alignSelf: "center",
                  paddingX: "0.75rem",
                }}
                onClick={() => dispatch(setLogout())}
              >
                Logout
              </Button>
            </FlexBetween>
          </>
        ) : (
          <>
            <IconButton
              sx={{ marginRight: "2rem" }}
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Menu />
            </IconButton>
            <Typography
              fontWeight="bold"
              fontSize="clamp(1rem, 2rem, 2.25rem)"
              color="primary"
              onClick={() => navigate("/")}
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              Echo
            </Typography>
          </>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            left="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="40vw"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box
              display="flex"
              width="100%"
              justifyContent="space-between"
              p="1rem 2rem"
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              paddingLeft="0.5rem"
              gap="1.5rem"
            >
              <Button
                sx={{
                  color: dark,
                  borderRadius: "3rem",
                  alignSelf: "center",
                  padding: "0.5rem 1rem",
                }}
                onClick={() => {
                  navigate("/friends");
                }}
              >
                Friends
              </Button>
              <Button
                sx={{
                  color: dark,
                  borderRadius: "3rem",
                  alignSelf: "center",
                  padding: "0.5rem 1rem",
                }}
                onClick={() => {
                  navigate("/editprofile");
                }}
              >
                Profile
              </Button>

              <Button
                className="Button"
                sx={{
                  borderRadius: "3rem",
                  padding: "0.5rem 1rem",
                }}
                onClick={() => dispatch(setLogout())}
              >
                Logout
              </Button>
            </Box>
          </Box>
        )}
      </FlexBetween>
    </Box>
  );
};

export default Navbar;
