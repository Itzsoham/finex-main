import { useState } from "react";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Heading from "../components/Heading";
import CreateTeamMember from "../features/authentication/CreateTeamMember";
import { useTeam } from "../features/authentication/useTeam";
import Spinner from "../components/Spinner";
import ConfirmDelete from "../components/ConfirmDelete";
import { useDeleteUser } from "../features/authentication/useDeleteUser";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { isLoading, users: Data } = useTeam();
  const { isLoading: isDeleting, deleteUser } = useDeleteUser();

  if (isLoading) return <Spinner />;

  const { users } = Data;

  const formattedUsers = users?.map((user) => ({
    id: user.id,
    email: user.email,
    fullName: user.user_metadata?.fullName || "N/A",
    phone: user.user_metadata?.phone || "N/A",
    role: user.user_metadata?.role || "N/A",
    access: user.user_metadata?.role || "user",
  }));

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setOpenDelete(true);
  };

  const columns = [
    {
      field: "delete",
      headerName: "Delete",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          marginTop={"10px"}
          display="flex"
          justifyContent="center"
          color="#ff3f3fbd"
          onClick={() => handleDeleteClick(params.id)}
        >
          <DeleteOutlineOutlinedIcon />
        </Box>
      ),
    },
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { access } }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          marginTop={"10px"}
          display="flex"
          justifyContent="center"
          backgroundColor={
            access === "Admin"
              ? colors.greenAccent[600]
              : access === "User"
              ? colors.greenAccent[700]
              : colors.greenAccent[800]
          }
          borderRadius="4px"
        >
          {access === "Admin" && <AdminPanelSettingsOutlinedIcon />}
          {access === "User" && <LockOpenOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {access}
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading title="TEAM" subtitle="Managing the Team Members" />
        <Button
          sx={{
            height: "40px",
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
          }}
          type="submit"
          color="info"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Create New member
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80vw",
              height: "80vh",
              overflow: "auto",
              bgcolor: colors.primary[400],
              borderRadius: "5px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <CreateTeamMember setOpen={setOpen} />
          </Box>
        </Modal>
      </Box>

      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaders [role='row']":
            {
              backgroundColor: `${colors.blueAccent[700]} !important`,
              borderBottom: "none",
            },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={formattedUsers} columns={columns} />
      </Box>
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
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
        >
          <ConfirmDelete
            resourceName="Team Member"
            disabled={isDeleting}
            onConfirm={() =>
              deleteUser(selectedUserId, {
                onSettled: () => setOpenDelete(false),
              })
            }
            onCloseModal={() => setOpenDelete(false)}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Team;
