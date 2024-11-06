import { Box, keyframes } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Spinner rotation animation
const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

function Spinner() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        margin: "4.8rem auto",
        width: "6.4rem",
        aspectRatio: "1",
        borderRadius: "50%",
        background: `radial-gradient(farthest-side, ${theme.palette.secondary.main} 94%, transparent) top/10px 10px no-repeat,
                     conic-gradient(transparent 30%, ${theme.palette.secondary.main})`,
        WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 10px), black 0)`,
        animation: `${rotate} 1.5s infinite linear`,
      }}
    />
  );
}

export default Spinner;
