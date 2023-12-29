import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoginForm from "../../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "https://echo-social-media-app.vercel.app/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    if (loggedInResponse.status === 200) {
      const loggedIn = await loggedInResponse.json();
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      onSubmitProps.resetForm();
      navigate("/");
    }
  };
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Echo
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "40%" : "70%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem" }}
          textAlign="center"
        >
          Welcome to Echo!
        </Typography>
        <LoginForm handleFormSubmit={login} login />
      </Box>
    </Box>
  );
};

export default LoginPage;
