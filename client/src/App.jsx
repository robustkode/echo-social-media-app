import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";

import ProfilePage from "./pages/profilePage";
import PostPage from "./pages/postPage";
import "./App.css";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import EditProfilePage from "./pages/editProfilePage";
import FriendsPage from "./pages/friendsPage";

const App = () => {
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={isAuth ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/editprofile"
              element={isAuth ? <EditProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/friends"
              element={isAuth ? <FriendsPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/post/:id"
              element={isAuth ? <PostPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!isAuth ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!isAuth ? <RegisterPage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
