import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useState } from "react";
import { useExpenses } from "../features/expense/useExpenses";
import Spinner from "../components/Spinner";
import { Box, Modal } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Heading from "../components/Heading";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ConfirmDelete from "../components/ConfirmDelete";
import { useDeleteExpense } from "../features/expense/useDeleteExpense";
import { useApproveExpense } from "../features/expense/useApproveExpense";
import { useUser } from "../features/authentication/useUser";
import ExpenseFilter from "../features/expense/ExpenseFilter";

const Expense = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isAdmin, userId, isLoading: isLoadingUser } = useUser();
  const [selectedUser, setSelectedUser] = useState("all");
  const [month, setMonth] = useState("all");

  const { isLoading: isLoadingExpense, expenses } = useExpenses(
    isAdmin,
    userId,
    selectedUser,
    month
  );

  const { isLoading: isDeleting, deleteExpense } = useDeleteExpense();
  const { isEditing, approveExpense } = useApproveExpense();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const isLoading = isLoadingExpense || isLoadingUser;

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

  const handleApproveIconClick = (id) => () => {
    approveExpense(id);
  };

  const columns = [
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    { field: "date", headerName: "Date", width: 150 },
    { field: "billNo", headerName: "Bill No", width: 100 },
    { field: "type", headerName: "Expense Type", width: 200 },
    { field: "vendor", headerName: "Vendor Name", flex: 1 },
    { field: "desc", headerName: "Description", flex: 1 },
    { field: "payment", headerName: "Payment Type", width: 120 },
    { field: "amount", headerName: "Amount", width: 100 },
    { field: "case", headerName: "Case", width: 100 },
    { field: "remarks", headerName: "Remarks", flex: 2 },
  ];

  if (isAdmin) {
    columns.push(
      { field: "created_by_name", headerName: "Created By", width: 150 },
      {
        field: "delete",
        headerName: "Delete",
        headerAlign: "center",
        width: 60,
        renderCell: (params) => (
          <Box
            p="5px"
            mt="10px"
            display="flex"
            justifyContent="center"
            cursor="pointer"
            color="#ff3f3fbd"
            onClick={handleDeleteIconClick(params.id)}
          >
            <DeleteOutlineOutlinedIcon />
          </Box>
        ),
      },
      {
        field: "approve",
        headerName: "Approve",
        headerAlign: "center",
        width: 70,

        renderCell: (params) => (
          <Box
            p="5px"
            mt="10px"
            display="flex"
            justifyContent="center"
            color="#38ff31bc"
            onClick={handleApproveIconClick(params.id)}
            disabled={isEditing}
          >
            <CheckOutlinedIcon />
          </Box>
        ),
      }
    );
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading title="Expense" subtitle="List of all Expense" />
        <ExpenseFilter
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setMonth={setMonth}
          month={month}
        />
      </Box>

      <Box
        height="75vh"
        width="100%"
        sx={{
          overflowX: "auto", // Ensure horizontal scrolling is enabled
          "&::-webkit-scrollbar": {
            height: "5px", // Scrollbar height for horizontal scroll
          },
          "& .MuiDataGrid-root": {
            border: "none",
            width: isAdmin ? "1500px" : "100%", // Conditional width
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            width: "50px",
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
