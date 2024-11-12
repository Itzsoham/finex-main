import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useState } from "react";
import { useExpenses } from "../features/expense/useExpenses";
import Spinner from "../components/Spinner";
import {
  Box,
  Button,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Heading from "../components/Heading";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ConfirmDelete from "../components/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import { useDeleteExpense } from "../features/expense/useDeleteExpense";
import { useApproveExpense } from "../features/expense/useApproveExpense";
import { useUser } from "../features/authentication/useUser";
import { useSummery } from "../features/dashboard/useSummery";

const Expense = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { isAdmin } = useUser();
  const { isLoading: isLoadingExpense, expenses } = useExpenses();
  const { data, isLoading: isLoadingSummery } = useSummery();

  const { isLoading: isDeleting, deleteExpense } = useDeleteExpense();
  const { isEditing, approveExpense } = useApproveExpense();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [month, setMonth] = useState("all");

  const isLoading = isLoadingExpense || isLoadingSummery;

  if (isLoading) return <Spinner />;

  const summery = data.map((summary, i) => ({
    ...summary,
    id: i,
  }));

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
        <Box display="flex" alignItems="flex-end" gap="10px">
          <Box display="flex" flexDirection="column">
            <InputLabel id="month">Month</InputLabel>
            <Select
              variant="outlined"
              sx={{
                height: "40px",
                width: "150px",
                backgroundColor: colors.blueAccent[500],
                color: colors.grey[100],
              }}
              labelId="month"
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              {summery?.map((month, i) => (
                <MenuItem key={i} value={month.month}>
                  {month.month}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box display="flex" flexDirection="column">
            <InputLabel id="amount">Total Expense</InputLabel>
            <InputBase
              variant="outlined"
              type="number"
              label="Amount"
              name="amount"
              disabled={true}
              value={5000}
              sx={{
                height: "40px",
                width: "150px",
                padding: "0 10px",

                borderRadius: "3px",
                backgroundColor: colors.blueAccent[500],
                color: colors.grey[100],
              }}
            />
          </Box>

          <Box display="flex" flexDirection="column">
            <InputLabel id="cash">Cash On Hand</InputLabel>
            <InputBase
              variant="outlined"
              type="number"
              label="cash"
              name="cash"
              disabled={true}
              value={5000}
              sx={{
                height: "40px",
                width: "150px",
                padding: "0 10px",

                borderRadius: "3px",
                backgroundColor: colors.blueAccent[500],
                color: colors.grey[100],
              }}
            />
          </Box>

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
