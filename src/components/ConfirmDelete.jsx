import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import PropsType from "prop-types";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      <Typography variant="h3">Delete {resourceName}</Typography>
      <Typography
        variant="body1"
        sx={{ color: colors.grey[200], marginBottom: "1.2rem" }}
      >
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1.2rem" }}>
        <Button
          color="secoundary"
          variant="outlined"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          sx={{ border: "none", boxShadow: "none" }}
          color="error"
          variant="contained"
          disabled={disabled}
          onClick={onConfirm}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

ConfirmDelete.propTypes = {
  resourceName: PropsType.string.isRequired,
  onConfirm: PropsType.func.isRequired,
  disabled: PropsType.bool,
  onCloseModal: PropsType.func.isRequired,
};

export default ConfirmDelete;
