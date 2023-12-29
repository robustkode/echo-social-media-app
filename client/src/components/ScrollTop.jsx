import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, Zoom, useScrollTrigger } from "@mui/material";

function ScrollToTop() {
  const trigger = useScrollTrigger({
    threshold: 50,
  });
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1,
        }}
      >
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="small"
          aria-label="Scroll back to top"
        >
          <KeyboardArrowUp fontSize="medium" />
        </Fab>
      </Box>
    </Zoom>
  );
}
export default ScrollToTop;
