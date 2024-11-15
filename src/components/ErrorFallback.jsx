import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import PropTypes from "prop-types";

import Heading from "./Heading";

function ErrorFallback({ error, resetErrorBoundary }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      color={colors.grey[100]}
      textAlign="center"
      padding="280px"
      backgroundColor={colors.grey[900]}
      overflow="hidden"
      boxSizing="border-box" // Prevent overflow due to padding
    >
      <Heading title="Something went wrong 🤔" subtitle={error.message} />
      <Box marginTop="20px">
        <button
          onClick={resetErrorBoundary}
          style={{
            padding: "10px 20px",
            backgroundColor: colors.grey[500],
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          Try again
        </button>
      </Box>
    </Box>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};

export default ErrorFallback;
