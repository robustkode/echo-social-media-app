import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoginForm from "../../components/LoginForm";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";

const RegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    if (savedUserResponse.status === 201) {
      onSubmitProps.resetForm();
      navigate("/login");
    }
  };
  return (
    <>
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
          <LoginForm handleFormSubmit={register} />
        </Box>
      </Box>
    </>
  );
};

export default RegisterPage;
