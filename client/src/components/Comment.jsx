import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";

const Comment = ({ comment }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  const alt = palette.background.alt;
  if (!comment.name) {
    return <p>Hi there</p>;
  }
  return (
    <WidgetWrapper
      display="flex"
      gap="1rem"
      alignItems="center"
      backgroundColor={alt}
      mt="1rem"
    >
      <UserImage image={comment.picPath} size="55px" />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="0.2rem"
      >
        <Typography sx={{ color: main }}>{comment.name}</Typography>
        <Typography sx={{ color: dark }}>{comment.content}</Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default Comment;
