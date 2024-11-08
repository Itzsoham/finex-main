import { Box, Modal, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PropTypes from "prop-types";
import UpdateUserForm from "./UpdateUserForm";

function UserProfile({ open, setOpen }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)} // This will close the modal when clicking outside
      closeAfterTransition
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40vw",
          height: "auto",
          bgcolor: colors.primary[400],
          borderRadius: "5px",
          boxShadow: 24,
          p: 4,
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the box from closing the modal
      >
        <UpdateUserForm setOpen={setOpen} />
      </Box>
    </Modal>
  );
}

UserProfile.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default UserProfile;
