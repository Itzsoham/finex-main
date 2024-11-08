import { useState } from "react";
import { Box, Button, Modal, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { DataGrid } from "@mui/x-data-grid";
import { useTypes } from "../features/type/useTypes";
import { useDeleteType } from "../features/type/useDeleteType";

import Heading from "../components/Heading";
import CreateType from "../features/type/CreateType";
import Spinner from "../components/Spinner";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ConfirmDelete from "../components/ConfirmDelete";

function ExpenseType() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [type, setType] = useState({});
  const { isLoading: isDeleting, deleteType } = useDeleteType();

  const { isLoading, types } = useTypes();

  if (isLoading) return <Spinner />;

  const handleDeleteClick = (id) => {
    setSelectedTypeId(id);
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
      field: "edit",
      headerName: "Edit",
      headerAlign: "center",

      renderCell: (params) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          marginTop={"10px"}
          display="flex"
          justifyContent="center"
          color="rgba(37, 21, 249, 0.936)"
          onClick={() => {
            setSelectedTypeId("");
            setOpenAdd(true);
            setType(() => ({ id: params.row.id, name: params.row.name }));
          }}
        >
          <EditOutlinedIcon />
        </Box>
      ),
    },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "created_by_name",
      headerName: "Created By",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading title="Expense Type" subtitle="Expense types for expenses" />
        <Button
          sx={{
            height: "40px",
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
          }}
          type="submit"
          color="info"
          variant="contained"
          onClick={() => {
            setType({}); // Clear previous type data for a new type
            setOpenAdd(true);
          }}
        >
          Create New Type
        </Button>
        <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "40vw",
              height: "auto",
              overflow: "auto",
              bgcolor: colors.primary[400],
              borderRadius: "5px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <CreateType type={type} setOpen={setOpenAdd} />
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
              borderBottom: "none" + "!important",
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={types} columns={columns} />
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
            resourceName="Expense Type"
            disabled={isDeleting}
            onConfirm={() =>
              deleteType(selectedTypeId, {
                onSettled: () => setOpenDelete(false),
              })
            }
            onCloseModal={() => setOpenDelete(false)}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default ExpenseType;
