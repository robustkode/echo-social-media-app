import { useTheme } from "@emotion/react";
import { Box, Button, Divider, InputBase } from "@mui/material";
import Comment from "./Comment";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const CommentsWidget = ({ comments, postId, handleWrite }) => {
  const [comment, setComment] = useState("");

  const { palette } = useTheme();

  const { _id, firstName, picturePath } = useSelector((state) => state.user);
  const handleComment = async () => {
    const data = {
      writerId: _id,
      picPath: picturePath,
      name: firstName,
      content: comment,
    };

    const response = await fetch(
      `https://echo-social-media-app.vercel.app/posts/${postId}/comment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const post = await response.json();

    setComment("");
    handleWrite(post);
  };
  return (
    <>
      <WidgetWrapper>
        <Box>
          <FlexBetween gap="1.5rem">
            <UserImage image={picturePath} />
            <InputBase
              placeholder="comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              sx={{
                width: "90%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "0.5rem 1rem",
              }}
            />
            <Button
              className="Button"
              disabled={!comment}
              onClick={handleComment}
              sx={{
                borderRadius: "3rem",
                padding: "0.5rem 1.5rem",
              }}
            >
              Comment
            </Button>
          </FlexBetween>
        </Box>
      </WidgetWrapper>

      <Box mt="0.5rem">
        {comments ? (
          comments.map((comment, i) => <Comment key={i} comment={comment} />)
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default CommentsWidget;
