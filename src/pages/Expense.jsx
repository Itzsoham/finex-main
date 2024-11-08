import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useState } from "react";
import { useExpenses } from "../features/expense/useExpenses";
import Spinner from "../components/Spinner";
import { Box, Button, Modal } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Heading from "../components/Heading";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ConfirmDelete from "../components/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import { useDeleteExpense } from "../features/expense/useDeleteExpense";

const Expense = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading, expenses } = useExpenses();
  const { isLoading: isDeleting, deleteExpense } = useDeleteExpense();
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  if (isLoading) return <Spinner />;

  const formattedExpenses = expenses?.map((expense) => ({
    ...expense,
    type: expense?.type?.name,
  }));

  const handleDeleteClick = (id) => {
    setSelectedExpenseId(id);
    setOpenDelete(true);
  };

  const handleDeleteIconClick = (id) => () => {
    handleDeleteClick(id);
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
          mt="10px"
          display="flex"
          justifyContent="center"
          color="#ff3f3fbd"
          onClick={handleDeleteIconClick(params.id)}
        >
          <DeleteOutlineOutlinedIcon />
        </Box>
      ),
    },
    { field: "date", headerName: "Date", cellClassName: "name-column--cell" },
    { field: "billNo", headerName: "Bill No" },
    { field: "type", headerName: "Type" },
    { field: "vendor", headerName: "Vendor Name", flex: 1 },
    { field: "desc", headerName: "Description", flex: 1 },
    { field: "payment", headerName: "Payment Type" },
    { field: "amount", headerName: "Amount" },
    { field: "case", headerName: "Case" },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    { field: "created_by_name", headerName: "Created By" },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading title="Expense" subtitle="List of all Expense" />
        <Button
          sx={{
            height: "40px",
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
          }}
          type="submit"
          color="info"
          variant="contained"
          onClick={() => navigate("/add")}
        >
          Create New Expense
        </Button>
      </Box>

      <Box
        height="75vh"
        width="100%"
        sx={{
          overflowX: "auto",
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
          // Custom toolbar styles
          "& .MuiDataGrid-toolbarContainer": {
            backgroundImage: `linear-gradient(45deg, ${colors.greenAccent[400]} 0%, ${colors.blueAccent[400]} 100%)`,

            color: "white",
            width: "fit-content",
            borderRadius: "5px 5px 0 0",
            padding: "5px",
          },
        }}
      >
        <DataGrid
          rows={formattedExpenses}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>

      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40vw",
            bgcolor: colors.primary[400],
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <ConfirmDelete
            resourceName="Expense"
            disabled={isDeleting}
            onConfirm={() =>
              deleteExpense(selectedExpenseId, {
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

export default Expense;
